import { FC } from 'react'
import ReactH5AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { Dialog, DialogBody, DialogFooter } from '@material-tailwind/react'
import { IoClose } from 'react-icons/io5'
import './styles.sass'

type PlayerProps = {
    audioPlayerRef: any
    bookId: string
    bookName: string
    bookAuthor: string[]
    isPlayer: boolean
    handleClosePlayer: () => void
    setCurrentTime: (data: number) => void
}

const Player: FC<PlayerProps> = ({
    audioPlayerRef,
    bookId,
    isPlayer,
    bookName,
    bookAuthor,
    handleClosePlayer,
    setCurrentTime,
}) => {
    return (
        <Dialog
            open={isPlayer}
            size="md"
            handler={() => ({})}
            className="bg-night rounded-3xl"
        >
            <IoClose
                className="relative z-10 float-right m-3 text-3xl hover:scale-95 transition-all duration-100 ease-linear text-gray-400 cursor-pointer"
                onClick={(): void => handleClosePlayer()}
            />
            <DialogBody>
                <div className="flex flex-col gap-5 justify-between items-center pt-6 pl-10">
                    <div className="w-[300px] h-[400px] overflow-hidden rounded-sm">
                        <img
                            src="https://m.media-amazon.com/images/I/31obJjS1jzL._AC_UF1000,1000_QL80_.jpg"
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="font-['Monaco'] 2xl:text-6xl xl:text-4xl text-white line-clamp-2 overflow-hidden text-center">
                            {bookName}
                        </h1>
                        <div className="flex">
                            {bookAuthor?.map((item: string, key: number) => (
                                <h2
                                    key={key}
                                    className="font-['Monaco'] 2xl:text-3xl xl:text-2xl text-blue-gray-400 line-clamp-2 overflow-hidden text-center"
                                >
                                    {item}
                                </h2>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <ReactH5AudioPlayer
                    ref={audioPlayerRef}
                    autoPlay={false}
                    showJumpControls={false}
                    src={`http://26.107.170.245:8000/send_audio_stream?id_book=${bookId}`}
                    onListen={(e) =>
                        setCurrentTime(
                            audioPlayerRef?.current?.audio?.current?.currentTime
                        )
                    }
                />
            </DialogFooter>
        </Dialog>
    )
}

export default Player
