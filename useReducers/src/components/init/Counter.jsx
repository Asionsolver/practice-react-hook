/* eslint-disable react/prop-types */
import { useReducer } from "react";

// Lazy initialization function
function init(initialValue) {
  console.log("Initializing state...");
  return { count: initialValue * 2 }; // Start with double the initial value
}

function Counter({ initialCount }) {
  // Using lazy initialization
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}

// Reducer function to handle actions
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error("Unknown action type");
  }
}

export default Counter;
