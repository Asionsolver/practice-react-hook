import { useRef } from "react"


const Focus = () => {
    const inputRef = useRef(null)
    const handleClick = () => {
        inputRef.current.focus(); // Focus the input field
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                placeholder="Type something..."
                className="border border-gray-400 p-2 rounded ring-2 ring-gray-400 focus:ring-red-500 focus:outline-none mt-2 mr-2"
            />
            <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Focus Input
            </button>
        </div>
    )
}

export default Focus