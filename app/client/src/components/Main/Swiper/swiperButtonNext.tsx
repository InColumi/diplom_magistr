import { useSwiper } from 'swiper/react'
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io'

const SwiperButtonNext = () => {
    const swiper = useSwiper()

    return (
        <div className="grid grid-cols-2 2xl:gap-7 sm:gap-2 sm:pr-2 xl:gap-4 text-yellow-600">
            <div className="2xl:text-5xl xl:text-3xl sm:text-3xl">
                <IoIosArrowDropleftCircle
                    className="cursor-pointer duration-200 ease-linear transition-all hover:text-yellow-600/80"
                    onClick={() => swiper.slidePrev()}
                />
            </div>
            <div className="2xl:text-5xl xl:text-3xl sm:text-3xl">
                <IoIosArrowDroprightCircle
                    className="cursor-pointer hover:text-yellow-600/80 duration-200 ease-linear transition-all"
                    onClick={() => swiper.slideNext()}
                />
            </div>
        </div>
    )
}

export default SwiperButtonNext
