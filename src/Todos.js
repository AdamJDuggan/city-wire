import React from "react";
import { useTodosContext, TodosProvider } from "./TodosContext";

function TodosComponent() {
  const { todos, add, fetchFail, todoErrors, todoPending, test } =
    useTodosContext();

  return (
    <div>
      <h3>Todos</h3>
      {todos && todos.map((c) => <p>{c}</p>)}
      <button onClick={add}>Add</button>
      <button onClick={test}>Fetch</button>
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
