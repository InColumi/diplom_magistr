import React, { FC, ReactElement } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Button, Input, Select, Option } from '@material-tailwind/react'

type TypeOption = {
    text: string
    value: string
    icon: ReactElement
}

type FilterProps = {
    isFavourites?: boolean | undefined
    options: TypeOption[]
    searchValue: string | undefined
    setSortValue: (data: string) => void
    handleChangeSearchValue: (e: React.FormEvent<HTMLInputElement>) => void
}

const Filter: FC<FilterProps> = ({
    isFavourites,
    options,
    searchValue,
    setSortValue,
    handleChangeSearchValue,
}) => {
    return (
        <>
            <div className="grid grid-cols-2 2xl:gap-20 xl:gap-8 w-full h-20 items-center pr-12 pl-10 border-nightbg border-b-2 border-dashed">
                <div>
                    {isFavourites ? (
                        <h1 className="normal-case  2xl:text-5xl xl:text-3xl text-gray-400 font-semibold font-['Monaco'] italic">
                            All your favorite books are here!
                        </h1>
                    ) : (
                        <h1 className="normal-case  2xl:text-5xl xl:text-3xl text-gray-400 font-semibold font-['Monaco'] italic">
                            Find everything you need!
                        </h1>
                    )}
                </div>
                <div className="flex gap-1 bg-nightbg w-full rounded-lg">
                    <div className="flex pl-1 py-1 w-fit">
                        <Select
                            variant="outlined"
                            label="Sort By"
                            size="lg"
                            className="bg-night text-xl justify-between"
                        >
                            {options.map((item: TypeOption) => (
                                <Option
                                    key={item.value}
                                    onClick={(): void =>
                                        setSortValue(item.value)
                                    }
                                >
                                    <div className="flex w-full justify-between items-center">
                                        {item.text}
                                        {item.icon}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex w-full gap-1 rounded-lg bg-nightbg py-1 pr-1">
                        <Input
                            value={searchValue}
                            variant="outlined"
                            size="lg"
                            label="Search name of the book, author or content"
                            className="!bg-night text-xl"
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>
                            ): void => handleChangeSearchValue(e)}
                        />
                        <Button
                            variant="filled"
                            color="blue-gray"
                            className="rounded-lg text-xl text-nightbg"
                        >
                            <FaSearch />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter
