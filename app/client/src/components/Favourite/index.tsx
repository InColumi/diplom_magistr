import React, { ReactElement } from 'react'
import { AiFillStar, AiFillDelete } from 'react-icons/ai'
import { Button } from '@material-tailwind/react'

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
]

const Favourite = (): ReactElement => {
    return (
        <div
            className="scrollbar scrollbar-thumb-nightbg/80 scrollbar-thumb-rounded-xl scrollbar-w-2
            hover:scrollbar-thumb-blue-gray-900/80 scrollbar-track-nightbg/50 bg-night w-full min-h-full p-10 items-center max-h-screen
        overflow-y-scroll scrollbar-h-5"
        >
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 2xl:gap-16 xl:gap-8">
                {array.map((item: any) => (
                    <div
                        className="border-nightbg border-2 h-full 2xl:rounded-[36px]
                    xl:rounded-3xl grid grid-cols-2 justify-center items-center cursor-pointer
                    hover:bg-nightbg hover:shadow-md hover:shadow-blue-gray-800 hover:scale-[98%] duration-400 ease-linear transition-all"
                    >
                        <div className="flex h-full justify-center items-center overflow-hidden">
                            <img
                                id={item.id}
                                src={item.img}
                                alt=""
                                className="w-full h-[100%] flex 2xl:rounded-3xl xl:rounded-2xl shadow-md shadow-blue-gray-800 opacity-70"
                            />
                        </div>
                        <div className="flex flex-col justify-between 2xl:py-[15%] xl:py-[5%] 2xl:h-full xl:h-[90%] 2xl:px-8 xl:px-4">
                            <div className="flex flex-col h-full justify-between">
                                <h1 className="text-start 2xl:text-6xl xl:text-5xl text-white font-bold font-['Monaco']">
                                    BOOK NAME
                                </h1>
                                <h2 className="text-start 2xl:text-4xl xl:text-4xl text-white font-sans">
                                    by Book Author
                                </h2>
                                <div className="flex items-center 2xl:text-4xl xl:text-2xl gap-2">
                                    <AiFillStar color="yellow" />
                                    <h3 className="text-start text-white font-sans">
                                        9.4
                                    </h3>
                                </div>
                                <Button
                                    className="rounded-xl w-full normal-case 2xl:text-lg xl:text-sm text-blue-gray-900 flex justify-center items-center gap-3"
                                    variant="filled"
                                    color="red"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Favourite
