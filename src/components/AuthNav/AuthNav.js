import { NavLink } from "react-router-dom"
import s from '../Navigation/Navigation.module.css'
import Button from '@mui/material/Button';

export function AuthNav() {
    return (
        <ul className={s.list}>
            <li className={s.item}><NavLink to="/login" className={(navData) => navData.isActive ? s.activeLink : s.link} >{<Button variant="text">Login</Button>}</NavLink></li>
            <li className={s.item}><NavLink to="/register" className={(navData) => navData.isActive ? s.activeLink : s.link} >{<Button variant="text">Register</Button>}</NavLink></li>
        </ul>
    )
}