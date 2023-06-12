import React, { FC, useState, useEffect } from 'react'
import Library from '../../components/Library'
import { isFetchingS, booksS, totalPagesS } from './selectors'
import { getBooksListA, addToFavouriteA } from './actions'
import { connect } from 'react-redux'

type LibraryContainerProps = {
    isFetching: boolean
    books: any
    totalPages: number
    getBooksList: (data: any) => void
    addToFavourite: (data: any) => void
}

const LibraryContainer: FC<LibraryContainerProps> = ({
    isFetching,
    books,
    totalPages,
    getBooksList,
    addToFavourite,
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchValue, setSearchValue] = useState<string | undefined>(
        undefined
    )
    const [sortValue, setSortValue] = useState<string | undefined>(undefined)

    const handleChangePage = (page: number, flag: string): void => {
        /// верхний предел array.lenght() из редакса
        switch (flag) {
            case 'increment':
                if (page < totalPages) {
                    setCurrentPage(page + 1)
                    getBooksList({
                        id: page + 1,
                        value: searchValue,
                        sort: sortValue,
                        size: window.innerWidth > 1536 ? 16 : 15,
                    })
                }
                break
            case 'decrement':
                if (page > 1) {
                    setCurrentPage(page - 1)
                    getBooksList({
                        id: page - 1,
                        value: searchValue,
                        sort: sortValue,
                        size: window.innerWidth > 1536 ? 16 : 15,
                    })
                }
                break
            default:
                break
        }
    }

    const handleAdd = (id: string): void => {
        addToFavourite({
            data: {
                id,
            },
            callback: () =>
                getBooksList({
                    id: currentPage,
                    value: searchValue,
                    sort: sortValue,
                    size: window.innerWidth > 1536 ? 16 : 15,
                }),
        })
    }

    useEffect(() => {
        getBooksList({
            id: currentPage,
            value: searchValue,
            sort: sortValue,
            size: window.innerWidth > 1536 ? 16 : 15,
        })
    }, [searchValue, sortValue])

    return (
        <Library
            isFetching={isFetching}
            books={books}
            totalPages={totalPages}
            currentPage={currentPage}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setSortValue={setSortValue}
            handleChangePage={handleChangePage}
            handleAdd={handleAdd}
        />
    )
}

export default connect(
    (state: RootStateInterface) => ({
        isFetching: isFetchingS(state),
        books: booksS(state),
        totalPages: totalPagesS(state),
    }),
    {
        getBooksList: getBooksListA.request,
        addToFavourite: addToFavouriteA.request,
    }
)(LibraryContainer)
