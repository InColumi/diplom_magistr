import React, { ReactElement } from 'react'
import { IoIosArrowDropleft } from 'react-icons/io'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdFavorite } from 'react-icons/md'
import { RiSettingsFill, RiLogoutBoxRLine } from 'react-icons/ri'
import { ImBooks } from 'react-icons/im'

type SidebarProps = {
    isVisible: boolean
    setVisible: (data: boolean) => void
}

const Sidebar = ({ isVisible, setVisible }: SidebarProps): ReactElement => {
    return (
        <div>
            <div
                className={`${
                    isVisible ? 'w-52' : 'w-20'
                } duration-300 h-100v bg-nightbg relative rounded-r-3xl p5 pt-8`}
            >
                <IoIosArrowDropleft
                    className={`cursor-pointer w-8 h-8 absolute -right-4 top-10 text-yellow-800 bg-nightbg rounded-full ${
                        !isVisible && 'rotate-180'
                    }`}
                    onClick={(): void => setVisible(!isVisible)}
                />
                <div className="flex gap-x-3 items-center">
                    <img
                        src={require('../../UI/logonight.png')}
                        alt=""
                        className={`w-12 h-12 cursor-pointer duration-500 ml-2.5`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-300 ${
                            !isVisible && 'scale-0'
                        }`}
                    >
                        Vlad
                    </h1>
                </div>
                <ul className="pt-8 flex flex-col gap-3">
                    <li
                        className={`text-md text-white flex items-center gap-x-4 cursor-pointer p-2 
                            hover:after:w-4 hover:after:h-2 hover:after:bg-yellow-800 hover:after:rounded-full`}
                    >
                        <div className={`w-12 h-12 text-2xl`}>
                            <div className="w-12 h-12 flex items-center justify-center color-blue-gray-50 hover:scale-90 hover:text-yellow-800 hover:duration-200">
                                <ImBooks />
                            </div>
                        </div>
                        <div
                            className={`${
                                !isVisible && 'scale-0'
                            } duration-300 origin-left flex justify-between items-center w-full`}
                        >
                            Library
                        </div>
                    </li>
                    <li
                        className={`text-md text-white flex items-center gap-x-4 cursor-pointer p-2 
                            hover:after:w-4 hover:after:h-2 hover:after:bg-yellow-800 hover:after:rounded-full`}
                    >
                        <div className={`w-12 h-12 text-2xl`}>
                            <div className="w-12 h-12 flex items-center justify-center color-blue-gray-50 hover:scale-90 hover:text-yellow-800 hover:duration-200">
                                <MdFavorite />
                            </div>
                        </div>
                        <div
                            className={`${
                                !isVisible && 'scale-0'
                            } duration-300 origin-left flex justify-between items-center w-full`}
                        >
                            Favourite
                        </div>
                    </li>
                    <li
                        className={`text-md text-white flex items-center gap-x-4 cursor-pointer p-2 
                            hover:after:w-4 hover:after:h-2 hover:after:bg-yellow-800 hover:after:rounded-full`}
                    >
                        <div className={`w-12 h-12 text-2xl`}>
                            <div className="w-12 h-12 flex items-center justify-center color-blue-gray-50 hover:scale-90 hover:text-yellow-800 hover:duration-200">
                                <BsFillPersonFill />
                            </div>
                        </div>
                        <div
                            className={`${
                                !isVisible && 'scale-0'
                            } duration-300 origin-left flex justify-between items-center w-full`}
                        >
                            Profile
                        </div>
                    </li>
                    <li
                        className={`text-md text-white flex items-center gap-x-4 cursor-pointer p-2 
                            ${
                                isVisible ? 'w-52' : 'w-20'
                            } hover:after:w-4 hover:after:h-2 hover:after:bg-yellow-800 hover:after:rounded-full`}
                    >
                        <div className={`w-12 h-12 text-2xl`}>
                            <div className="w-12 h-12 flex items-center justify-center color-blue-gray-50 hover:scale-90 hover:text-yellow-800 hover:duration-200">
                                <RiSettingsFill />
                            </div>
                        </div>
                        <div
                            className={`${
                                !isVisible && 'scale-0'
                            } duration-300 origin-left flex justify-between items-center w-full`}
                        >
                            Settings
                        </div>
                    </li>
                    <li
                        className={`text-md text-white flex items-center gap-x-4 cursor-pointer p-2 fixed bottom-3 
                        ${
                            isVisible ? 'w-52' : 'w-20'
                        } hover:after:w-4 hover:after:h-2 hover:after:bg-yellow-800 hover:after:rounded-full`}
                    >
                        <div className={`w-12 h-12 text-2xl`}>
                            <div className="w-12 h-12 flex items-center justify-center color-blue-gray-50 hover:scale-90 hover:text-yellow-800 hover:duration-200">
                                <RiLogoutBoxRLine />
                            </div>
                        </div>
                        <div
                            className={`${
                                !isVisible && 'scale-0'
                            } duration-300 origin-left flex justify-between items-center w-full`}
                        >
                            Log out
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
