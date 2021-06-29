import React from "react";
import { useConsoleContext, ConsolesProvider } from "./ConsoleContext";

function _Consoles() {
  const { consoles, add, fetch, fetchFail, errors, pending, clearErrors } =
    useConsoleContext();
  return (
    <div>
      <h3>Consoles</h3>
      {consoles && consoles.map((c) => <p>{c}</p>)}
      <button onClick={add}>Add</button>
      <button onClick={fetch}>Fetch</button>
      <button onClick={fetchFail}>Fetch fail</button>

      <h5>Pending</h5>
      {pending && pending.map((p) => <p>{p}</p>)}
      <h5>Errors</h5>
      {errors && errors.map((e) => <p>{e.action}</p>)}
      {errors && <button onClick={clearErrors}>Clear errors</button>}
    </div>
  );
  {
  }
}

export default function Consoles() {
  return (
    <ConsolesProvider>
      <_Consoles />
    </ConsolesProvider>
  );
}
