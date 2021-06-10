import { useContext, useState, createContext } from "react";
import axios from "axios";
import { useStateObject } from "./superContextState";

const INITIAL_STATE = ["Master System", "Mega Drive", "Saturn"];
const ConsoleContext = createContext();

function useConsoleContext() {
  const context = useContext(ConsoleContext) || null;
  if (context) return context;
}

function ConsolesProvider(props) {
  const [consoles, setConsoles, setConsolesAsync, errors, pending] =
    useStateObject(INITIAL_STATE);

  const add = () => setConsoles([...consoles, "Dreamcast"]);

  const fetch = () =>
    setConsolesAsync("fetch", async () => {
      const responce = await axios
        .get(`https://jsonplaceholder.typicode.com/todos/1`)
        .then((res) => res.data.title);
      return [...consoles, responce];
    });

  const fetchFail = () =>
    setConsolesAsync("fetch", async () => {
      const responce = await axios
        .get(`https://djsonplaceholder.typicode.com/todos/1`)
        .then((res) => res.data.title);
      return [...consoles, responce];
    });

  const value = { consoles, add, fetch, fetchFail, errors, pending };
  return <ConsoleContext.Provider value={value} {...props} />;
}

export { useConsoleContext, ConsolesProvider };
