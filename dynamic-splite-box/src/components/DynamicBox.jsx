/* eslint-disable react/prop-types */
import { useState } from "react"


const DynamicBox = ({ width, height }) => {
    const [split, setSplit] = useState('none')
    const handleClick = () => {
        if (split === 'none') {
          setSplit('vertical');
        } else if (split === 'vertical') {
          setSplit('horizontal');
        } else if (split === 'horizontal') {
          setSplit('vertical');
        }
      };
    if (split === 'none') {
        return (
            <div 
            className={`bg-green-200 flex items-center justify-center`} 
            style={{ width: `${width}px`, height: `${height}px` }}>
                Click me to split
            </div>
        )
    }

    return (
        <div>
            <div onClick={handleClick}>
            <DynamicBox/>
            </div>
            <div className={`${split === 'horizontal' ? 'border-t-2' : 'border-l-2'} border-gray-700`}></div>
            <div onClick={handleClick}>
            <DynamicBox />
            </div>
        </div>
    )
}

export default DynamicBox