import { FC } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button } from '@material-tailwind/react'
import { AiFillStar } from 'react-icons/ai'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import SwiperButtonNext from './swiperButtonNext'

type SwiperBlockProps = {
    recomendations: any
    handleAdd: (data: any) => void
}

const SwiperBlock: FC<SwiperBlockProps> = ({ recomendations, handleAdd }) => {
    const getFlag = (name: string): string => {
        if (name?.length <= 5) {
            return '2xl:text-8xl xl:text-7xl sm:text-3xl line-clamp-1'
        } else if (name?.length <= 15) {
            return '2xl:text-7xl xl:text-5xl line-clamp-2 sm:text-5xl'
        } else {
            return '2xl:text-6xl xl:text-3xl line-clamp-2 sm:text-4xl'
        }
    }

    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={'4%'}
            slidesPerView="auto"
            loop={true}
            grabCursor={true}
            autoplay={{
                delay: 5000,
                // disableOnInteraction: false,
            }}
            className="h-full w-full"
        >
            <div className="flex w-full items-center justify-between absolute top-1 z-10">
                <h2 className="2xl:text-4xl xl:text-xl sm:text-sm sm:pl-5 text-gray-400 font-semibold uppercase">
                    Recomended for you
                </h2>
                <SwiperButtonNext />
            </div>
            {recomendations?.map((item: any, index: number) => (
                <SwiperSlide
                    key={item.id}
                    className="h-full sm:h-[60%] max-w-[48%] sm:max-w-[96%] flex flex-col 2xl:pt-16 xl:pt-14 sm:pt-10 sm:pr-3"
                >
                    <div
                        className="border-nightbg border-2 h-full 2xl:rounded-[36px]
                    xl:rounded-3xl sm:rounded-xl xl:grid xl:grid-cols-2 xl:gap-5 sm:flex sm:flex-col justify-center items-center"
                    >
                        <div className="flex h-full sm:h-1/2 justify-center items-center overflow-hidden p-2">
                            <img
                                // loading="lazy"
                                id={item.id}
                                src={
                                    index === 0
                                        ? 'https://m.media-amazon.com/images/I/51PA0AEBFxL.jpg'
                                        : 'https://m.media-amazon.com/images/I/41qLJYLNccL._AC_UF350,350_QL50_.jpg'
                                }
                                alt=""
                                className="w-full h-[200px] sm:max-h-[60%] flex 2xl:rounded-[36px] sm:rounded-lg xl:rounded-3xl shadow-md opacity-70"
                            />
                        </div>
                        <div className="flex flex-col justify-between 2xl:py-[15%] xl:py-[5%] sm:py-[5%] 2xl:h-full xl:h-[90%] 2xl:px-8 xl:px-6">
                            <div className="flex flex-col h-2/3 gap-2">
                                <h1
                                    className={`${getFlag(item.name)} text-start
                            text-white font-bold font-['Monaco'] max-h-1/2`}
                                >
                                    {item.name}
                                </h1>
                                <h2
                                    className={`text-start sm:text-center ${
                                        item.authors[0].length < 12
                                            ? '2xl:text-6xl xl:text-4xl sm:text-4xl'
                                            : '2xl:text-4xl xl:text-3xl sm:text-3xl'
                                    } text-white/50 font-sans line-clamp-2`}
                                >
                                    {index === 1
                                        ? 'Elbert Hubbard'
                                        : item.authors[0]}
                                </h2>
                            </div>
                            <div className="flex items-center 2xl:text-6xl xl:text-3xl sm:text-5xl justify-between mb-2">
                                <AiFillStar
                                    color={
                                        item.rating_avg >= 1 ? 'yellow' : 'gray'
                                    }
                                />
                                <AiFillStar
                                    color={
                                        item.rating_avg >= 2 ? 'yellow' : 'gray'
                                    }
                                />
                                <AiFillStar
                                    color={
                                        item.rating_avg >= 3 ? 'yellow' : 'gray'
                                    }
                                />
                                <AiFillStar
                                    color={
                                        item.rating_avg >= 4 ? 'yellow' : 'gray'
                                    }
                                />
                                <AiFillStar
                                    color={
                                        item.rating_avg === 5
                                            ? 'yellow'
                                            : 'gray'
                                    }
                                />
                            </div>
                            <Button
                                className="shadow-none hover:shadow-none hover:scale-[98%] rounded-xl w-full normal-case 2xl:h-16 xl:h-12 2xl:text-2xl xl:text-md sm:hidden text-blue-gray-900  mt-3"
                                variant="filled"
                                color="yellow"
                                onClick={(): void => handleAdd(item.id)}
                            >
                                Add
                            </Button>
                        </div>
                        <Button
                            className="shadow-none hover:shadow-none hover:scale-[98%] rounded-xl w-full normal-case 2xl:hidden xl:hidden sm:h-14 sm:text-[20px] text-blue-gray-900 mx-2"
                            variant="filled"
                            color="yellow"
                            onClick={(): void => handleAdd(item.id)}
                        >
                            Add to Favorite
                        </Button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperBlock
