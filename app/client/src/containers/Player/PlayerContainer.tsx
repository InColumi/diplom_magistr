import { FC, useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { isFetchingS } from './selectors'
import { saveProgressA } from './actions'
import { getLastReadedA } from '../Main/actions'
import ReactH5AudioPlayer from 'react-h5-audio-player'
import Player from '../../components/Player'

type PlayerContainerProps = {
    isFetching: boolean
    bookId: string
    bookUid: string
    bookName: string
    second?: number | undefined
    bookAuthor: string[]
    isPlayer: boolean
    setPlayer: (data: boolean) => void
    saveProgress: (data: any) => void
    getLastReaded: () => void
}

const PlayerContainer: FC<PlayerContainerProps> = ({
    isFetching,
    bookId,
    bookUid,
    bookName,
    bookAuthor,
    isPlayer,
    second,
    setPlayer,
    saveProgress,
    getLastReaded,
}) => {
    const audioPlayerRef = useRef<ReactH5AudioPlayer>(null)
    const [currentTime, setCurrentTime] = useState(0)

    const handleSaveProgress = (): void => {
        saveProgress({
            data: {
                id: bookUid,
                current_second: currentTime,
            },
            callback: (): void => getLastReaded(),
        })
    }

    const handleClosePlayer = (): void => {
        handleSaveProgress()
        setPlayer(false)
    }

    useEffect(() => {
        if (
            audioPlayerRef?.current &&
            audioPlayerRef?.current?.audio?.current
        ) {
            // устанавливает с какой секунды продолжить
            if (audioPlayerRef?.current && second) {
                audioPlayerRef.current.audio.current.currentTime = second
            }
        }
    }, [second, isPlayer])

    return (
        <Player
            audioPlayerRef={audioPlayerRef}
            bookId={bookId}
            bookName={bookName}
            bookAuthor={bookAuthor}
            isPlayer={isPlayer}
            handleClosePlayer={handleClosePlayer}
            setCurrentTime={setCurrentTime}
        />
    )
}

export default connect(
    (state: RootStateInterface) => ({
        isFetching: isFetchingS(state),
    }),
    {
        saveProgress: saveProgressA.request,
        getLastReaded: getLastReadedA.request,
    }
)(PlayerContainer)
