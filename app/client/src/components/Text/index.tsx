import React, { FC } from 'react'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

type TextProps = {
    text: string
    currentPage: number
    handleFlipPage: (direction: string) => void
}

const Text: FC<TextProps> = ({ text, currentPage, handleFlipPage }) => {
    return (
        <div className="flex items-center justify-center w-full bg-night">
            <SlArrowLeft
                color="gray"
                size="28"
                className="hover:scale-[98%] cursor-pointer mr-5"
                onClick={(): void => handleFlipPage('back')}
            />
            {/* <div className="flex flex-col w-full h-full items-center justify-center"> */}
            <div className="2xl:w-4/6 xl:w-4/5 grid grid-cols-2 justify-between items-center bg-nightbg rounded-xl p-5 2xl:h-4/5 xl:h-6/7 overflow-hidden shadow-md shadow-blue-gray-800">
                <div className="bg-[#D5B59C]/90 rounded-l-sm flex flex-col shadow-inner shadow-brown-400 gap-2 items-center justify-center h-full w-full border-r-2 border-brown-300">
                    <div className="2xl:text-2xl xl:text-sm 2xl:pl-8 xl:pl-14 text-night w-full text-justify font-['Monaco'] pt-5">
                        {text && text[currentPage]}
                    </div>
                    <h3 className="2xl:text-xl xl:text-sm text-center text-night pb-5">
                        {currentPage + 1}
                    </h3>
                </div>
                <div className="bg-[#D5B59C]/90 rounded-r-sm flex flex-col shadow-inner shadow-brown-400 gap-2 items-center justify-center h-full w-full">
                    <div className="2xl:text-2xl xl:text-sm 2xl:pl-8 xl:pl-14 text-night w-full text-justify font-['Monaco'] pt-5">
                        {text && text[currentPage + 1]}
                    </div>
                    <h3 className="2xl:text-xl xl:text-sm text-center text-night pb-5">
                        {currentPage + 2}
                    </h3>
                </div>
                {/* </div> */}
                <div className="h-1 2xl:w-28 xl:w-20 rounded-b-md bg-nightbg shadow-md shadow-blue-gray-600"></div>
            </div>
            <SlArrowRight
                color="gray"
                size="28"
                className="hover:scale-[98%] cursor-pointer ml-5"
                onClick={(): void => handleFlipPage('forward')}
            />
        </div>
    )
}

export default Text
