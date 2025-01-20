import TaskList from "./components/tasks/TaskList";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <>
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    </>
  );
}

export default App;
