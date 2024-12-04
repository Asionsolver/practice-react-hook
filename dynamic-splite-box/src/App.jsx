import DynamicBox from "./components/DynamicBox"
// import SplitBox from "./components/SplitBox"


function App() {


  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* <div className="w-screen h-screen p-4 bg-gray-300"> */}
      {/* <SplitBox /> */}
      <DynamicBox width={500} height={500} />
      {/* </div> */}
    </div>
  )
}

export default App




