import { useReducer } from "react";

function voteReducer(state, action) {
  switch (action.type) {
    case "upvote":
      return { ...state, votes: state.votes + 1, timestamp: Date.now() };
    case "downvote":
      return { ...state, votes: state.votes - 1, timestamp: Date.now() };
    default:
      throw new Error("Unknown action");
  }
}

function VotingSystem() {
  const [state, dispatch] = useReducer(voteReducer, {
    votes: 0,
    timestamp: null,
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-4">
      <div>
        <p
          className={`text-xl font-semibold text-center ${
            state.votes >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          Votes: {state.votes}
        </p>
        <p
          className={`text-center text-gray-700 ${
            state.votes >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          Last Updated:{" "}
          {state.timestamp ? new Date(state.timestamp).toLocaleString() : "N/A"}
        </p>
      </div>
      <div>
        <button
          className="text-xl font-semibold text-center text-white bg-green-500 p-3 rounded-md"
          onClick={() => dispatch({ type: "upvote" })}
        >
          Upvote
        </button>
        <button
          className="text-xl font-semibold text-center text-white bg-red-500 p-3 ml-2 rounded-md"
          onClick={() => dispatch({ type: "downvote" })}
        >
          Downvote
        </button>
      </div>
    </div>
  );
}

export default VotingSystem;
