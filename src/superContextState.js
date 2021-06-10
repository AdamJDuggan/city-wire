import { useState } from "react";

function useStateObject(usersData) {
  const [errors, setErrors] = useState([]);
  const [pending, setPending] = useState([]);

  const [state, setState] = useState(usersData);

  const setter = (payload) => setState(payload);

  const addPending = (action) => {
    if (!pending.find((p) => p === action)) setPending([...pending, action]);
  };

  const filterPending = (action) => {
    const newPending = pending.filter((p) => p !== action);
    setPending(newPending);
  };
  const filterErrors = (action) => {
    const newErrors = errors.filter((e) => e.action !== action);
    setPending(newErrors);
  };

  const updateState = (action, res) => {
    filterPending(action);
    filterErrors(action);
    setState(res);
  };

  const addError = (action, error) => {
    filterPending(action);
    if (!errors.find((e) => e.action === action))
      setErrors([...errors, { action, message: error }]);
  };

  const asyncSetter = async (action, callback) => {
    addPending(action);
    try {
      const res = await callback();
      updateState(action, res);
    } catch (err) {
      addError(action, err);
    }
  };

  return [state, setter, asyncSetter, errors, pending];
}

export { useStateObject };
