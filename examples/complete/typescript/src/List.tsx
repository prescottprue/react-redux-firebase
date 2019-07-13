import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "./store";

function List() {
  useFirestoreConnect([{
    collection: "todos",
  }]);
  const todos = useSelector((state: RootState) => state.firebase.data.todos);
  if (!isLoaded(todos)) { return "Loading..."; }
  if (isEmpty(todos)) { return null; }
  return (
    <ul>
      {todos.map((todo: any) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  );
}

export default List;
