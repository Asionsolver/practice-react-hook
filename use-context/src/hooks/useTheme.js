import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext_simple"

// 3. Custom Hook for Using Context (Optional but Recommended)
const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}

export default useTheme