import { Link } from "react-router-dom";
// import s from './NotFound.module.css'

export default function PageNotFound() {
    return (
        <>
            <Link to="/">
                <button type="button">← Back to Home</button>
            </Link>
            <p>Page not found! Please back to Home</p>
        </>
    )
}