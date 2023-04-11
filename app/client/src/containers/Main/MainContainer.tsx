import React, { ReactElement, useEffect } from 'react'
import { connect } from 'react-redux'
import Main from '../../components/Main'
import { loginA } from '../../helpers/Auth/actions'

type MainContainerProps = {
    login: () => void
}

const MainContainer = ({ login }: MainContainerProps): ReactElement => {
    useEffect(() => {
        login()
    }, [])

    return <Main />
}

export default connect((state: RootStateInterface) => ({}), {
    login: loginA.request,
})(MainContainer)
