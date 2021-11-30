import { ContactForm } from '../../components/ContactForm/ContactForm'
import { ContactList } from '../../components/ContactList/ContactList'
import { Filter } from '../../components/Filter/Filter'
import { Notification } from '../../components/Notification/Notification'
import { useSelector } from 'react-redux'
import { getContacts} from '../../redux/contacts/contacts-selectors'
import s from './ContactView.module.css'

export default function ContactsView() {
  const contacts = useSelector(getContacts)
  
    return (
        <div className={s.app}>
          <h1 className={s.title}>Phonebook</h1>
          <ContactForm />
          <h2 className={s.title}>Contacts</h2>
          {contacts.length > 1 && <Filter />}
          {contacts.length === 0 && <Notification />}
          <ContactList />
        </div>
    )
}