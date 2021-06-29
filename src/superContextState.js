import { useState } from "react";

function useSuperContextState(initialState, actions) {
  const [errors, setErrors] = useState([]);
  const [pending, setPending] = useState([]);

  const [state, setState] = useState(initialState);

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

  const clearErrors = () => {
    setErrors([]);
  };

  const clearPending = () => {
    setPending([]);
  };

  const asyncActions = {};
  if (actions) {
    for (const [key, value] of Object.entries(actions)) {
      asyncActions[key] = () => asyncSetter(key, value);
    }
  }

  return [
    state,
    setter,
    asyncSetter,
    errors.length > 0 ? errors : null,
    pending.length > 0 ? pending : null,
    asyncActions,
  ];
}

export { useSuperContextState };
