import { useContext, createContext } from "react";
import axios from "axios";
import { useSuperContextState } from "./superContextState";

const INITIAL_STATE = ["Buy milk", "Start running", "Fix bike"];
const TodosContext = createContext();

function useTodosContext() {
  const context = useContext(TodosContext) || null;
  if (context) return context;
}

function TodosProvider(props) {
  const actions = {
    test: async () => {
      const responce = await axios
        .get(`https://jsonplaceholder.typicode.com/todos/1`)
        .then((res) => res.data.title);
      return [...todos, responce];
    },
  };

  const [
    todos,
    setTodos,
    setTodosAsync,
    todoErrors,
    todoPending,
    asyncActions,
  ] = useSuperContextState(INITIAL_STATE, actions);

  const add = () => setTodos([...todos, "Visit Nan"]);

  const fetchFail = () =>
    setTodosAsync("fetch", async () => {
      const responce = await axios
        .get(`https://djsonplaceholder.typicode.com/todos/1`)
        .then((res) => res.data.title);
      return [...todos, responce];
    });

  console.log(asyncActions);

  const value = {
    todos,
    add,
    fetch,
    fetchFail,
    todoErrors,
    todoPending,
    ...asyncActions,
  };
  return <TodosContext.Provider value={value} {...props} />;
}

export { useTodosContext, TodosProvider };
