import React, { FC } from 'react'

type LastBookProps = {
    lastBook: any
    lastBookText: string
}

const LastBook: FC<LastBookProps> = ({ lastBook, lastBookText }) => {
    return (
        <div className="border-nightbg border-2 h-1/3 xl:m-5 2xl:m-10 2xl:mt-5 rounded-3xl sm:rounded-xl flex items-center sm:flex-col sm:m-2">
            <div className="2xl:mr-8 xl:mr-0 flex flex-col h-full w-5/6 2xl:gap-5 xl:gap-1 p-5 sm:p-2 justify-between">
                <div className="h-full flex flex-col gap-1 text-center">
                    <div className="flex h-2/6 line-clamp-1">
                        <h1 className="2xl:text-8xl xl:text-5xl text-white font-bold font-['Monaco'] ">
                            {lastBook?.title}
                        </h1>
                    </div>
                    <div className="flex gap-2 justify-center oveflow-hidden">
                        <h1 className="2xl:text-4xl xl:text-2xl sm:text-sm text-blue-gray-400 font-bold text-center line-clamp-1">
                            {/* {`by ${lastBook?.authors?.map(
                                (item: string, key: number) => item
                            )}`} */}
                            by Sir William Magnay
                        </h1>
                    </div>
                    {/* <div className="2xl:ml-10 flex items-center justify-center"> */}
                    <h2 className="max-h-full 2xl:text-[44px] xl:text-[28px] sm:text-sm text-gray-500 text-justify overflow-hidden 2xl:line-clamp-3 xl:line-clamp-2 sm:h-20">
                        {lastBookText}
                    </h2>
                    {/* </div> */}
                </div>
                <div className="flex w-full items-center">
                    <h3 className="2xl:text-2xl xl:text-md sm:text-xs sm:mt-2 font-semibold text-white/80">
                        {`Page ${lastBook?.current_page} of ${lastBook?.total_pages}`}
                    </h3>
                </div>
            </div>
            <div className="flex w-1/6 h-full pl-2 p-2 sm:hidden">
                <img
                    loading="lazy"
                    className="w-full h-full rounded-2xl opacity-70"
                    src="https://m.media-amazon.com/images/I/31obJjS1jzL._AC_UF1000,1000_QL80_.jpg"
                    alt=""
                />
            </div>
        </div>
    )
}

export default LastBook
