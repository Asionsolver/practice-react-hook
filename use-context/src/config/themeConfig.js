// src/config/themeConfig.js
import { themes } from '../utils/themes';

export const THEME_STORAGE_KEY = 'appTheme';
export const DEFAULT_THEME = 'light';

export const themeConfig = {
    themes,
    defaultTheme: DEFAULT_THEME,
    storageKey: THEME_STORAGE_KEY
};

// Explicitly export defaultTheme, themes, and storageKey
export { themes, DEFAULT_THEME as defaultTheme, THEME_STORAGE_KEY as storageKey };