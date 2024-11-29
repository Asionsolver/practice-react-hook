/* eslint-disable react/prop-types */

import { createContext, useState } from "react";


// Create a context
const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { }
});

// Create a provider component
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
      };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
