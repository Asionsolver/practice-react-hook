import { useState, useLayoutEffect, useRef } from "react";

function Simple() {
  // const [num, setNum] = useState(0);
  const divRef = useRef(null);
  const [width, setWidth] = useState(0);
  // useLayoutEffect(() => {
  //   if (num === 0) {
  //     setNum(5 + Math.random() * 50);
  //   }
  // }, [num]);

  // useEffect(() => {
  //   if (num === 0) {
  //     setNum(5 + Math.random() * 50);
  //   }
  // }, [num]);

  useLayoutEffect(() => {
    if (divRef.current) {
      console.log(divRef);
      setWidth(divRef.current.offsetWidth);
    }
  }, []);
  // console.log("LayoutEffect: ", num);
  return (
    <>
      {/* <div className="text-red-500 text-center text-3xl font-bold">
        The number: {num}
      </div>

      <button className='p-0 my-0 mx-auto' onClick={() => setNum(0)}>Check</button> */}
      <div className="flex flex-col items-center mt-10">
        <div
          ref={divRef}
          className="bg-blue-500 text-white text-center p-4 rounded-md"
        >
          Resize the window to see the width!
        </div>
        <p className="mt-4 text-lg text-gray-700">Width: {width}px</p>
      </div>
    </>
  );
}

export default Simple;
