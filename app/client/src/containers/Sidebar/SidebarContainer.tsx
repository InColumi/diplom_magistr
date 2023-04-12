import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

// type SidebarContainerProps = {}

const SidebarContainer = (): ReactElement => {
    const [isVisible, setVisible] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleLogOut = (): void => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <Sidebar
            isVisible={isVisible}
            setVisible={setVisible}
            handleLogOut={handleLogOut}
        />
    )
}

export default SidebarContainer
