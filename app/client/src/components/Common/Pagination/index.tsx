import React, { FC } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type PaginationProps = {
    page: number
    total: number
    incrementPage: (data: any) => void
    decrementPage: (data: any) => void
}

const Pagination: FC<PaginationProps> = ({
    page,
    total,
    incrementPage,
    decrementPage,
}) => {
    return (
        <>
            <nav>
                <ul className="flex w-full items-center justify-center py-2 gap-2">
                    <li>
                        <div
                            className="flex items-center justify-center w-8 h-8 border-2 border-nightbg p-2 rounded-xl text-gray-400
                            hover:scale-95 hover:bg-nightbg cursor-pointer transition-all ease-linear duration-200"
                            onClick={decrementPage}
                        >
                            <IoIosArrowBack />
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center justify-center h-10 text-gray-400">
                            {page} of {total}
                        </div>
                    </li>
                    <li>
                        <div
                            className="flex items-center justify-center w-8 h-8 border-2 border-nightbg p-2 rounded-xl text-gray-400
                            hover:scale-95 hover:bg-nightbg cursor-pointer transition-all ease-linear duration-200"
                            onClick={incrementPage}
                        >
                            <IoIosArrowForward />
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination
