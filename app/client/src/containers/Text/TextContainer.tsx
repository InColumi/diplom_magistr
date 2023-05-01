import React, { FC, useEffect, useState } from 'react'
import Book from '../../components/Text'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { isFetchingS, textS } from './selectors'
import { getTextA } from './actions'

type TextContainerProps = {
    isFetching: boolean
    text: any
    getText: (data: any) => void
}

const TextContainer: FC<TextContainerProps> = ({
    isFetching,
    text,
    getText,
}) => {
    const { id } = useParams()
    const [decodedText, setDecodedText] = useState<any>(undefined)
    const [windowHeight, setWindowHeight] = useState<any>(undefined)

    useEffect(() => {
        const size = window.innerHeight
        /// добавить ивент-лиснер на кей-ап
        getText({
            id,
            count_new_row: size > 754 ? 38 : 30,
        })
    }, [windowHeight])

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (text) {
            const obj = JSON.parse(text)
            const formattedText = obj.text
                .split('\n')
                .map((str: any, index: any) => (
                    <React.Fragment key={index}>
                        {str}
                        <br />
                    </React.Fragment>
                ))
            setDecodedText(formattedText)
        }
    }, [text])

    useEffect(() => {
        console.log(decodedText)
    }, [decodedText])

    return <Book text={decodedText} />
}

export default connect(
    (state: RootStateInterface) => ({
        isFetching: isFetchingS(state),
        text: textS(state),
    }),
    {
        getText: getTextA.request,
    }
)(TextContainer)
