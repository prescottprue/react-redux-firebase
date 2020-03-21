import React from "react";
import { isLoaded, isEmpty, useFirebaseConnect } from "react-redux-firebase";
import { AppState } from './reducer'
import Todo from './Todo'
import { useSelector } from "react-redux";

function Todos() {
  useFirebaseConnect([{ path: 'todos', queryParams: ['limitToLast=10'] }])
  const todos = useSelector((state: AppState) => {
    return state.firebase.ordered.todos
  })

  if (!isLoaded(todos)) {
    return (
      <div >
        Loading...
      </div>
    );
  }

  if (isEmpty(todos)) {
    return (
      <div >
        No Todos Found
      </div>
    );
  }
  
  return (
    <div className="Todos">
      {
        todos && todos.map((todoItem) => {
          return <Todo key={todoItem.key} todoId={todoItem.key} />
        })
      }    
    </div>
  );
}

export default Todos;
