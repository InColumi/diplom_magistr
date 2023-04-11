import React, { ReactElement, useState } from 'react'
import Auth from '../../components/Auth'
import { loginA } from '../../helpers/Auth/actions'
import { connect } from 'react-redux'

type AuthContainerProps = {
    login: () => void
}

const AuthContainer = ({ login }: AuthContainerProps): ReactElement => {
    const [isShowPassword, setShowPassword] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleChangeValue = (e: React.FormEvent<HTMLInputElement>): void => {
        switch (e.currentTarget.id) {
            case 'firstname':
                setFirstName(e.currentTarget.value)
                break
            case 'lastname':
                setLastName(e.currentTarget.value)
                break
            case 'email':
                setEmail(e.currentTarget.value)
                break
            case 'password':
                setPassword(e.currentTarget.value)
                break
            default:
                break
        }
    }

    const handleSubmit = (): void => {
        login()
    }

    return (
        <Auth
            isShowPassword={isShowPassword}
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            setShowPassword={setShowPassword}
            handleChangeValue={handleChangeValue}
            handleSubmit={handleSubmit}
        />
    )
}

export default connect((state: RootStateInterface) => ({}), {
    login: loginA.request,
})(AuthContainer)
