import { FC } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { AiFillStar } from 'react-icons/ai'
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io'
import { Button } from '@material-tailwind/react'

type MainSkeletonProps = any

const MainSkeleton: FC<MainSkeletonProps> = () => {
    return (
        <div className="bg-night w-full">
            <div className="flex w-full h-full overflow-hidden max-h-screen">
                <div className="flex flex-col h-full 2xl:w-4/5 xl:w-3/4">
                    <div className="flex flex-col gap-5 w-full h-3/5">
                        <div className="flex justify-between items-center w-full xl:px-5 2xl:px-10 pt-5">
                            <h2 className="2xl:text-4xl xl:text-xl text-gray-400 font-semibold uppercase">
                                Continue reading or listening
                            </h2>
                            <div className="grid grid-cols-2 2xl:w-[124px] 2xl:h-12 xl:w-[76px] xl:h-[30px] 2xl:gap-7 xl:gap-5">
                                <div
                                    className="flex text-3xl p-1 bg-nightbg 2xl:w-12 2xl:h-12 xl:w-7 xl:h-7 cursor-pointer xl:rounded-lg 2xl:rounded-xl items-center justify-center
                                    duration-400 ease-linear transition-all"
                                >
                                    <CgSpinner className="animate-spin text-white" />
                                </div>
                                <div
                                    className="flex text-3xl p-1 bg-nightbg 2xl:w-12 2xl:h-12 xl:w-7 xl:h-7 cursor-pointer xl:rounded-lg 2xl:rounded-xl items-center justify-center
                                    duration-400 ease-linear transition-all"
                                >
                                    <CgSpinner className="animate-spin text-white" />
                                </div>
                            </div>
                        </div>
                        <div
                            className="border-nightbg border-2 h-full xl:mx-5 xl:mb-5 2xl:m-10 rounded-3xl flex items-center
                    before:w-[100%] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10
                    before:animate-[shimmer_2s_infinite] relative overflow-hidden"
                        >
                            <div className="2xl:mr-8 xl:mr-0 flex flex-col h-full gap-5 w-5/6 p-5">
                                <div className="flex 2xl:h-4/5 xl:h-full bg-nightbg w-full h-full rounded-2xl px-10" />
                                <div className="flex 2xl:h-1/6 xl:h-1/6 w-1/6 bg-nightbg 2xl:rounded-xl xl:rounded-lg px-10" />
                            </div>
                            <div className="flex w-1/6 h-full pl-2 p-2">
                                <div className="flex w-full h-full bg-nightbg rounded-2xl"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 border-t-2 border-dashed border-blue-gray-900 h-2/3 2xl:p-10 xl:p-5 overflow-hidden">
                        <div className="h-full w-full">
                            <div className="flex w-full items-center justify-between">
                                <h2 className="2xl:text-4xl xl:text-xl text-gray-400 font-semibold uppercase">
                                    Recomended for you
                                </h2>
                                <div className="grid grid-cols-2 2xl:gap-7 xl:gap-4 text-nightbg">
                                    <div className="2xl:text-5xl xl:text-3xl">
                                        <IoIosArrowDropleftCircle className="cursor-pointer" />
                                    </div>
                                    <div className="2xl:text-5xl xl:text-3xl">
                                        <IoIosArrowDroprightCircle className="cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-[4%] w-full h-full">
                                {[1, 2]?.map((item: any) => (
                                    <div
                                        key={item}
                                        className="h-full w-full flex flex-col pt-5 2xl:pb-12 xl:pb-8"
                                    >
                                        <div
                                            className="border-nightbg border-2 h-full 2xl:rounded-[36px]
                    xl:rounded-3xl grid grid-cols-2 xl:gap-5 justify-center items-center
                    before:w-[100%] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10
                    before:animate-[shimmer_2s_infinite] relative overflow-hidden"
                                        >
                                            <div className="flex h-full justify-center items-center overflow-hidden p-2">
                                                <div className="w-full h-[100%] flex 2xl:rounded-[36px] xl:rounded-3xl shadow-md bg-nightbg"></div>
                                            </div>
                                            <div className="flex flex-col justify-between 2xl:py-[15%] xl:py-[5%] 2xl:h-full xl:h-[90%] 2xl:px-8 xl:px-6">
                                                <div className="flex flex-col h-2/3 2xl:gap-5 xl:gap-2 xl:py-2">
                                                    <div className="w-full h-full bg-nightbg xl:rounded-xl"></div>
                                                    <div className="w-full h-full bg-nightbg xl:rounded-xl"></div>
                                                </div>
                                                <div className="flex items-center 2xl:text-6xl xl:text-3xl justify-between mb-2">
                                                    <AiFillStar
                                                        color={'gray'}
                                                    />
                                                    <AiFillStar
                                                        color={'gray'}
                                                    />
                                                    <AiFillStar
                                                        color={'gray'}
                                                    />
                                                    <AiFillStar
                                                        color={'gray'}
                                                    />
                                                    <AiFillStar
                                                        color={'gray'}
                                                    />
                                                </div>
                                                <Button
                                                    className="flex items-center justify-center rounded-xl w-full normal-case 2xl:h-16 xl:h-12 2xl:text-2xl xl:text-xl text-blue-gray-900 mt-3 bg-nightbg"
                                                    variant="filled"
                                                >
                                                    <CgSpinner className="animate-spin text-white" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="2xl:w-1/5 xl:w-1/4 border-l-2 border-dashed border-blue-gray-900">
                    <div className="flex flex-col h-full justify-between 2xl:pb-10 xl:pb-5 pt-5 px-5">
                        <h1 className="2xl:text-4xl xl:text-xl text-gray-400 font-semibold pb-5 uppercase pl-2">
                            Popular Authors
                        </h1>
                        <div className="h-[95%]">
                            <ul className="flex h-full w-full flex-col gap-1 justify-between xl:rounded-2xl rounded-3xl">
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                                    (item: any) => (
                                        <li key={item}>
                                            <div
                                                className="flex w-full items-center 2xl:gap-3 xl:gap-3 pl-3 2xl:p-4 xl:p-2 border-2 border-nightbg 2xl:rounded-3xl xl:rounded-xl cursor-pointer
                                hover:bg-nightbg hover:shadow-md hover:shadow-blue-gray-800 hover:scale-[98%] duration-300 ease-linear transition-all before:w-[100%] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10
                                before:animate-[shimmer_2s_infinite] relative overflow-hidden"
                                            >
                                                <div className="2xl:h-20 xl:h-10 rounded-full 2xl:w-1/4 xl:w-1/6 bg-nightbg" />
                                                <div className="flex 2xl:h-20 xl:h-8 w-full bg-nightbg 2xl:rounded-2xl xl:rounded-md"></div>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSkeleton
