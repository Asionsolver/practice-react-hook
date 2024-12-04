
import { ColorContextProvider } from "../../context/ColorContextProvider"
import { ColorDisplay } from "./ColorDisplay"
import { ColorFormats } from "./ColorFormats"


export const ColorPicker = () => {
  
  return (
    <ColorContextProvider>
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <ColorDisplay />
        <ColorFormats/>
      </div>
    </ColorContextProvider>
  )
}
