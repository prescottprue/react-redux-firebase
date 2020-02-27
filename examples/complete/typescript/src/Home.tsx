import React from "react";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import "./App.css";
import logo from "./logo.svg";

function Home() {
  return (
    <div className="Home">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          </p>
        <div>
          <Todos />
          <AddTodo />
        </div>
      </header>
    </div>
  );
}

export default Home;
