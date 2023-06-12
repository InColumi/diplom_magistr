import React, { FC, useEffect, useState } from 'react'
import Text from '../../components/Text'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { isFetchingS, textS, textInfoS } from './selectors'
import { getTextA } from './actions'
import { saveProgressA } from '../Player/actions'

type TextContainerProps = {
    isFetching: boolean
    text: string
    textInfo: {
        authors: []
        current_page: number
        title: string
        total_pages: number
    }
    getText: (data: any) => void
    saveProgress: (data: any) => void
}

const TextContainer: FC<TextContainerProps> = ({
    isFetching,
    text,
    textInfo,
    getText,
    saveProgress,
}) => {
    const { id } = useParams()
    const [decodedText, setDecodedText] = useState<any>(undefined)
    const [currentPage, setCurrentPage] = useState<number>(0)

    const handleFlipPage = (direction: string): void => {
        switch (direction) {
            case 'forward':
                if (currentPage + 1 < textInfo.total_pages) {
                    setCurrentPage(currentPage + 1)
                }
                break
            case 'back':
                if (currentPage >= 1) {
                    setCurrentPage(currentPage - 1)
                }
                break
            default:
                break
        }
    }

    useEffect(() => {
        if (currentPage === 0) return
        saveProgress({
            data: {
                id,
                current_page: currentPage,
            },
        })
    }, [id, currentPage, saveProgress])

    useEffect(() => {
        setCurrentPage(textInfo.current_page)
    }, [textInfo])

    useEffect(() => {
        getText({
            id,
            count_new_row: 30,
        })
    }, [])

    useEffect(() => {
        if (text) {
            const obj = JSON.parse(text)
            const formattedText = obj.map((item: any) =>
                item.split('\n').map((str: any, index: any) => (
                    <h2 key={index}>
                        {str}
                        <br />
                    </h2>
                ))
            )
            setDecodedText(formattedText)
        }
    }, [text])

    return (
        <Text
            text={decodedText}
            currentPage={currentPage}
            handleFlipPage={handleFlipPage}
        />
    )
}

export default connect(
    (state: RootStateInterface) => ({
        isFetching: isFetchingS(state),
        text: textS(state),
        textInfo: textInfoS(state),
    }),
    {
        getText: getTextA.request,
        saveProgress: saveProgressA.request,
    }
)(TextContainer)
