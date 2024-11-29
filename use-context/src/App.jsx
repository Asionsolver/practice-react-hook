import { CartButton } from "./components/CartButton"
import DashboardPage from "./components/DashboardPage"
import { LoginButton } from "./components/LoginButton"
import ThemeSwitcher from "./components/ThemeSwitcher"
import { CombinedProvider } from "./context/CombinedProvider"
import { ThemeProvider } from "./context/ThemeContext"


const App = () => {
    return (

        <ThemeProvider>
            <div className="container mx-auto">
                <ThemeSwitcher />
                <DashboardPage />
                <CombinedProvider>
                    <LoginButton />
                    <CartButton />
                </CombinedProvider>
            </div>
        </ThemeProvider>
    )
}

export default App