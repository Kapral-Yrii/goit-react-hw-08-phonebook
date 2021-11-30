import { NavLink } from "react-router-dom"

export function AuthNav() {
    return (
        <ul>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
        </ul>
    )
}