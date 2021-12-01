import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { getIsLoggedIn } from '../../redux/auth/auth-selectors'

import s from './Navigation.module.css'

export function Navigation() {
    const isLoggedIn = useSelector(getIsLoggedIn)
    return (
        <nav>
            <ul className={s.list}>
                <li className={s.item}><NavLink to="/">Home</NavLink></li>
                {isLoggedIn && <li className={s.item}><NavLink to="/contacts">Contacts</NavLink></li>} 
            </ul>
        </nav>
    )
}