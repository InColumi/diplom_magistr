import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { testA } from './store/test/actions'
import { isFetchingS, testListS } from './store/test/selectors'
import AuthContainer from './containers/Auth/AuthContainer'

type AppProps = {
    isFetching: boolean
    testList: any
    test: () => void
}

const App = ({ isFetching, testList, test }: AppProps): ReactElement => {
    return (
        <div>
            <AuthContainer />
        </div>
    )
}

export default connect(
    (state: RootStateInterface) => ({
        isFetching: isFetchingS(state),
        testList: testListS(state),
    }),
    {
        test: testA.request,
    }
)(App)
