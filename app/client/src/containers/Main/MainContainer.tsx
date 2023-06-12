import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router'
import Main from '../../components/Main'
import { getRecomendationsA, getTopAuthorsA, getLastReadedA } from './actions'
import { addToFavouriteA } from '../Library/actions'
import {
    isFetchingS,
    topAuthorsS,
    recomendationsS,
    lastBookS,
    lastBookTextS,
} from './selectors'

type MainProps = {
    isFetching: boolean
    topAuthors: any
    recomendations: any
    lastBook: any
    lastBookText: string
    getRecomendations: (data: any) => void
    getTopAuthors: (data: any) => void
    getLastReaded: () => void
    addToFavourite: (data: any) => void
}

const MainContainer: FC<MainProps> = ({
    isFetching,
    topAuthors,
    lastBook,
    lastBookText,
    recomendations,
    getRecomendations,
    getTopAuthors,
    getLastReaded,
    addToFavourite,
}) => {
    const navigate = useNavigate()
    const [decodedText, setDecodedText] = useState<string>('')
    const [isPlayer, setPlayer] = useState<boolean>(false)
    const [bookId, setBookId] = useState<string>('')
    const [bookUid, setBookUid] = useState<string>('')
    const [bookName, setBookName] = useState<string>('')
    const [bookAuthor, setBookAuthor] = useState<string[]>([])

    const handleAdd = (id: string): void => {
        addToFavourite({
            data: {
                id,
            },
            callback: () => getRecomendations({}),
        })
    }

    const handleOpenPlayer = (
        id: string,
        id_text: string,
        name: string,
        authors: string[]
    ) => {
        setPlayer(true)
        setBookId(id)
        setBookUid(id_text)
        setBookName(name)
        setBookAuthor(authors)
    }

    const handleOpenText = (): void => {
        navigate(`/text/${lastBook?.id}`)
    }

    useEffect(() => {
        getRecomendations({})
        getTopAuthors({})
        getLastReaded()
    }, [])

    useEffect(() => {
        if (lastBookText) {
            const text = JSON.parse(lastBookText)
            const formattedText = text
                .split('\n')
                .map((str: any, index: any) => (
                    <React.Fragment key={index}>
                        {str}
                        <br />
                    </React.Fragment>
                ))
            setDecodedText(formattedText)
        }
    }, [lastBookText])

    return (
        <Main
            isFetching={isFetching}
            topAuthors={topAuthors}
            lastBook={lastBook}
            lastBookText={decodedText}
            recomendations={recomendations}
            isPlayer={isPlayer}
            bookId={bookId}
            bookName={bookName}
            bookAuthor={bookAuthor}
            setPlayer={setPlayer}
            bookUid={bookUid}
            handleOpenPlayer={handleOpenPlayer}
            handleOpenText={handleOpenText}
            handleAdd={handleAdd}
        />
    )
}

export default connect(
    (state: RootStateInterface) => ({
        isFetching: isFetchingS(state),
        topAuthors: topAuthorsS(state),
        lastBook: lastBookS(state),
        lastBookText: lastBookTextS(state),
        recomendations: recomendationsS(state),
    }),
    {
        getRecomendations: getRecomendationsA.request,
        getTopAuthors: getTopAuthorsA.request,
        getLastReaded: getLastReadedA.request,
        addToFavourite: addToFavouriteA.request,
    }
)(MainContainer)
