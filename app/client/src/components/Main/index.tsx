import React, { ReactElement } from 'react'
import { Button } from '@material-tailwind/react'

import SwiperBlock from './Swiper'
import AuthorList from './AuthorsList'

const Main = (): ReactElement => {
    return (
        <div className="bg-night">
            <div className="flex w-full h-full overflow-hidden max-h-screen">
                <div className="flex flex-col w-4/5">
                    <div className="flex w-full xl:pl-5 2xl:pl-10 pt-5">
                        <h2 className="2xl:text-4xl xl:text-xl text-gray-400 font-semibold">
                            Continue Reading
                        </h2>
                    </div>
                    <div className="border-nightbg border-2 h-1/3 xl:m-5 2xl:m-10 2xl:mt-5 rounded-3xl flex">
                        <div className="mr-8 flex flex-col w-5/6 2xl:gap-5 xl:gap-1 p-5">
                            <div className="max-h-4/5 flex flex-col justify-between">
                                <h1 className="2xl:text-8xl xl:text-5xl text-white font-bold font-['Monaco'] ">
                                    A CLOCKWORK ORANGE
                                </h1>
                                <h2 className="max-h-3/5 2xl:text-2xl xl:text-md text-gray-500 text-justify overflow-hidden text-ellipsis mb-2">
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Modi, delectus quaerat
                                    cupiditate animi doloremque unde, repellat
                                    nam enim iste quam officiis! Ut incidunt
                                    dolorem quasi ad quam? Perspiciatis id alias
                                    ex culpa aliquam illo consequatur,
                                    laudantium, qui a autem suscipit reiciendis
                                    sint ducimus fugiat est. Doloremque enim
                                    nobis culpa modi unde nam cupiditate
                                    veritatis quam rerum architecto laboriosam
                                    laudantium praesentium porro ea eveniet amet
                                    perspiciatis corporis, qui, aspernatur
                                    voluptas nihil atque? Rem distinctio laborum
                                    iure dolores ad cum eveniet sed molestiae
                                    accusamus labore! Debitis unde sapiente
                                    laborum provident sequi deleniti commodi
                                    molestias velit inventore aliquam ipsa quo,
                                    qui saepe reprehenderit pariatur placeat
                                    aperiam perspiciatis dolores. Tempore vel
                                    accusantium, libero aliquam ratione delectus
                                    officiis. Nobis unde voluptatibus
                                    reprehenderit expedita officiis, ducimus,
                                    quod dolor sit modi molestiae labore
                                    repellat sapiente natus porro aliquam
                                    facere! Similique assumenda iure ipsa
                                    adipisci eius nisi. Asperiores magni omnis
                                    pariatur debitis eligendi sint voluptatum
                                    nam voluptate tempore. Nobis unde
                                    voluptatibus reprehenderit expedita
                                    officiis, ducimus, quod dolor sit modi
                                    molestiae labore repellat sapiente natus
                                    porro aliquam facere! Similique assumenda
                                    iure ipsa adipisci eius nisi. Asperiores
                                    magni omnis pariatur debitis eligendi sint
                                    voluptatum nam voluptate tempore. Asperiores
                                    magni omnis pariatur debitis eligendi sint
                                    voluptatum nam voluptate tempore.
                                </h2>
                            </div>
                            <div className="flex items-center justify-between">
                                <h3 className="2xl:text-xl xl:text-md font-semibold text-white/80">
                                    Page 1 of 456
                                </h3>
                                <Button
                                    className="rounded-2xl 2xl:w-1/5 xl:w-1/6 2xl:h-14 xl:h-10 normal-case 2xl:text-2xl xl:text-md text-blue-gray-900"
                                    variant="filled"
                                    color="yellow"
                                >
                                    Read Now
                                </Button>
                            </div>
                        </div>
                        <div className="flex w-1/6 pl-2 p-5">
                            <img
                                className="w-full h-full rounded-2xl opacity-70"
                                src="https://m.media-amazon.com/images/I/51FTcHNhQqL.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 border-t-2 border-dashed border-blue-gray-900 h-2/3 2xl:p-10 xl:p-5 overflow-hidden">
                        <SwiperBlock />
                    </div>
                </div>
                <div className="w-1/5 border-l-2 border-dashed border-blue-gray-900">
                    <AuthorList />
                </div>
            </div>
        </div>
    )
}

export default Main
