import { useState } from "react";
import usePrevious from "../hook/usePrevious";


const TrackingPreviousState = () => {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);


    // console.log("Previous Count: ", prevCount);



    return (
        <div>
            <p className=" text-2xl font-bold text-gray-800 text-center">Current Count: {count}</p>
            <p className=" text-xl font-bold text-blue-800 mt-4 text-center">Previous Count: {prevCount ?? "N/A"}</p>
            <div className="flex justify-center items-center mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2 " onClick={() => setCount(count + 1)}>Increment</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => setCount(count - 1)}>Decrement</button>
            </div>
        </div>
    )
}

export default TrackingPreviousState