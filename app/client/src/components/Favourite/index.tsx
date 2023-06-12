import React, { ReactElement } from 'react'
import Pagination from '../Common/Pagination'
import FilterContainer from '../../containers/Common/Filter'
import BookContainer from '../../containers/Common/Book'
import SkeletonLoader from '../Common/SkeletonLoader'
import NoData from '../../UI/NoDataSvg'
import PlayerContainer from '../../containers/Player'

type FavouriteProps = {
    second: number
    isFetching: boolean
    books: any
    totalPages: number
    favouritePage: number
    isPlayer: boolean
    bookId: string
    bookUid: string
    bookName: string
    bookAuthor: string[]
    searchValue: string | undefined
    setSearchValue: (data: string) => void
    setSortValue: (data: string) => void
    handleOpenPlayer: (
        id: string,
        id_text: string,
        book: string,
        authors: string[]
    ) => void
    setPlayer: (data: boolean) => void
    handleChangePage: (page: number, flag: string) => void
    handleAdd: (id: string) => void
}

const Favourite = ({
    second,
    isFetching,
    books,
    totalPages,
    isPlayer,
    bookId,
    bookUid,
    bookName,
    bookAuthor,
    favouritePage,
    searchValue,
    setSearchValue,
    setSortValue,
    handleOpenPlayer,
    setPlayer,
    handleAdd,
    handleChangePage,
}: FavouriteProps): ReactElement => {
    return (
        <div className="flex flex-col bg-night w-full">
            <FilterContainer
                isFavourites={true}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setSortValue={setSortValue}
            />
            {(books?.length === 0 || books === undefined) && !isFetching ? (
                <div className="flex w-full h-full justify-center items-center">
                    <div className="flex justify-center items-center w-1/2 h-1/2">
                        <NoData />
                    </div>
                </div>
            ) : (
                <div
                    className="scrollbar scrollbar-thumb-nightbg/80 scrollbar-thumb-rounded-xl scrollbar-w-3
             hover:scrollbar-thumb-blue-gray-900/80 scrollbar-track-nightbg/50 w-full p-10 items-center max-h-screen
         overflow-y-scroll scrollbar-h-5 pb-24"
                >
                    {isFetching ? (
                        <SkeletonLoader isFavourites />
                    ) : (
                        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 2xl:gap-20 xl:gap-8">
                            {books?.map((item: any, index: number) => (
                                <BookContainer
                                    isFavourite={item?.is_favorites}
                                    key={item?.id}
                                    id={item?.id}
                                    page={item?.current_page}
                                    second={item?.current_second}
                                    idText={item?.id_text}
                                    name={item?.name}
                                    author={item?.authors}
                                    img={
                                        index === 0
                                            ? 'https://m.media-amazon.com/images/I/51PA0AEBFxL.jpg'
                                            : 'https://m.media-amazon.com/images/I/41qLJYLNccL._AC_UF350,350_QL50_.jpg'
                                    }
                                    rating={item?.rating_avg}
                                    onClick={handleAdd}
                                    handleOpenPlayer={handleOpenPlayer}
                                />
                            ))}
                        </div>
                    )}
                    {totalPages > 1 && (
                        <Pagination
                            page={favouritePage}
                            total={totalPages}
                            incrementPage={(): void =>
                                handleChangePage(favouritePage, 'increment')
                            }
                            decrementPage={(): void =>
                                handleChangePage(favouritePage, 'decrement')
                            }
                        />
                    )}
                </div>
            )}
            <PlayerContainer
                isPlayer={isPlayer}
                second={second}
                bookId={bookId}
                bookUid={bookUid}
                bookName={bookName}
                bookAuthor={bookAuthor}
                setPlayer={setPlayer}
            />
        </div>
    )
}

export default Favourite
