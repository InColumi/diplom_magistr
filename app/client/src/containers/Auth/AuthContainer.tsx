import React, { ReactElement, useState } from 'react'
import Auth from '../../components/Auth'

const AuthContainer = (): ReactElement => {
    const [isPassword, setPassword] = useState<boolean>(false)

    return <Auth isPassword={isPassword} setPassword={setPassword} />
}

export default AuthContainer
