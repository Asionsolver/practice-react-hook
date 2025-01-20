import { useReducer } from "react";

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-center text-gray-800">
          State Depends on Previous State Values
        </h1>
        <p className="text-center text-gray-700 text-lg">
          Count: {state.count}
        </p>
      </div>
      <div>
        <button
          className="text-xl font-semibold text-center text-white bg-green-500 p-3 rounded-md"
          onClick={() => dispatch({ type: "increment" })}
        >
          Increment
        </button>
        <button
          className="text-xl font-semibold text-center text-white bg-blue-500 p-3 ml-2 rounded-md"
          onClick={() => dispatch({ type: "decrement" })}
        >
          Decrement
        </button>
        <button
          className="text-xl font-semibold text-center text-white bg-gray-500 p-3 ml-2 rounded-md"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Unknown action");
  }
}
