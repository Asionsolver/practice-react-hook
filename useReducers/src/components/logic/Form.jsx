import { useReducer } from "react";

const Form = () => {
  const initialState = {
    name: "",
    email: "",
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <div>
      <form className="flex flex-col gap-4 w-1/2 mx-auto mt-10">
        <input
          className="p-2 border border-gray-300 rounded-md"
          value={state.name}
          type="text"
          onChange={(e) =>
            dispatch({
              type: "update-field",
              field: "name",
              value: e.target.value,
            })
          }
          placeholder="Enter your name"
        />
        <input
          className="p-2 border border-gray-300 rounded-md"
          value={state.email}
          type="email"
          onChange={(e) =>
            dispatch({
              type: "update-field",
              field: "email",
              value: e.target.value,
            })
          }
          placeholder="Enter your email"
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

function formReducer(state, action) {
  switch (action.type) {
    case "update-field":
      return { ...state, [action.field]: action.value };
    case "reset":
      return {
        name: "",
        email: "",
      };
    default:
      throw new Error("Invalid action type");
  }
}

export default Form;
