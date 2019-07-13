import React from "react";
import { ExtendedFirebaseInstance, useFirebase} from "react-redux-firebase";

function AddTodo() {
  const firebase: ExtendedFirebaseInstance = useFirebase();
  function handleAddClick() {
    firebase.push("todos", { done: false, text: "Example todo" });
  }
  return (
    <div className="Add Todo">
      <button onClick={handleAddClick}>Add Todo</button>
    </div>
  );
}

export default AddTodo;
