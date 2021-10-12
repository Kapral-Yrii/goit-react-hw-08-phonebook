import PropTypes from 'prop-types'
import { ContactListItem } from '../ContactListItem/ContactListItem'
import s from './ContactList.module.css'

export function ContactList({contacts, deleteContact}) {
    return (
        <ul className={s.list}>
           <ContactListItem contacts={contacts} deleteContact={deleteContact}/> 
        </ul>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    deleteContact: PropTypes.func
}