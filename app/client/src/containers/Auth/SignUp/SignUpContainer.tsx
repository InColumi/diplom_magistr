import React, { ReactElement, useState } from 'react'
import SignUp from '../../../components/Auth/SignUp'
import { registerUserA, getUserA } from '../actions'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type SignUpContainerProps = {
    registerUser: (data: any) => void
    getUser: () => any
}

const SignUpContainer = ({
    registerUser,
    getUser,
}: SignUpContainerProps): ReactElement => {
    const [isShowPassword, setShowPassword] = useState<boolean>(false)
    const [login, setLogin] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const handleChangeValue = (e: React.FormEvent<HTMLInputElement>): void => {
        switch (e.currentTarget.id) {
            case 'login':
                setLogin(e.currentTarget.value)
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
        registerUser({ email, password, username: login })
        handleNavToSignIn()
    }

    const handleNavToSignIn = (): void => {
        navigate('/login')
    }

    return (
        <SignUp
            isShowPassword={isShowPassword}
            login={login}
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
    registerUser: registerUserA.request,
    getUser: getUserA.request,
})(SignUpContainer)
