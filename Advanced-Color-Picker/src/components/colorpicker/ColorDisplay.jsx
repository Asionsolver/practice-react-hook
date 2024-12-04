import { useContext, useRef } from "react"
import { ColorContext } from "../../context/ColorContextProvider"
import { Paintbrush, Copy, Check } from 'lucide-react';

export const ColorDisplay = () => {
  const { color, setColor, copyToClipboard, copiedColor } = useContext(ColorContext);
  const colorInputRef = useRef(null);
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
  };
  return (
    <div>
      <div
        className="h-36 w-full rounded-lg mb-4 flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {color}
      </div>
      <div className="flex space-x-2 mb-4">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          ref={colorInputRef}
          className="hidden"
        />
        <button
          onClick={() => colorInputRef.current.click()}
          className="flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          <Paintbrush className="mr-2" size={20} /> Pick Color
        </button>
        <button
          onClick={() => copyToClipboard(color)}
          className="flex items-center justify-center bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          // style={{ backgroundColor: color }}
        >
          {copiedColor === color ? (
            <Check size={20} className="" />
          ) : (
            <Copy size={20} className="text-white" />
          )}

          <div className="ml-1 " >
            {
              copiedColor === color ? ' Copied' : ' Copy'
            }
          </div>
        </button>
      </div>
    </div>
  )
}
