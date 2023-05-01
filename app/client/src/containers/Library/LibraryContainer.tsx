import React, { ReactElement, useState } from 'react'
import Library from '../../components/Library'

const LibraryContainer = (): ReactElement => {
    const [currentPage, setCurrentPage] = useState<number>(1)

    const handleChangePage = (page: number, flag: string): void => {
        /// верхний предел array.lenght() из редакса
        switch (flag) {
            case 'increment':
                // if (page < array.length) {
                setCurrentPage(page + 1)
                // }
                break
            case 'decrement':
                if (page > 1) {
                    setCurrentPage(page - 1)
                }
                break
            default:
                break
        }
    }

    return (
        <Library
            currentPage={currentPage}
            handleChangePage={handleChangePage}
        />
    )
}

export default LibraryContainer
