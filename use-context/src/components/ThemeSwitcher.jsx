import useTheme from "../hooks/useTheme"


const ThemeSwitcher = () => {
       const{themeName, switchTheme, themes, cycleTheme} = useTheme()
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Theme Switcher</h2>
             {/* Theme Selection Buttons */}
      <div className="flex space-x-2">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => switchTheme(theme)}
            className={`
              px-4 py-2 rounded
              ${themeName === theme 
                ? 'ring-2 ring-offset-2 ring-blue-500' 
                : 'hover:bg-gray-100'}
            `}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      {/* Cycle Theme Button */}
      <button
        onClick={cycleTheme}
        className="mt-4 px-4 py-2 bg-gray-200 rounded"
      >
        Cycle Theme
      </button>
        </div>
    )
}

export default ThemeSwitcher