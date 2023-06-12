import React, { ReactElement } from 'react'
import { Button } from '@material-tailwind/react'
import { AiFillStar } from 'react-icons/ai'
import { CgSpinner } from 'react-icons/cg'

type SkeletonLoaderProps = {
    isFavourites?: boolean | undefined
}

const SkeletonLoader = ({
    isFavourites,
}: SkeletonLoaderProps): ReactElement => {
    function createNumberList(n: number) {
        return Array.from({ length: n }, (_, index) => index + 1)
    }

    const numberList = createNumberList(window.innerWidth > 1536 ? 16 : 15)

    return (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 2xl:gap-20 xl:gap-8 relative">
            {numberList.map((item: any) => (
                <div
                    key={item}
                    className="overflow-hidden relative border-nightbg border-2 2xl:rounded-3xl
                        xl:rounded-2xl grid grid-cols-2 justify-center items-center cursor-pointer before:w-[360px] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10
                        before:animate-[shimmer_2s_infinite]"
                >
                    <div className="flex h-full justify-center items-center overflow-hidden">
                        <div
                            className="bg-nightbg w-full h-[100%] flex 2xl:rounded-3xl
                        xl:rounded-2xl shadow-md shadow-blue-gray-800
                        opacity-70"
                        ></div>
                    </div>
                    <div className="flex flex-col justify-between 2xl:py-[15%] xl:py-[5%] 2xl:h-full xl:h-[90%] 2xl:px-8 xl:px-4">
                        <div className="flex flex-col h-full justify-between gap-3">
                            <div className="bg-nightbg rounded-lg w-full h-[120px]"></div>
                            <div className="bg-nightbg rounded-lg w-full h-20"></div>
                            <div className="flex items-center 2xl:text-4xl xl:text-2xl gap-2">
                                <AiFillStar color="gray" />
                                <AiFillStar color="gray" />
                                <AiFillStar color="gray" />
                                <AiFillStar color="gray" />
                                <AiFillStar color="gray" />
                                <AiFillStar color="gray" />
                            </div>
                            {!isFavourites ? (
                                <Button
                                    className="flex items-center justify-center rounded-xl w-full normal-case 2xl:text-2xl xl:text-xl text-blue-gray-900 bg-nightbg"
                                    variant="filled"
                                >
                                    <CgSpinner className="animate-spin text-white" />
                                </Button>
                            ) : (
                                <div className="flex justify-between">
                                    <div className="flex text-3xl p-3 bg-nightbg 2xl:w-14 xl:w-12 xl:h-12 rounded-xl items-center justify-center">
                                        <CgSpinner className="animate-spin text-white" />
                                    </div>
                                    <div className="flex text-3xl p-3 bg-nightbg 2xl:w-14 xl:w-12 xl:h-12 rounded-xl items-center justify-center">
                                        <CgSpinner className="animate-spin text-white" />
                                    </div>
                                    <div className="flex text-3xl p-3 bg-nightbg 2xl:w-14 xl:w-12 xl:h-12 rounded-xl items-center justify-center">
                                        <CgSpinner className="animate-spin text-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonLoader
