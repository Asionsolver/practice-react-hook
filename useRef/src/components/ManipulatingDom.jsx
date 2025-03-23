import { useRef } from "react";


const ManipulatingDom = () => {
    const myRef = useRef(null); // {current: null}
    console.log(myRef);
    return (
        <div ref={myRef}>ManipulatingDom</div>
    )
}

export default ManipulatingDom