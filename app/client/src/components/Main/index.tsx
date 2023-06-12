import React, { FC } from 'react'
import { AiFillRead } from 'react-icons/ai'
import { IoHeadsetSharp } from 'react-icons/io5'
import SwiperBlock from './Swiper'
import AuthorList from './AuthorsList'
import LastBook from './LastBook'
import PlayerContainer from '../../containers/Player'
import MainSkeleton from '../Common/MainSkeleton'

type MainProps = {
    isFetching: boolean
    topAuthors: any
    recomendations: any
    lastBook: any
    lastBookText: string
    isPlayer: boolean
    bookId: string
    bookName: string
    bookAuthor: string[]
    bookUid: string
    setPlayer: (data: boolean) => void
    handleOpenPlayer: (
        id: string,
        id_text: string,
        name: string,
        authors: string[]
    ) => void
    handleOpenText: () => void
    handleAdd: (data: any) => void
}

const Main: FC<MainProps> = ({
    isFetching,
    topAuthors,
    recomendations,
    lastBook,
    lastBookText,
    isPlayer,
    bookId,
    bookUid,
    bookName,
    bookAuthor,
    setPlayer,
    handleOpenPlayer,
    handleOpenText,
    handleAdd,
}) => {
    return (
        <>
            {isFetching ? (
                <MainSkeleton />
            ) : (
                <div className="bg-night w-full">
                    <div className="flex w-full h-full overflow-hidden max-h-screen">
                        <div className="flex flex-col 2xl:w-4/5 xl:w-3/4">
                            <div className="flex justify-between items-center w-full xl:px-5 2xl:px-10 pt-5">
                                <h2 className="2xl:text-4xl xl:text-xl text-gray-400 font-semibold uppercase">
                                    Continue reading or listening
                                </h2>
                                <div className="grid grid-cols-2 2xl:w-[124px] 2xl:h-12 xl:w-[76px] xl:h-[30px] 2xl:gap-7 xl:gap-5">
                                    <div
                                        className="flex text-3xl p-1 bg-brown-300 2xl:w-12 2xl:h-12 xl:w-7 xl:h-7 cursor-pointer xl:rounded-lg 2xl:rounded-xl items-center justify-center
                                    hover:bg-brown-300/80 duration-400 ease-linear transition-all"
                                        onClick={(): void => handleOpenText()}
                                    >
                                        <AiFillRead />
                                    </div>
                                    <div
                                        className="flex text-3xl p-1 bg-blue-gray-300 2xl:w-12 2xl:h-12 xl:w-7 xl:h-7 cursor-pointer xl:rounded-lg 2xl:rounded-xl items-center justify-center
                                    hover:bg-blue-gray-300/80 duration-400 ease-linear transition-all"
                                        onClick={(): void =>
                                            handleOpenPlayer(
                                                bookId,
                                                lastBook.id,
                                                bookName,
                                                bookAuthor
                                            )
                                        }
                                    >
                                        <IoHeadsetSharp />
                                    </div>
                                </div>
                            </div>
                            <LastBook
                                lastBook={lastBook}
                                lastBookText={lastBookText}
                            />
                            <div className="flex flex-col gap-5 border-t-2 border-dashed border-blue-gray-900 h-2/3 2xl:p-10 xl:p-5 overflow-hidden">
                                {recomendations?.length > 0 && (
                                    <SwiperBlock
                                        recomendations={recomendations}
                                        handleAdd={handleAdd}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="2xl:w-1/5 xl:w-1/4 border-l-2 border-dashed border-blue-gray-900">
                            <AuthorList topAuthors={topAuthors} />
                        </div>
                    </div>
                </div>
            )}
            <PlayerContainer
                isPlayer={isPlayer}
                bookId={lastBook?.id_text}
                second={lastBook?.current_second}
                bookUid={bookUid}
                bookName={lastBook?.title}
                bookAuthor={lastBook?.authors}
                setPlayer={setPlayer}
            />
        </>
    )
}

export default Main
