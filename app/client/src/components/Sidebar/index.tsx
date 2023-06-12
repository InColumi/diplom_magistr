import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { HiHome } from 'react-icons/hi'
import { MdFavorite } from 'react-icons/md'
import { RiSettingsFill, RiLogoutBoxRLine } from 'react-icons/ri'
import { ImBooks } from 'react-icons/im'

type SideBarIconProps = {
    icon: ReactElement
    text: string
    onClick?: (data: any) => void
}

const SideBarIcon = ({
    icon,
    text,
    onClick,
}: SideBarIconProps): ReactElement => {
    return (
        <div
            className="flex items-center justify-center h-12 w-12
        mt-2 mb-2 mx-auto shadow-lg bg-nightbg text-white hover:bg-yellow-700
        hover:text-white rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear
        cursor-pointer group"
            onClick={onClick}
        >
            {icon}
            <span
                className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
                text-white bg-gray-900 text-xs font-bold transition-all duration-100
                origin-left scale-0 group-hover:scale-100"
            >
                {text}
            </span>
        </div>
    )
}

type SidebarProps = {
    setOpen: (data: boolean) => void
    handleLogOut: () => void
}

const SideBar = ({ setOpen, handleLogOut }: SidebarProps): ReactElement => {
    return (
        <div className="relative top-0 left-0 h-screen w-16 m-0 flex flex-col justify-between bg-night border-nightbg border-r-2 text-white shadow-lg z-10">
            <div className="flex flex-col gap-5 pt-5">
                <img
                    src={require('../../UI/logonight.png')}
                    alt=""
                    className={`w-12 h-12 cursor-pointer duration-500 ml-2.5`}
                />
                <div className="flex flex-col gap-5">
                    <Link to={'/'}>
                        <SideBarIcon
                            text={'Home'}
                            icon={<HiHome size="28" />}
                        />
                    </Link>
                    <Link to={'/library'}>
                        <SideBarIcon
                            text={'Library'}
                            icon={<ImBooks size="28" />}
                        />
                    </Link>
                    <Link to={'/favourite'}>
                        <SideBarIcon
                            text={'Favourite'}
                            icon={<MdFavorite size="28" />}
                        />
                    </Link>
                    {/* <Link to={'/settings'}> */}
                    <SideBarIcon
                        text={'Settings'}
                        icon={<RiSettingsFill size="28" />}
                        onClick={(): void => setOpen(true)}
                    />
                    {/* </Link> */}
                </div>
            </div>
            <div className="px-2">
                <div
                    className="pb-5 border-t pt-5 border-gray-400"
                    onClick={(): void => handleLogOut()}
                >
                    <SideBarIcon
                        text={'Logout'}
                        icon={<RiLogoutBoxRLine size="28" />}
                    />
                </div>
            </div>
        </div>
    )
}

export default SideBar
