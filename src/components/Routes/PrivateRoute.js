import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from '../../redux/auth/auth-selectors'

export default function PrivateRoute({ component: Component, navigateTo = "/" }) {
    const isLoggedIn = useSelector(getIsLoggedIn)
    return ( <>
        {isLoggedIn ? <Component /> : <Navigate to={navigateTo} />}
        </>
    )
}