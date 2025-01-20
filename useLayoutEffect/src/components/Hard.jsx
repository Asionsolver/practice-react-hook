import  { useState, useRef, useLayoutEffect } from "react";

function Hard() {
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (boxRef.current) {
      const { top, left } = boxRef.current.getBoundingClientRect();
      console.log(`Box Position - Top: ${top}, Left: ${left}`);
    }
  }, [position]);

  const moveBox = () => {
    setPosition({
      top: Math.random() * 300,
      left: Math.random() * 300,
    });
  };

  return (
    <div className="relative h-[400px] w-[400px] border border-gray-300 mx-auto mt-10">
      <div
        ref={boxRef}
        style={{
          top: position.top,
          left: position.left,
        }}
        className="absolute w-16 h-16 bg-red-500 text-white flex items-center justify-center rounded-md shadow-lg transition-all"
      >
        Box
      </div>
      <button
        onClick={moveBox}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 absolute bottom-2 left-1/2 transform -translate-x-1/2"
      >
        Move Box
      </button>
    </div>
  );
}

export default Hard;
