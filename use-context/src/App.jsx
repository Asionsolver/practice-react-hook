import ThemeToggler from "./components/ThemeToggler";
import { ThemeProvider } from "./context/ThemeContext_simple";

export default function App() {
  return (
    <ThemeProvider >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold ">Theme Toggler</h1>
        <p className="text-gray-500 mb-2">Click the button to toggle the theme</p>
        <ThemeToggler />
      </div>
    </ThemeProvider>
  )
}