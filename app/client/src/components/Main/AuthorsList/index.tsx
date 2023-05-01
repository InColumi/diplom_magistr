import React, { ReactElement } from 'react'
import { BsDot } from 'react-icons/bs'

const author = [
    {
        id: 1,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/91079/avatar.svg',
    },
    {
        id: 2,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/8137/avatar.svg',
    },
    {
        id: 3,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/7225/avatar.svg',
    },
    {
        id: 4,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/91079/avatar.svg',
    },
    {
        id: 5,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/8137/avatar.svg',
    },
    {
        id: 6,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/7225/avatar.svg',
    },
    {
        id: 7,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/91079/avatar.svg',
    },
    {
        id: 8,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/8137/avatar.svg',
    },
    {
        id: 9,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/91079/avatar.svg',
    },
    {
        id: 10,
        name: 'Author Name',
        img: 'https://www.svgrepo.com/show/7225/avatar.svg',
    },
]

const AuthorList = (): ReactElement => {
    return (
        <div className="flex flex-col h-full justify-between 2xl:pb-10 xl:pb-5 pt-5 px-5">
            <div className="flex w-full justify-between items-center xl:pb-5">
                <h1 className="2xl:text-4xl xl:text-xl text-gray-400 font-semibold">
                    Popular Authors
                </h1>
                <h2 className="2xl:text-2xl xl:text-md text-gray-400/60 cursor-pointer">
                    See All
                </h2>
            </div>
            <div className="h-[95%]">
                <ul className="flex h-full flex-col justify-between xl:rounded-2xl rounded-3xl">
                    {author.map((item: any) => (
                        <li>
                            <div
                                className="flex w-full items-center 2xl:gap-3 xl:gap-3 pl-3 2xl:py-2 xl:py-1 rounded-2xl cursor-pointer
                                hover:bg-nightbg hover:shadow-md hover:shadow-blue-gray-800 hover:scale-95 duration-300 ease-linear transition-all"
                            >
                                <div className="h-full w-1/5">
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="rounded-full"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-start 2xl:text-3xl xl:text-md text-white font-sans">
                                        {item.name}
                                    </h1>
                                    <div className="flex justify-between items-center text-white/30">
                                        <h2 className="text-start 2xl:text-3xl xl:text-sm font-sans">
                                            60 books
                                        </h2>
                                        <div className="text-3xl text-white/30">
                                            <BsDot />
                                        </div>
                                        <h2 className="text-start 2xl:text-3xl xl:text-sm font-sans">
                                            1000 reads
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AuthorList
