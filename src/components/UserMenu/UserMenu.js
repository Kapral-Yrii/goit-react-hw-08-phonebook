import { Link } from "react-router-dom"
import s from './UserMenu.module.css'

export function UserMenu() {
    return (
        <ul className={s.list}>
            <li className={s.item}>Hello user</li>
            <li className={s.item}>
                <Link to="/login">
                    <button type="button">Logout</button>
                </Link>
            </li>
        </ul>
    )
}