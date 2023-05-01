import React, { ReactElement, useState } from 'react'
import Settings from '../../components/Settings'

type SettingsContainerProps = {
    isOpen: boolean
    setOpen: (data: boolean) => void
}

const SettingsContainer = ({
    isOpen,
    setOpen,
}: SettingsContainerProps): ReactElement => {
    const [isNightMode, setNightMode] = useState<boolean>(true)
    const [isShowAnimations, setShowAnimations] = useState<boolean>(true)

    const handleSwitch = (e: React.FormEvent<HTMLInputElement>): void => {
        switch (e.currentTarget.id) {
            case 'mode':
                setNightMode(e.currentTarget.checked)
                break
            case 'animation':
                setShowAnimations(e.currentTarget.checked)
                break
            default:
                break
        }
    }

    return (
        <Settings
            isOpen={isOpen}
            isNightMode={isNightMode}
            isShowAnimations={isShowAnimations}
            setOpen={setOpen}
            handleSwitch={handleSwitch}
        />
    )
}

export default SettingsContainer
