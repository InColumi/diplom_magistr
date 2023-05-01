import React, { FC } from 'react'

type TextProps = {
    text: string
}

const Text: FC<TextProps> = ({ text }) => {
    return (
        <div className="flex flex-col gap-5 w-full bg-night 2xl:px-20 xl:px-10">
            <h1 className="2xl:text-8xl xl:text-5xl text-white font-bold font-['Monaco'] pt-5">
                BOOK NAME
            </h1>
            <div className="w-full grid grid-cols-2 justify-between items-center border-nightbg border-2 rounded-3xl p-5 h-[85%] overflow-hidden">
                <pre className="2xl:text-xl xl:text-sm pl-10 text-gray-400 w-full text-justify">
                    {text}
                </pre>
                <pre className="2xl:text-xl xl:text-sm pl-30 text-gray-400 w-full text-justify">
                    {text}
                </pre>
            </div>
        </div>
    )
}

export default Text
