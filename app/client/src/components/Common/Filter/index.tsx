import React, { FC } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Button, Input, Select, Option } from '@material-tailwind/react'

type FilterProps = any

const Filter: FC<FilterProps> = () => {
    return (
        <>
            <div className="grid grid-cols-2 2xl:gap-20 xl:gap-8 w-full h-20 items-center pr-16 pl-10 border-nightbg border-b-2">
                <div className="flex bg-nightbg p-1 w-fit rounded-lg">
                    <Select
                        variant="outlined"
                        label="Sort By"
                        size="lg"
                        className="bg-night"
                    >
                        <Option>Author</Option>
                        <Option>Genre</Option>
                        <Option>Popularity</Option>
                        <Option>Alphabetically</Option>
                        <Option>Alphabetically reverse</Option>
                    </Select>
                </div>
                <div className="flex w-full ml-5 gap-1 rounded-lg bg-nightbg p-1">
                    <Input
                        variant="outlined"
                        size="lg"
                        label="Search name of the book, author or content"
                        className="!bg-night"
                    />
                    <Button
                        variant="filled"
                        color="blue"
                        className="rounded-lg text-xl text-night"
                    >
                        <FaSearch />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Filter
