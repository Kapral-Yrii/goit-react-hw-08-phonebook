import { useSelector } from "react-redux";
import { getIsLoggedIn } from '../../redux/auth/auth-selectors'

export default function HomeView() {
    const isLoggedIn = useSelector(getIsLoggedIn)
    return (
        <>
            {isLoggedIn ? (<h1>Hello user! To get started with the application, go to the Contacts tab</h1>) :
                (<h1>Hello! This is Phonebook App. For begin you need registrate</h1>)}
        </>
    )
}