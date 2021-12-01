import { NavLink } from "react-router-dom"
import s from './AuthNav.module.css'

export function AuthNav() {
    return (
        <ul className={s.list}>
            <li className={s.item}><NavLink to="/login">Login</NavLink></li>
            <li className={s.item}><NavLink to="/register">Register</NavLink></li>
        </ul>
    )
}