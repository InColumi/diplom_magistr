import React, { ReactElement } from 'react'
import { Button } from '@material-tailwind/react'
import NotFoundSvg from './NotFound'

const NotFound = (): ReactElement => {
    return (
        <div className="flex flex-col justify-center items-center bg-nightbg h-100v">
            <div className="h-70v w-70v">
                <NotFoundSvg />
            </div>
            <div className="grid items-center h-20v text-center">
                <h1 className="2xl:text-8xl xl:text-5xl font-semibold text-404/60 font-['Monaco']">
                    Oh no... We lost this page
                </h1>
                <h2 className="2xl:text-2xl xl:text-lg font-semibold text-white/40">
                    We searched everywhere but couldn't find what you're looking
                    for.
                    <p>Let's find a better place for you to go!</p>
                </h2>
            </div>
            <Button
                className="rounded-3xl w-3/7 h-12 normal-case text-md"
                variant="filled"
                size="lg"
                color="blue-gray"
            >
                Back to Home
            </Button>
        </div>
    )
}

export default NotFound
