import { useReducer } from "react";

function cartReducer(state, action) {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case "removeItem":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        total: state.total - action.payload.price,
      };
    default:
      throw new Error("Unknown action");
  }
}

function Medium() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-center text-gray-800 mt-4">
          Total: ${state.total}
        </h3>
      </div>

      <div>
        <button
          className="text-xl font-semibold text-center text-white bg-green-500 p-3 rounded-md"
          onClick={() =>
            dispatch({
              type: "addItem",
              payload: { id: 1, name: "Apple", price: 2 },
            })
          }
        >
          Add Apple ($2)
        </button>
        <button
          className="text-xl font-semibold text-center text-white bg-red-500 p-3 ml-2 rounded-md"
          onClick={() =>
            dispatch({
              type: "removeItem",
              payload: { id: 1, name: "Apple", price: 2 },
            })
          }
        >
          Remove Apple ($2)
        </button>
      </div>
    </div>
  );
}

export default Medium;
