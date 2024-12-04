/* eslint-disable react/prop-types */
import { createContext, useCallback, useState } from "react";

export const ColorContext = createContext();

export const ColorContextProvider = ({ children }) => {
    const [color, setColor] = useState('#3B82F6');
    const [copiedColor, setCopiedColor] = useState(null);
    const enhancedSetColor = (newColor) => {
        setColor(newColor);

    };
     // Copy to clipboard with confirmation
  const copyToClipboard = useCallback((colorToCopy) => {
    try {
      navigator.clipboard.writeText(colorToCopy);
      setCopiedColor(colorToCopy);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedColor(null);
      }, 5000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, []);
    return (
        <ColorContext.Provider value={{ color, setColor: enhancedSetColor, copyToClipboard,copiedColor }}>
            {children}
        </ColorContext.Provider>
    )
}