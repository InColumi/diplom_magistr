import React, { ReactElement, SyntheticEvent } from 'react'
import { Input, Button } from '@material-tailwind/react'
import { TfiEmail } from 'react-icons/tfi'
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx'
import WavingHand from '../../../UI/WavingHandSvg'

type SignInProps = {
    isShowPassword: boolean
    email: string
    password: string
    setShowPassword: (data: boolean) => void
    handleChangeValue: (e: React.FormEvent<HTMLInputElement>) => void
    handleSubmit: (e: SyntheticEvent) => any
    handleNavToSignUp: () => void
}

const SignIn = ({
    isShowPassword,
    email,
    password,
    setShowPassword,
    handleChangeValue,
    handleSubmit,
    handleNavToSignUp,
}: SignInProps): ReactElement => {
    return (
        <>
            <div className="flex justify-center items-center w-100v h-100v bg-nightbg">
                <div
                    className="2xl:w-7/12 w-3/5 m-9 flex bg-night items-center h-80v 2xl:h-70v shadow-md shadow-blue-gray-700
                overflow-hidden bg-login bg-no-repeat bg-cover rounded-3xl opacity-70"
                >
                    <div className=" w-full grid 2xl:grid-cols-2 xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-end">
                        <div className="2xl:p-24 xl:p-12 grid grid-rows-3 items-center">
                            <div className="flex flex-col mb-3">
                                <div className="flex items-center">
                                    <h2 className="2xl:text-4xl xl:text-2xl md:text-xl sm:text-lg text-blue-gray-300">
                                        Hi there!
                                    </h2>
                                    <div className="2xl:w-8 2xl:h-8 w-7 h-7">
                                        <WavingHand />
                                    </div>
                                </div>
                                <h1 className="2xl:text-5xl xl:text-4xl md:text-2xl sm:text-xl font-bold flex text-white">
                                    Welcome back
                                </h1>
                                <div className="flex items-center gap-3">
                                    <h2 className="2xl:text-4xl xl:text-2xl md:text-xl sm:text-lg text-blue-gray-300">
                                        Still not a Member?
                                    </h2>
                                    <button
                                        className="normal-case 2xl:text-4xl xl:text-2xl hover:bg-transparent text-blue-600 font-semibold"
                                        onClick={(): void =>
                                            handleNavToSignUp()
                                        }
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="w-full mt-6 mb-3">
                                    <Input
                                        id="email"
                                        size={'lg'}
                                        color="blue"
                                        className="bg-gray-200"
                                        variant="outlined"
                                        label="Email"
                                        value={email}
                                        onChange={(
                                            e: React.FormEvent<HTMLInputElement>
                                        ) => handleChangeValue(e)}
                                        icon={<TfiEmail />}
                                    />
                                </div>
                                <div className="w-full">
                                    <Input
                                        id="password"
                                        size={'lg'}
                                        type={
                                            isShowPassword ? 'password' : 'text'
                                        }
                                        color="blue"
                                        className="bg-gray-200"
                                        variant="outlined"
                                        label="Password"
                                        value={password}
                                        onChange={(
                                            e: React.FormEvent<HTMLInputElement>
                                        ) => handleChangeValue(e)}
                                        icon={
                                            isShowPassword ? (
                                                <RxEyeClosed
                                                    className="cursor-pointer"
                                                    onClick={(): void =>
                                                        setShowPassword(
                                                            !isShowPassword
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <RxEyeOpen
                                                    className="cursor-pointer"
                                                    onClick={(): void =>
                                                        setShowPassword(
                                                            !isShowPassword
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    className="rounded-2xl w-3/7 h-12 normal-case text-md"
                                    variant="filled"
                                    onClick={(e: SyntheticEvent): void =>
                                        handleSubmit(e)
                                    }
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
