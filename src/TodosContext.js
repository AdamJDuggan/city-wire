import { useContext, createContext } from "react";
import { useSuperContextState } from "./superContextState";

const INITIAL_STATE = [];

const TODOS = [
  { id: 1, value: "Buy milk", completed: true },
  { id: 2, value: "Start running", completed: false },
  { id: 3, value: "Fix bike", completed: false },
];

const mockFetch = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return TODOS;
};

const TodosContext = createContext();

function useTodosContext() {
  const context = useContext(TodosContext) || null;
  if (context) return context;
}

function TodosProvider(props) {
  // Asynchronous actions
  const actions = {
    fetch: async () => {
      const responce = await mockFetch();
      return responce;
    },
  };

  const {
    state: todos,
    setState: setTodos,
    errors: todoErrors,
    pending: todoPending,
    asyncActions,
  } = useSuperContextState(INITIAL_STATE, actions);

  // Synchronous actions
  const add = (value) =>
    setTodos([...todos, { id: todos.length + 1, value, completed: false }]);

  const update = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const remove = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const value = {
    todos,
    todoErrors,
    todoPending,
    add,
    update,
    remove,
    fetch: asyncActions.fetch,
  };
  return <TodosContext.Provider value={value} {...props} />;
}

export { useTodosContext, TodosProvider };
