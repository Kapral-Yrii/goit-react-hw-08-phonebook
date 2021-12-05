import { Link } from "react-router-dom";
import s from './PageNotFound.module.css'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PageNotFound() {
    return (
        <div className={s.container}>
            <Link to="/" className={s.link}>
                <Button variant="contained" startIcon={<ArrowBackIcon />}>
                  Back to Home
                </Button>
            </Link>
            <p className={s.description}>Page not found! Please back to Home</p>
        </div>
    )
}