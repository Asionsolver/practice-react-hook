import { useState, useRef } from 'react';

export default function Stopwatch() {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const intervalRef = useRef(null);

    // console.log('intervalRef:', intervalRef);

    function handleStart() {
        setStartTime(Date.now());
        setNow(Date.now());

        // clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);

        // let setIntervals = setInterval(() => {
        //     setNow(Date.now());
        // }, 10);
    }

    function handleStop() {
        clearInterval(intervalRef.current);
        // clearInterval(setIntervals);
    }

    let secondsPassed = 0;
    if (startTime != null && now != null) {
        secondsPassed = (now - startTime) / 1000;
    }

    return (
        <>
            <h1
                className='text-4xl font-bold text-center'
            >Time passed: {secondsPassed.toFixed(3)}</h1>
            <div className='flex justify-center space-x-4 mt-4'>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handleStart}
                >Start</button>
                <button
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handleStop}
                >Stop</button>
            </div>
        </>
    );
}
