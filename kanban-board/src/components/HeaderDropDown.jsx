/* eslint-disable react/prop-types */
import { Moon, SquareKanban, Sun } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Switch } from '@headlessui/react'
import { useDarkMood } from './../hooks/useDarkMood';
import { useState } from 'react';
export const HeaderDropDown = ({ setOpenDropDown }) => {
    const [colorTheme, setTheme] = useDarkMood();
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false)

    const toggleDarkMode = (checked) => {
        // console.log(checked);
        setTheme(colorTheme);
        setDarkSide(checked);
    }
    const boards = useSelector((state) => state.boards)

    return (
        <div className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]" onClick={(e) => {
            if (e.target !== e.currentTarget) {
                return
            } setOpenDropDown(false)
        }}>
            <div className="bg-white dark:bg-gunMetal shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
                <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">All Boards ({boards?.length})</h3>
                <div>
                    {
                        boards.map((board, index) => (
                            <div key={index} className={`flex dark: text-white items-center space-x-2 px-5 py-4 ${board.isActive && 'bg-[#635fc7] rounded-r-full text-white mr-8'}`}>
                                <div className=' text-gray-400'>
                                    <SquareKanban />
                                </div>
                                <p className='text-lg font-bold '>{board.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex items-center space-x-2 text-[#635fc7] px-5 py-7'>
                    <div className=' text-gray-400'>
                        <SquareKanban />
                    </div>
                    <p className='text-lg font-bold'>Create New Board</p>
                </div>
                <div className='mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
                    <Sun />
                    <Switch
                        checked={darkSide}
                        onChange={toggleDarkMode}
                        className={`${darkSide ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                        <span
                            className={`${darkSide ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full transition`}
                        />
                    </Switch>
                    <Moon />
                </div>
            </div>
        </div>
    )
}
