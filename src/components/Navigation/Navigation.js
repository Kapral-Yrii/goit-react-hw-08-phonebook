import { NavLink } from "react-router-dom"
import s from './Navigation.module.css'

export function Navigation() {
    return (
        <nav>
            <ul className={s.list}>
                <li className={s.item}><NavLink to="/">Home</NavLink></li>
                <li className={s.item}><NavLink to="/contacts">Contacts</NavLink></li> 
            </ul>
        </nav>
    )
}