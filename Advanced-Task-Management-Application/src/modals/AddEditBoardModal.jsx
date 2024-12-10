/* eslint-disable react/prop-types */



export const AddEditBoardModal = ({ setBoardModalOpen, type }) => {
  return (
    <div
    className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex bg-[#00000080] "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return
        }
        setBoardModalOpen(false);
      }}
      >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl">
        <h3 className="text-lg">
          {type === 'edit' ? 'Edit' : 'Add New'} Board
        </h3>
        <div>Board Column</div>
      </div>
    </div>
  )
}
