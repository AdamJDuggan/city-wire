import React from "react";
import { useTodosContext, TodosProvider } from "./TodosContext";
import axios from "axios";


function TodosComponent() {
  const {
    todos,
    add,
    fetch,
    fetchFail,
    todoErrors,
    todoPending,
    setTodosAsync,
  } = useTodosContext();
  return (
    <div>
      <h3>Todos</h3>
      {todos && todos.map((c) => <p>{c}</p>)}
      <button onClick={add}>Add</button>
      <button
        onClick={() =>
          setTodosAsync("fetch", async () => {
            const responce = await axios
              .get(`https://jsonplaceholder.typicode.com/todos/1`)
              .then((res) => res.data.title);
            return [...todos, responce];
          })
        }
      >
        Fetch
      </button>
      <button onClick={fetchFail}>Fetch fail</button>

      <h5>todoPending</h5>
      {todoPending && todoPending.map((p) => <p>{p}</p>)}
      <h5>todoErrors</h5>
      {todoErrors && todoErrors.map((e) => <p>{e.action}</p>)}
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
