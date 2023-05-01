import { ReactElement } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button } from '@material-tailwind/react'
import { AiFillStar } from 'react-icons/ai'
import Book from '../../Common/Book'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import SwiperButtonNext from './swiperButtonNext'

const array = [
    {
        id: 1,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 2,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 3,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 4,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 5,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 6,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 7,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 8,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
    {
        id: 9,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAbvzL1CEqf18PYXnv5KNVMZap5hYHgQKxD3nEI5VnBLPNMw0m5Xs4IUjpH_Qfm91DmQ&usqp=CAU',
    },
    {
        id: 10,
        img: 'https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg',
    },
]

const SwiperBlock = (): ReactElement => {
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={'4%'}
            slidesPerView="auto"
            grabCursor={true}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
            }}
            className="h-full w-full"
        >
            <div className="flex w-full items-center justify-between absolute top-1 z-10">
                <h2 className="2xl:text-4xl xl:text-xl text-gray-400 font-semibold">
                    Recomended For You
                </h2>
                <SwiperButtonNext />
            </div>
            {array.map((item: any) => (
                <SwiperSlide
                    key={item.id}
                    className="h-full max-w-[48%] flex flex-col 2xl:pt-16 xl:pt-14"
                >
                    <div
                        className="border-nightbg border-2 h-full 2xl:rounded-[36px]
                    xl:rounded-3xl grid grid-cols-2 justify-center items-center cursor-pointer
                    hover:bg-nightbg hover:shadow-md hover:shadow-blue-gray-800 hover:scale-[98%] duration-400 ease-linear transition-all"
                    >
                        <div className="flex h-full justify-center items-center overflow-hidden">
                            <img
                                id={item.id}
                                src={item.img}
                                alt=""
                                className="w-full h-[100%] flex 2xl:rounded-[36px] xl:rounded-3xl shadow-md opacity-70 xl:pr-2"
                            />
                        </div>
                        <div className="flex flex-col justify-between 2xl:py-[15%] xl:py-[5%] 2xl:h-full xl:h-[90%] 2xl:px-8 xl:px-6">
                            <div className="flex flex-col h-full justify-between">
                                <h1 className="text-start 2xl:text-8xl xl:text-5xl text-white font-bold font-['Monaco']">
                                    BOOK NAME
                                </h1>
                                <h2 className="text-start 2xl:text-5xl xl:text-3xl text-white font-sans">
                                    by Book Author
                                </h2>
                                <div className="flex items-center 2xl:text-4xl xl:text-lg gap-2">
                                    <AiFillStar color="yellow" />
                                    <AiFillStar color="yellow" />
                                    <AiFillStar color="yellow" />
                                    <AiFillStar color="yellow" />
                                    <AiFillStar color="yellow" />
                                    <AiFillStar color="gray" />
                                </div>
                                <Button
                                    className="rounded-2xl w-2/3 normal-case 2xl:h-16 xl:h-12 2xl:text-2xl xl:text-md text-blue-gray-900"
                                    variant="filled"
                                    color="yellow"
                                >
                                    Add to Favourite
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperBlock
