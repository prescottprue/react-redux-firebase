import React from "react";
import { AppState, TodoValue } from './reducer'
import { useSelector } from "react-redux";
import { useFirebase } from 'react-redux-firebase'

interface TodoProps {
  todoId: string
}

function Todo({ todoId }: TodoProps) {
  const todo: TodoValue = useSelector((state: AppState) => {
    return state.firebase.data.todos && state.firebase.data.todos[todoId]
  })
  const firebase = useFirebase()
  function toggleDoneState() {
    firebase.update(`todos/${todoId}`, { done: !todo.done })
  }
  
  return (
    <div className="Todo">
      <input type="checkbox" onClick={toggleDoneState} /> 
      {todo.text}
    </div>
  );
}

export default Todo;
