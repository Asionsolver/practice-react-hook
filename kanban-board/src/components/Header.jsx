
import { ChevronDown, ChevronUp, EllipsisVertical } from "lucide-react";
import logo from "../assets/logos.png"
import { useState } from "react";
import { HeaderDropDown } from "./HeaderDropDown";
export const Header = () => {
    const [openDropDown, setOpenDropDown] = useState(false);
    return (
        <div className="p-4 fixed left-0 bg-white dark:bg-gunMetal z-50 right-0">
            <header className="flex justify-between dark:text-white items-center">
                <div className="flex items-center space-x-2 md:space-x-4">
                    <img src={logo} className="h-10 w-10" />
                    <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">Kanban</h3>
                    <div className="flex items-center">
                        <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">Board Name</h3>
                        <div className="cursor-pointer ml-2 mt-2 md:hidden" onClick={() => setOpenDropDown(state => !state)}>{openDropDown ? <ChevronDown /> : <ChevronUp />}</div>
                    </div>
                </div>

                <div className="flex space-x-4 items-center md:space-x-6">
                    <button className="hidden md:block button">+ Add New Task</button>
                    <button className="button py-1 px-3 md:hidden">+</button>
                    <div className='cursor-pointer'>
                        <EllipsisVertical/>
                    </div>
                </div>
            </header>
            {openDropDown && <HeaderDropDown setOpenDropDown = {setOpenDropDown}/>}
        </div>
    )
}
