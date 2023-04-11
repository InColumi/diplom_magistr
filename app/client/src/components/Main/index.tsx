import React, { ReactElement } from 'react'
import SidebarContainer from '../../containers/Sidebar'
import Books from '../../UI/BooksSvg'
import BooksNight from '../../UI/BooksNightSvg'
import { Input } from '@material-tailwind/react'

// type MainProps = {}

const Main = (): ReactElement => {
    return (
        <div className="flex bg-night">
            <SidebarContainer />
            <div className="p-8 text-4xl font-semibold flex-1 h-100v font-['Monaco'] text-white">
                <div className="flex justify-between">
                    <h1>Smart Librarian</h1>
                    <div className="w-1/5 flex items-center">
                        <Input label="Book, author" size="lg" />
                    </div>
                </div>
                <div className="flex pt-3">
                    <div className="flex bg-nightbg w-full h-20v rounded-2xl">
                        <div className="grid grid-rows-2">
                            <div className="grid grid-rows-2">
                                <h1 className="text-3xl">Hello, Vlad</h1>
                                <h2 className="text-2xl">
                                    Your achievements this week
                                </h2>
                            </div>
                        </div>
                    </div>
                    {/* <div className="fixed w-30v h-30v right-16">
                        <BooksNight />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Main
