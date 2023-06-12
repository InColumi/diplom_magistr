import React, { ReactElement, useState } from 'react'
import SignUp from '../../../components/Auth/SignUp'
import { registerUserA, getUserA } from '../actions'
import { isFetchingS } from '../selectors'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type SignUpContainerProps = {
    isFetching: boolean
    registerUser: (data: any) => void
    getUser: () => any
}

const SignUpContainer = ({
    isFetching,
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
        registerUser({
            data: { email, password, username: login },
            callback: (): void => handleNavToSignIn(),
        })
    }

    const handleNavToSignIn = (): void => {
        navigate('/login')
    }

    return (
        <SignUp
            isFetching={isFetching}
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

export default connect(
    (state: RootStateInterface) => ({
        isFetching: isFetchingS(state),
    }),
    {
        registerUser: registerUserA.request,
        getUser: getUserA.request,
    }
)(SignUpContainer)
