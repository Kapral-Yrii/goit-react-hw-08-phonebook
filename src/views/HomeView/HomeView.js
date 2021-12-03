import { useSelector } from "react-redux";
import { getIsLoggedIn } from '../../redux/auth/auth-selectors'
import { getUserName } from '../../redux/auth/auth-selectors'
import s from './HomeView.module.css'

export default function HomeView() {
    const isLoggedIn = useSelector(getIsLoggedIn)
    const userName = useSelector(getUserName)

    return (
        <>
            {isLoggedIn ? (<h1 className={s.title}>Hello, {userName}!<br/> To get started with the application, go to the Contacts tab.</h1>) :
                (<h1 className={s.title}>Hello!<br/> This is Phonebook App. For begin you need registrate.</h1>)}
        </>
    )
}
