import { useContext } from "react";
import { ColorContext } from "../../context/ColorContextProvider";


export const ColorHistory = () => {
    const { colorHistory, setColor } = useContext(ColorContext);
    return (
        <div> 
            <h3 className="font-semibold mb-2">Color History</h3>
            <div className="flex space-x-2">
            {colorHistory.map((history, index) => (
                <button
                    key={index}
                    className="w-10 h-10 rounded"
                    onClick={() => setColor(history)}
                    style={{ backgroundColor: history }}
                    title={history}
                />
            ))}
            </div>
        </div>
    )
}
