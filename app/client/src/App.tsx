import { ReactElement, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import SignUpContainer from './containers/Auth/SignUp'
import SignInContainer from './containers/Auth/SignIn'
import SidebarContainer from './containers/Sidebar'
import MainContainer from './containers/Main'
import NotFound from './components/NotFound'
import LibraryContainer from './containers/Library'
import FavouriteContainer from './containers/Favourite'
import SettingsContainer from './containers/Settings'
import TextContainer from './containers/Text'
import PrivateRoute from './HOC/privateRoute'
import { isAuthS } from './containers/Auth/selectors'

type AppProps = {
    isAuth: boolean
}

const App = ({ isAuth }: AppProps): ReactElement => {
    const [isOpen, setOpen] = useState<boolean>(false)
    const [isUser, setUser] = useState<string | null>(null)
    const user = (): string | null => {
        return localStorage.getItem('user')
    }

    useEffect(() => {
        setUser(user())
    }, [isAuth])

    return (
        <div className="flex sm:flex-col-reverse">
            {isUser && <SidebarContainer setOpen={setOpen} />}
            <SettingsContainer isOpen={isOpen} setOpen={setOpen} />
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<MainContainer />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/library" element={<LibraryContainer />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/favourite" element={<FavouriteContainer />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path="/text/:id" element={<TextContainer />} />
                </Route>
                <Route path="/register" element={<SignUpContainer />} />
                <Route path="/login" element={<SignInContainer />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default connect(
    (state: RootStateInterface) => ({
        isAuth: isAuthS(state),
    }),
    {}
)(App)
