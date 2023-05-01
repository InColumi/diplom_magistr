import { ReactElement, useState } from 'react'
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

const App = (): ReactElement => {
    const [isOpen, setOpen] = useState<boolean>(false)

    return (
        <div className="flex">
            <SidebarContainer setOpen={setOpen} />
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
                {/* <Route element={<PrivateRoute />}>
                    <Route path="/settings" element={<SettingsContainer />} />
                </Route> */}
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

export default connect((state: RootStateInterface) => ({}), {})(App)
