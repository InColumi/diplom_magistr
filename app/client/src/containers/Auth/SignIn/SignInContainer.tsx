import React, { ReactElement, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SyntheticEvent } from 'react'

import { loginA } from '../actions'
import { isAuthS } from '../selectors'

import SignIn from '../../../components/Auth/SignIn'

type SignInContainerProps = {
    isAuth: boolean
    login: (data: any) => void
}

const SignInContainer = ({
    isAuth,
    login,
}: SignInContainerProps): ReactElement => {
    const [isShowPassword, setShowPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const isUser = localStorage.getItem('user')
    const navigate = useNavigate()

    const handleChangeValue = (e: React.FormEvent<HTMLInputElement>): void => {
        switch (e.currentTarget.id) {
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

    const handleNavToSignUp = (): void => {
        navigate('/register')
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        if (email === '' || password === '') return

        await login({
            data: {
                username_or_email: email,
                password: password,
            },
            // callback: setTimeout(() => navigate('/'), 500),
        })
        // if (isAuth) {
        //     navigate('/')
        // }
    }

    useEffect(() => {
        if (isUser) {
            navigate('/')
        }
    }, [isAuth])

    return (
        <SignIn
            isShowPassword={isShowPassword}
            email={email}
            password={password}
            setShowPassword={setShowPassword}
            handleChangeValue={handleChangeValue}
            handleSubmit={handleSubmit}
            handleNavToSignUp={handleNavToSignUp}
        />
    )
}

export default connect(
    (state: RootStateInterface) => ({
        isAuth: isAuthS(state),
    }),
    {
        login: loginA.request,
    }
)(SignInContainer)
