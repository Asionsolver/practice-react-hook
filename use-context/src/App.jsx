import DashboardPage from "./components/DashboardPage"
import ThemeSwitcher from "./components/ThemeSwitcher"
import { ThemeProvider } from "./context/ThemeContext"


const App = () => {
  return (
    <ThemeProvider>
      <div className="container mx-auto">
        <ThemeSwitcher />
        <DashboardPage />
      </div>
    </ThemeProvider>
  )
}

export default App