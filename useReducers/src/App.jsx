// import { Counter } from "./components/state/Counter";
// import VotingSystem from "./components/state/Hard";
// import Medium from "./components/state/Medium";

import Counter from "./components/init/Counter";

// import Form from "./components/logic/Form";
// import UserProfile from "./components/logic/UserProfile";

function App() {
  return (
    <>
      {/* <Counter />
      <Medium />
      <VotingSystem /> */}
      {/* <UserProfile />
      <Form /> */}
      <Counter initialCount={5} />
    </>
  );
}

export default App;
