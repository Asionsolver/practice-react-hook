import { useLayoutEffect, useRef, useState } from "react";


export const Medium = () => {
    const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i));
  const listRef = useRef(null);

  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [items]);

  const addItem = () => {
    setItems((prev) => [...prev, prev.length]);
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <div
        ref={listRef}
        className="h-64 w-64 overflow-auto border border-gray-300 p-4"
      >
        {items.map((item) => (
          <div key={item} className="p-2 bg-gray-100 my-1 rounded-md">
            Item {item}
          </div>
        ))}
      </div>
      <button
        onClick={addItem}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add Item
      </button>
    </div>
  )
}
