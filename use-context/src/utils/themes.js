export const themes = {
    light: {
        background: 'bg-white',
        text: 'text-gray-900',
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-200 text-gray-800'
    },
    dark: {
        background: 'bg-gray-900',
        text: 'text-gray-100',
        primary: 'bg-blue-700 text-white',
        secondary: 'bg-gray-700 text-gray-200'
    },
    ocean: {
        background: 'bg-blue-100',
        text: 'text-blue-900',
        primary: 'bg-teal-500 text-white',
        secondary: 'bg-blue-200 text-blue-800'
    },
    forest: {
        background: 'bg-green-100',
        text: 'text-green-900',
        primary: 'bg-green-600 text-white',
        secondary: 'bg-green-200 text-green-800'
    },
    fire: {
        background: 'bg-red-100',
        text: 'text-red-900',
        primary: 'bg-red-600 text-white',
        secondary: 'bg-red-200 text-red-800'
    }
   
};

// Optional: Theme Type Definitions
export const ThemeNames = Object.keys(themes);
// console.log(ThemeNames);



// Convert Theme Object to Upper Case

// Optional: Theme Validation Function
export function isValidTheme(themeName) {
    // return ThemeNames.includes(themeName.toUpperCase());
    return ThemeNames.includes(themeName);
};