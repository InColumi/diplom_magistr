import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import Book from '../../../components/Common/Book'

type BookContainerProps = {
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
}

const BookContainer: FC<BookContainerProps> = ({
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
}) => {
    const navigate = useNavigate()

    const handleOpenText = (id: string): void => {
        navigate(`/text/${id}`)
    }

    return (
        <Book
            isFavourite={isFavourite}
            isLibrary={isLibrary}
            id={id}
            idText={idText}
            page={page}
            second={second}
            img={img}
            name={name}
            author={author}
            rating={rating}
            onClick={onClick}
            handleOpenPlayer={handleOpenPlayer}
            handleOpenText={handleOpenText}
        />
    )
}

export default BookContainer
