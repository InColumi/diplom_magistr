import React, { FC } from 'react'
import { AiFillStar, AiFillRead } from 'react-icons/ai'
import { IoHeadsetSharp, IoHeartDislikeSharp, IoHeart } from 'react-icons/io5'
import { Button } from '@material-tailwind/react'

type BookProps = {
    isFavourite: boolean | null
    isLibrary?: boolean | undefined
    id: string
    idText: string
    page?: number | undefined
    second?: number | undefined
    img: string
    name: string
    author: string[]
    rating: number
    onClick: (data: any) => void
    handleOpenPlayer?: (
        id: string,
        id_text: string,
        book: string,
        authors: string[],
        second?: number
    ) => void
    handleOpenText?: (id: string) => void
}

const Book: FC<BookProps> = ({
    isFavourite,
    isLibrary,
    id,
    idText,
    page,
    second,
    img,
    name,
    author,
    rating,
    onClick,
    handleOpenPlayer,
    handleOpenText,
}) => {
    const getFlag = (name: string): string => {
        if (name?.length <= 5) {
            return '2xl:text-8xl xl:text-7xl line-clamp-1'
        } else if (name?.length <= 15) {
            return '2xl:text-4xl xl:text-5xl line-clamp-2'
        } else {
            return '2xl:text-4xl xl:text-3xl line-clamp-2'
        }
    }

    return (
        <>
            <div
                className={`2xl:w-full 2xl:h-[420px] xl:h-[340px] border-nightbg border-2 h-full 2xl:rounded-3xl
xl:rounded-2xl grid grid-cols-2 justify-center items-center
hover:shadow-md hover:shadow-blue-gray-800 duration-400 ease-linear transition-all`}
            >
                <div className="max-h-full h-full overflow-hidden">
                    <img
                        id={id}
                        src={img}
                        alt=""
                        className={`w-full h-full 2xl:rounded-3xl xl:rounded-2xl shadow-md shadow-blue-gray-800
                        ${isFavourite ? 'opacity-60' : 'opacity-80'}`}
                    />
                </div>
                <div className="flex flex-col !h-full 2xl:py-8 xl:py-3 2xl:h-full xl:h-[90%] 2xl:px-6 xl:px-4">
                    <div className="flex flex-col h-full w-full justify-between gap-2">
                        <div className="flex h-full flex-col gap-5">
                            <h1
                                className={`${getFlag(name)} text-start
                                text-blue-gray-400 font-bold font-['Monaco']`}
                            >
                                {name}
                            </h1>
                            <h2
                                className={`text-start ${
                                    author[0].length < 12
                                        ? '2xl:text-4xl xl:text-4xl'
                                        : '2xl:text-4xl xl:text-3xl'
                                } text-white font-sans line-clamp-2`}
                            >
                                {author[0]}
                            </h2>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center 2xl:text-4xl xl:text-3xl gap-2">
                                <AiFillStar
                                    color={rating >= 1 ? 'yellow' : 'gray'}
                                />
                                <AiFillStar
                                    color={rating >= 2 ? 'yellow' : 'gray'}
                                />
                                <AiFillStar
                                    color={rating >= 3 ? 'yellow' : 'gray'}
                                />
                                <AiFillStar
                                    color={rating >= 4 ? 'yellow' : 'gray'}
                                />
                                <AiFillStar
                                    color={rating === 5 ? 'yellow' : 'gray'}
                                />
                            </div>
                            {isLibrary ? (
                                <Button
                                    className={`shadow-none hover:shadow-none hover:scale-[98%] rounded-2xl w-full normal-case 2xl:h-16 xl:h-12 xl:text-md mt-3 ${
                                        isFavourite
                                            ? 'bg-nightbg text-gray-400 2xl:text-xl'
                                            : 'bg-yellow-600 text-night 2xl:text-xl'
                                    }`}
                                    variant="filled"
                                    onClick={(): void => onClick(id)}
                                >
                                    {isFavourite
                                        ? 'Remove'
                                        : 'Add to Favourite'}
                                </Button>
                            ) : (
                                <div className="flex justify-between">
                                    <div
                                        className="flex cursor-pointer text-3xl p-2 bg-red-200 2xl:w-14 xl:w-12 xl:h-12 rounded-xl items-center justify-center
                                        hover:scale-95 hover:bg-red-300 duration-400 ease-linear transition-all"
                                        onClick={(): void => onClick(id)}
                                    >
                                        {isFavourite ? (
                                            <IoHeartDislikeSharp />
                                        ) : (
                                            <IoHeart />
                                        )}
                                    </div>
                                    <div
                                        className="flex cursor-pointer text-3xl p-2 bg-brown-300 2xl:w-14 xl:w-12 xl:h-12 rounded-xl items-center justify-center
                                        hover:scale-95 hover:bg-brown-400 duration-400 ease-linear transition-all"
                                        onClick={
                                            handleOpenText
                                                ? (): void => handleOpenText(id)
                                                : () => ({})
                                        }
                                    >
                                        <AiFillRead />
                                    </div>
                                    <div
                                        className="flex cursor-pointer text-3xl p-2 bg-blue-gray-400 2xl:w-14 xl:w-12 xl:h-12 rounded-xl items-center justify-center
                                        hover:scale-95 hover:bg-blue-gray-500 duration-400 ease-linear transition-all"
                                        onClick={
                                            handleOpenPlayer
                                                ? (): void =>
                                                      handleOpenPlayer(
                                                          idText,
                                                          id,
                                                          name,
                                                          author,
                                                          second
                                                      )
                                                : () => ({})
                                        }
                                    >
                                        <IoHeadsetSharp />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book
