import React, { ReactElement } from 'react'
import Pagination from '../Common/Pagination'
import Filter from '../Common/Filter'
import Book from '../Common/Book'

const array = [
    {
        id: 1,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 2,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 3,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 4,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 5,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 6,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 7,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 8,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 9,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 10,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 10,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 10,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 10,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 10,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 10,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 10,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
]

type LibraryProps = {
    currentPage: number
    handleChangePage: (page: number, flag: string) => void
}

const Library = ({
    currentPage,
    handleChangePage,
}: LibraryProps): ReactElement => {
    return (
        <div className="flex flex-col bg-night">
            <Filter />
            <div
                className="scrollbar scrollbar-thumb-nightbg/80 scrollbar-thumb-rounded-xl scrollbar-w-2
            hover:scrollbar-thumb-blue-gray-900/80 scrollbar-track-nightbg/50 w-full p-10 items-center max-h-screen
        overflow-y-scroll scrollbar-h-5 pb-24"
            >
                <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 2xl:gap-20 xl:gap-8">
                    {array.map((item: any) => (
                        <Book id={item.id.toString()} img={item.img} />
                    ))}
                </div>
                <Pagination
                    page={currentPage}
                    incrementPage={(): void =>
                        handleChangePage(currentPage, 'increment')
                    }
                    decrementPage={(): void =>
                        handleChangePage(currentPage, 'decrement')
                    }
                />
            </div>
        </div>
    )
}

export default Library
