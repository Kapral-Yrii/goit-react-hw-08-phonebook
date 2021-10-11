import PropTypes from 'prop-types'
import { ContactListItem } from '../ContactListItem/ContactListItem'

export function ContactList({contacts, deleteContact}) {
    return (
        <ul>
           <ContactListItem contacts={contacts} deleteContact={deleteContact}/> 
        </ul>
    )
}