import { ContactListItem } from '../ContactListItem/ContactListItem'
import s from './ContactList.module.css'

export function ContactList() {
    return (
        <ul className={s.list}>
           <ContactListItem /> 
        </ul>
    )
}