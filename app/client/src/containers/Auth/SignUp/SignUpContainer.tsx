import React, { ReactElement, useState } from 'react'
import SignUp from '../../../components/Auth/SignUp'
import { loginA, getUserA } from '../actions'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type SignUpContainerProps = {
    login: (data: any) => void
    getUser: () => any
}

const SignUpContainer = ({
    login,
    getUser,
}: SignUpContainerProps): ReactElement => {
    const [isShowPassword, setShowPassword] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

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
        if (firstName === '1') {
            login({ username: email, password: password })
        } else {
            getUser()
        }
    }

    const handleNavToSignIn = (): void => {
        navigate('/login')
    }

    return (
        <SignUp
            isShowPassword={isShowPassword}
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            setShowPassword={setShowPassword}
            handleChangeValue={handleChangeValue}
            handleSubmit={handleSubmit}
            handleNavToSignIn={handleNavToSignIn}
        />
    )
}

export default connect((state: RootStateInterface) => ({}), {
    login: loginA.request,
    getUser: getUserA.request,
})(SignUpContainer)
