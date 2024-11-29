// Child component using the context
import useTheme from "../hooks/useTheme"

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className={`
      p-2 rounded 
      ${theme === 'light'
          ? 'bg-gray-200 text-black'
          : 'bg-gray-800 text-white'}
    `}
    >
      Toggle Theme to {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  )
}

export default ThemeToggler