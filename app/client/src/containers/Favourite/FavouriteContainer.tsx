import React, { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Favourite from '../../components/Favourite'
import { isFetchingS, booksS, totalPagesS } from '../Library/selectors'
import { getBooksListA, addToFavouriteA } from '../Library/actions'

type FavouriteContainerProps = {
    isFetching: boolean
    books: any
    totalPages: number
    getBooksList: (data: any) => void
    addToFavourite: (data: any) => void
}

const FavouriteContainer: FC<FavouriteContainerProps> = ({
    isFetching,
    books,
    totalPages,
    getBooksList,
    addToFavourite,
}) => {
    const [favouritePage, setFavouritePage] = useState<number>(1)
    const [isPlayer, setPlayer] = useState<boolean>(false)
    const [bookId, setBookId] = useState<string>('')
    const [bookUid, setBookUid] = useState<string>('')
    const [bookName, setBookName] = useState<string>('')
    const [bookAuthor, setBookAuthor] = useState<string[]>([])
    const [searchValue, setSearchValue] = useState<string | undefined>(
        undefined
    )
    const [sortValue, setSortValue] = useState<string | undefined>(undefined)
    const [second, setSecond] = useState<number>(0)

    const handleOpenPlayer = (
        id: string,
        id_text: string,
        name: string,
        authors: string[],
        second?: number
    ) => {
        setPlayer(true)
        setBookId(id)
        setBookUid(id_text)
        setBookName(name)
        setBookAuthor(authors)
        setSecond(second || 0)
    }

    const handleChangePage = (page: number, flag: string): void => {
        /// верхний предел array.lenght() из редакса
        switch (flag) {
            case 'increment':
                if (page < totalPages) {
                    setFavouritePage(page + 1)
                    getBooksList({
                        id: page + 1,
                        size: window.innerWidth > 1536 ? 16 : 15,
                        is_favorites: true,
                    })
                }
                break
            case 'decrement':
                if (page > 1) {
                    setFavouritePage(page - 1)
                    getBooksList({
                        id: page - 1,
                        size: window.innerWidth > 1536 ? 16 : 15,
                        is_favorites: true,
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
                    id: favouritePage,
                    size: window.innerWidth > 1536 ? 16 : 15,
                    is_favorites: true,
                }),
        })
    }

    useEffect(() => {
        getBooksList({
            id: favouritePage,
            size: window.innerWidth > 1536 ? 16 : 15,
            is_favorites: true,
        })
    }, [])

    return (
        <Favourite
            second={second}
            isFetching={isFetching}
            books={books}
            totalPages={totalPages}
            favouritePage={favouritePage}
            isPlayer={isPlayer}
            bookId={bookId}
            bookUid={bookUid}
            bookName={bookName}
            bookAuthor={bookAuthor}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setSortValue={setSortValue}
            handleOpenPlayer={handleOpenPlayer}
            setPlayer={setPlayer}
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
)(FavouriteContainer)
