import { Link } from "react-router-dom"

export function UserMenu() {
    return (
        <ul>
            <li>Hello user</li>
            <li>
                <Link to="/login">
                    <button type="button">Logout</button>
                </Link>
            </li>
        </ul>
    )
}