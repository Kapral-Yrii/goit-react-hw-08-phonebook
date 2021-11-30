import s from './AppBar.module.css'
import { Navigation } from '../Navigation/Navigation'
import { AuthNav } from '../AuthNav/AuthNav'
import { UserMenu } from '../UserMenu/UserMenu'

export function AppBar() {
    return (
        <header className={s.header}>
            <Navigation />
            <AuthNav />
            <UserMenu/>
        </header>
    )
}