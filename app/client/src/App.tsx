import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { testA } from './store/test/actions'
import { isFetchingS } from './store/test/selectors'
import AuthContainer from './containers/Auth'
import MainContainer from './containers/Main'
import NotFound from './components/NotFound'
import { isAuthS } from './helpers/Auth/selectors'

type AppProps = {
    isAuth: boolean
}

const App = ({ isAuth }: AppProps): ReactElement => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/login" element={<AuthContainer />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default connect(
    (state: RootStateInterface) => ({
        isFetching: isFetchingS(state),
        isAuth: isAuthS(state),
    }),
    {
        test: testA.request,
    }
)(App)
