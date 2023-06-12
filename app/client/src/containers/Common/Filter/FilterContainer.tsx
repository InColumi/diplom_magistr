import React, { FC } from 'react'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BsSortNumericDown, BsSortNumericUpAlt, BsSortUp } from 'react-icons/bs'
import Filter from '../../../components/Common/Filter'

type FilterContainerProps = {
    isFavourites?: boolean | undefined
    searchValue: string | undefined
    setSearchValue: (data: string) => void
    setSortValue: (data: string) => void
}

const FilterContainer: FC<FilterContainerProps> = ({
    isFavourites,
    searchValue,
    setSearchValue,
    setSortValue,
}) => {
    const options = [
        {
            text: 'Author',
            value: '0',
            icon: <AiOutlineSortAscending />,
        },
        {
            text: 'Author',
            value: '1',
            icon: <AiOutlineSortDescending />,
        },
        {
            text: 'Title',
            value: '2',
            icon: <AiOutlineSortAscending />,
        },
        {
            text: 'Title',
            value: '3',
            icon: <AiOutlineSortDescending />,
        },
        {
            text: 'Year',
            value: '4',
            icon: <BsSortNumericDown />,
        },
        {
            text: 'Year',
            value: '5',
            icon: <BsSortNumericUpAlt />,
        },
        {
            text: 'Popularity',
            value: '6',
            icon: <BsSortUp />,
        },
        {
            text: 'Mark',
            value: '7',
            icon: <BsSortUp />,
        },
    ]
    const handleChangeSearchValue = (
        e: React.FormEvent<HTMLInputElement>
    ): void => {
        setSearchValue(e.currentTarget.value)
    }

    return (
        <Filter
            isFavourites={isFavourites}
            options={options}
            searchValue={searchValue}
            setSortValue={setSortValue}
            handleChangeSearchValue={handleChangeSearchValue}
        />
    )
}

export default FilterContainer
