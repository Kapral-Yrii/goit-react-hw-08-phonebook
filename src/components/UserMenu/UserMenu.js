import { Link } from "react-router-dom"
import s from './UserMenu.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getUserName, getToken } from '../../redux/auth/auth-selectors'
import * as actions from '../../redux/auth/auth-actions'
import { useLogoutUserMutation } from '../../redux/authAPI'
import { useCallback } from "react"
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function UserMenu() {
    const userName = useSelector(getUserName)
    const token = useSelector(getToken)
    const dispatch = useDispatch()
    const [logoutUser] = useLogoutUserMutation()
    const windowInnerWidth = window.innerWidth

    const handleLogout = useCallback(() => {
        try {
            logoutUser(token)
            dispatch(actions.token(null))
            dispatch(actions.user({ name: null, email: null }))
            dispatch(actions.isLoggedIn(false))
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, logoutUser, token])

    return (<>
        {windowInnerWidth > 768 ?
            (<ul className={s.list}>
                <li className={s.icon}>{<AccountCircleIcon/>}</li>
                <li className={s.item}>{userName}</li>
                <li className={s.item}>
                    <Link to="/login" className={s.link}>
                        <Button onClick={handleLogout}>Logout</Button>
                    </Link>
                </li>
            </ul>) :
            (<Link to="/login" className={s.link}>
                <Button onClick={handleLogout}>Logout</Button>
            </Link>)}
    </>
    )
}