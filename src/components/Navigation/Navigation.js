import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { getIsLoggedIn } from '../../redux/auth/auth-selectors'
import Button from '@mui/material/Button';
import s from './Navigation.module.css'

export function Navigation() {
    const isLoggedIn = useSelector(getIsLoggedIn)
    return (
        <nav>
            <ul className={s.list}>
                <li className={s.item}><NavLink to="/" className={(navData) => navData.isActive ? s.activeLink : s.link} >{<Button variant="text">Home</Button>}</NavLink></li>
                {isLoggedIn && <li className={s.item}><NavLink to="/contacts" className={(navData) => navData.isActive ? s.activeLink : s.link} >{<Button variant="text">Contacts</Button>}</NavLink></li>} 
            </ul>
        </nav>
    )
}