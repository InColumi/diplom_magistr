import React, { ReactElement } from 'react'
import Pagination from '../Common/Pagination'
import FilterContainer from '../../containers/Common/Filter'
import BookContainer from '../../containers/Common/Book'
import SkeletonLoader from '../Common/SkeletonLoader'
import NoData from '../../UI/NoDataSvg'

type LibraryProps = {
    isFetching: boolean
    books: any
    totalPages: number
    currentPage: number
    searchValue: string | undefined
    setSearchValue: (data: string) => void
    setSortValue: (data: string) => void
    handleChangePage: (page: number, flag: string) => void
    handleAdd: (id: string) => void
}

const Library = ({
    isFetching,
    books,
    totalPages,
    currentPage,
    searchValue,
    setSearchValue,
    setSortValue,
    handleChangePage,
    handleAdd,
}: LibraryProps): ReactElement => {
    return (
        <div className="flex flex-col bg-night w-full">
            <FilterContainer
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
                        <SkeletonLoader />
                    ) : (
                        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 2xl:gap-20 xl:gap-8">
                            {books?.map((item: any) => (
                                <BookContainer
                                    isFavourite={item.is_favorites}
                                    isLibrary
                                    key={item.id}
                                    id={item.id}
                                    idText={item.id_text}
                                    name={item.name}
                                    author={item.authors}
                                    img={
                                        'https://m.media-amazon.com/images/I/31obJjS1jzL._AC_UF1000,1000_QL80_.jpg'
                                    }
                                    rating={5}
                                    onClick={handleAdd}
                                />
                            ))}
                        </div>
                    )}
                    {totalPages > 1 && (
                        <Pagination
                            page={currentPage}
                            total={totalPages}
                            incrementPage={(): void =>
                                handleChangePage(currentPage, 'increment')
                            }
                            decrementPage={(): void =>
                                handleChangePage(currentPage, 'decrement')
                            }
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default Library
