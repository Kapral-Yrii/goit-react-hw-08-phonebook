import s from './AppBar.module.css'
import { useSelector } from "react-redux";
import { getIsLoggedIn } from '../../redux/auth/auth-selectors'
import { Navigation } from '../Navigation/Navigation'
import { AuthNav } from '../AuthNav/AuthNav'
import { UserMenu } from '../UserMenu/UserMenu'

export function AppBar() {
    const isLoggedIn = useSelector(getIsLoggedIn)
    return (
        <header className={s.header}>
            <Navigation />
            {!isLoggedIn && <AuthNav />}
            {isLoggedIn && <UserMenu/>}
        </header>
    )
}