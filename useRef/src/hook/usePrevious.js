import { useRef, useEffect } from "react";
function usePrevious(value, initialValue = null) {
    const ref = useRef(initialValue);

    // console.log(value);
    // console.log(ref);
    // update the ref after the current render
    useEffect(() => {
        ref.current = value;
    }, [value]);
    // console.log(ref.current);
    // console.log(value)

    // Return previous value (happens before update in useEffect above)
    return ref.current === initialValue ? value : ref.current;
}

export default usePrevious;