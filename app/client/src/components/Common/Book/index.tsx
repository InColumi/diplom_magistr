import React, { FC } from 'react'
import { Button } from '@material-tailwind/react'
import { AiFillStar } from 'react-icons/ai'

type BookProps = {
    id: string
    img: string
}

const Book: FC<BookProps> = ({ id, img }) => {
    return (
        <>
            <div
                className="border-nightbg border-2 h-full 2xl:rounded-3xl
xl:rounded-2xl grid grid-cols-2 justify-center items-center cursor-pointer
hover:bg-nightbg hover:shadow-md hover:shadow-blue-gray-800 hover:scale-[98%] duration-400 ease-linear transition-all"
            >
                <div className="flex h-full justify-center items-center overflow-hidden">
                    <img
                        id={id}
                        src={img}
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
                        <div className="flex items-center 2xl:text-4xl xl:text-lg gap-2">
                            <AiFillStar color="yellow" />
                            <AiFillStar color="yellow" />
                            <AiFillStar color="yellow" />
                            <AiFillStar color="yellow" />
                            <AiFillStar color="yellow" />
                            <AiFillStar color="gray" />
                        </div>
                        <Button
                            className="rounded-2xl w-full normal-case 2xl:text-lg xl:text-sm text-blue-gray-900"
                            variant="filled"
                            color="yellow"
                        >
                            Add to Favourite
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book
