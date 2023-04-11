import React, { ReactElement, useState } from 'react'
import Sidebar from '../../components/Sidebar'

// type SidebarContainerProps = {}

const SidebarContainer = (): ReactElement => {
    const [isVisible, setVisible] = useState<boolean>(false)
    return <Sidebar isVisible={isVisible} setVisible={setVisible} />
}

export default SidebarContainer
