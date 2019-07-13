import React from "react";
import AddTodo from "./AddTodo";
import "./App.css";
import logo from "./logo.svg";

function Home() {
  return (
    <div className="Home">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          </a>
          <AddTodo />
      </header>
    </div>
  );
}

export default Home;
