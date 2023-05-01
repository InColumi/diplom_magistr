import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const isUser = localStorage.getItem('user')

    return isUser ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
