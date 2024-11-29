/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from 'react';
import { themes, defaultTheme, storageKey } from '../config/themeConfig';


// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component

function ThemeProvider({ children }) {
    const [themeName, setThemeName] = useState(() => {
        return localStorage.getItem(storageKey) || defaultTheme;
    })

    // currentTheme is the current theme object
    const theme = themes[themeName];


    // Effect to save theme to localStorage
    useEffect(() => {
        localStorage.setItem(storageKey, themeName);
    }, [themeName]);

    // Theme switching function
    const switchTheme = (newTheme) => {
        if (themes[newTheme]) {
            setThemeName(newTheme);
        }
    };

    // Cycle through themes
    const cycleTheme = () => {
        const themeNames = Object.keys(themes);
        // console.log(themeNames);
        const currentIndex = themeNames.indexOf(themeName);
        // console.log("Current Index: "+currentIndex);
        const nextIndex = (currentIndex + 1) % themeNames.length;
        // console.log("Next Index: "+nextIndex);
        setThemeName(themeNames[nextIndex]);
    };

    return (
        <ThemeContext.Provider value={{
            themeName,
            theme,
            switchTheme,
            cycleTheme,
            themes: Object.keys(themes)
        }}>
            <div className={`${theme.background} ${theme.text} min-h-screen`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }