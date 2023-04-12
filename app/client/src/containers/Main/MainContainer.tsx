import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import Main from '../../components/Main'

const MainContainer = (): ReactElement => {
    return <Main />
}

export default connect((state: RootStateInterface) => ({}), {})(MainContainer)
