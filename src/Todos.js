// React
import React, { useEffect, useState } from "react";
// State
import { useTodosContext, TodosProvider } from "./TodosContext";
// Assets
import plus from "./assets/plus.png";
import send from "./assets/send.png";
import bin from "./assets/bin.png";

function TodosComponent() {
  const { todos, add, update, remove, todoPending, fetch } = useTodosContext();

  useEffect(() => {
    fetch();
  }, []);

  const [value, setValue] = useState("");

  const onAddTodo = (e) => {
    e.preventDefault();
    if (value !== "") {
      add(value);
      setValue("");
    }
  };

  return (
    <div className="todos-container">
      {todoPending ? (
        <div className="pending">Loading...</div>
      ) : (
        <div>
          <div className="header">Overview</div>
          <div className="todos">
            {todos &&
              todos.map((todo, index) => (
                <div className="todo" key={index}>
                  <div
                    onClick={() => update(todo.id)}
                    className="todo-checkbox"
                  >
                    {todo.completed && <div className="todo-checked" />}
                  </div>
                  <div
                    style={{
                      textDecoration: todo.completed && "line-through",
                      color: todo.completed && "gray",
                    }}
                  >
                    {todo.value}
                  </div>
                  <img
                    src={bin}
                    alt="bin"
                    style={{ marginLeft: "auto" }}
                    onClick={() => remove(todo.id)}
                  />
                </div>
              ))}
            <form onSubmit={onAddTodo} className="add-todo-form">
              <button type="submit">
                <img src={`${plus}`} alt="plus" />
              </button>
              <input
                className="input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit">
                <img src={`${send}`} alt="plus" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Todos() {
  return (
    <TodosProvider>
      <TodosComponent />
    </TodosProvider>
  );
}
