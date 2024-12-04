import { useContext } from "react";
import { ColorContext } from "../../context/ColorContextProvider";
import { getComplementaryColor, hexToHsl, hexToRgb } from "../../utils/colorFormator";



export const ColorFormats = () => {
    const { color, copyToClipboard, copiedColor } = useContext(ColorContext);
    const formats = [
        {
            id: 1,
            name: 'HEX',
            value: color,
            converter: (c) => c
        },
        {
            id: 2,
            name: 'RGB',
            value: hexToRgb(color),
            converter: hexToRgb
        },
        {
            id: 3,
            name: 'HSL',
            value: hexToHsl(color),
            converter: hexToHsl
        },
        {
            id: 4,
            name: 'Complementary',
            value: getComplementaryColor(color),
            converter: getComplementaryColor
        }
    ];
    return (
        <div className="mb-4">
            <h3 className="font-semibold mb-2">Color Formats</h3>
            <div className="grid grid-cols-2 gap-2">
                {
                    formats.map((format) => (
                        <div key={format.id} className="bg-gray-100 p-2 rounded">
                            <p className="text-sm font-medium">{format.name}</p>
                            <p>{format.value}</p>

                            <button
                                onClick={() => copyToClipboard(format.value)}
                                className="text-xs text-blue-500 hover:font-semibold"

                            >
                                <div>
                                    {
                                        copiedColor === format.value ? ' Copied' : ' Copy'
                                    }
                                </div>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
