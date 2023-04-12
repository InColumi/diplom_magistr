import { ReactElement } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import SignUpContainer from './containers/Auth/SignUp'
import SignInContainer from './containers/Auth/SignIn'
import MainContainer from './containers/Main'
import NotFound from './components/NotFound'
import PrivateRoute from './HOC/privateRoute'

const App = (): ReactElement => {
    return (
        <div>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<MainContainer />} />
                </Route>
                <Route path="/register" element={<SignUpContainer />} />
                <Route path="/login" element={<SignInContainer />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default connect((state: RootStateInterface) => ({}), {})(App)
