import { useReducer } from "react";
const UserProfile = () => {
  const initialState = {
    status: "Online",
    role: "user",
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-6">
      <div>
        <h1 className="text-xl font-semibold text-center text-gray-800">
          2. State Logic Involves Multiple Sub-Values or Types of Actions
        </h1>
        <p
          className={`text-center text-lg ${
            state.status ? "text-green-500" : "text-red-500"
          }`}
        >
          Status: {state.status ? "online" : "offline"}{" "}
        </p>
        <p
          className={`text-xl font-semibold text-center ${
            state.role === "admin" ? "text-red-500" : "text-gray-800"
          }`}
        >
          Role: {state.role}
        </p>
      </div>

      <div>
        <button
          className="text-xl font-semibold text-center text-white bg-green-500 p-3 rounded-md"
          onClick={() => dispatch({ type: "change-status" })}
        >
          Change Status
        </button>
        <button
          className="text-xl font-semibold text-center text-white bg-blue-500 p-3 ml-2 rounded-md"
          onClick={() => dispatch({ type: "change-role", payload: "admin" })}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

function userReducer(state, action) {
  switch (action.type) {
    case "change-status":
      return { ...state, status: !state.status };
    case "change-role":
      return { ...state, role: action.payload };
    default:
      throw new Error("Unknown action");
  }
}
