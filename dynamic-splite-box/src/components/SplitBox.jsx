import { useState } from "react"


const SplitBox = () => {
    const [split, setSplit] = useState('none')
    const boxStyle = `w-full h-full border-2 border-gray-300  rounded-md 
    ${split === 'none' ? 'bg-blue-100 hover:bg-blue-200' : ''}
    ${split === 'horizontal' ? 'flex flex-col bg-red-400' : ''}
    ${split === 'vertical' ? 'flex flex-row bg-green-400' : ''}
    `

    const handleClick = () => {
        if (split === 'none') {
            setSplit('vertical');
        } else if (split === 'vertical') {
            setSplit('horizontal');
        } else if (split === 'horizontal') {
            setSplit('vertical');
        }
    }

    if (split === 'none') {
        return (
            <div className={boxStyle} onClick={handleClick}>
                <div className="w-full h-full flex items-center justify-center">
                    Click to split
                </div>
            </div>
        );
    }
    return (
        <div className={boxStyle}>
            <div className="w-full h-full" onClick={handleClick}>
                <SplitBox />
            </div>
            <div className={`${split === 'horizontal' ? 'border-t-2' : 'border-l-2'} border-gray-300`}></div>
            <div className="w-full h-full" onClick={handleClick}>
                <SplitBox />
            </div>
        </div>
    )
}

export default SplitBox