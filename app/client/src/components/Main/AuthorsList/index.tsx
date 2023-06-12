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

type AuthorListProps = {
    topAuthors: any
}

const AuthorList = ({ topAuthors }: AuthorListProps): ReactElement => {
    return (
        <div className="flex flex-col h-full justify-between 2xl:pb-10 xl:pb-5 pt-5 px-5">
            <h1 className="2xl:text-4xl xl:text-xl text-gray-400 font-semibold pb-5 uppercase pl-2">
                Popular Authors
            </h1>
            <div className="h-[95%]">
                <ul className="flex h-full w-full flex-col gap-1 justify-between xl:rounded-2xl rounded-3xl">
                    {topAuthors.map((item: any) => (
                        <li key={item?.ref_authors_id}>
                            <div
                                className="flex w-full items-center 2xl:gap-3 xl:gap-3 pl-1 2xl:py-4 xl:pr-3 border-2 border-nightbg 2xl:rounded-3xl xl:rounded-xl cursor-pointer
                                hover:bg-nightbg hover:shadow-md hover:shadow-blue-gray-800 hover:scale-[98%] duration-300 ease-linear transition-all"
                            >
                                <div className="h-full 2xl:pl-1 2xl:p-0 xl:p-1 2xl:w-1/5 xl:w-1/5">
                                    <img
                                        src="https://www.svgrepo.com/show/91079/avatar.svg"
                                        alt=""
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <h1 className="text-start 2xl:text-3xl xl:text-md text-white font-sans line-clamp-1">
                                        {item?.authors[0]}
                                    </h1>
                                    <div className="flex w-full items-center text-white/30">
                                        <h2 className="text-start 2xl:text-3xl xl:text-sm font-sans">
                                            {item?.count_books}{' '}
                                            {item?.count_books
                                                ?.toString()
                                                ?.endsWith('1')
                                                ? 'book'
                                                : 'books'}
                                        </h2>
                                        <BsDot />
                                        <h2 className="text-start 2xl:text-3xl xl:text-sm font-sans">
                                            {item?.count_readers}{' '}
                                            {item?.count_readers
                                                ?.toString()
                                                ?.endsWith('1')
                                                ? 'read'
                                                : 'reads'}
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
