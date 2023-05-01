import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { loguotA } from '../Auth/actions'
import Sidebar from '../../components/Sidebar'

type SidebarContainerProps = {
    setOpen: (data: boolean) => void
    loguot: () => void
}

const SidebarContainer = ({
    setOpen,
    loguot,
}: SidebarContainerProps): ReactElement => {
    const navigate = useNavigate()

    const handleLogOut = (): void => {
        loguot()
        navigate('/login')
    }

    return <Sidebar setOpen={setOpen} handleLogOut={handleLogOut} />
}

export default connect((state: RootStateInterface) => ({}), {
    loguot: loguotA,
})(SidebarContainer)
