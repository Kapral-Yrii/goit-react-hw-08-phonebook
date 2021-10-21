import s from './App.module.css';
import { useState, useMemo, useCallback } from 'react'
import { ContactForm } from './components/ContactForm/ContactForm'
import { ContactList } from './components/ContactList/ContactList'
import { Filter } from './components/Filter/Filter'
import { Notification } from './components/Notification/Notification'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
    const [contacts, setContacts] = useLocalStorage('contacts',[])
    const [filter, setFilter] = useState('')

    const addNewContact = useCallback((newContact) => {
        setContacts(prev => [...prev, newContact])
    }, [setContacts])

    const deleteContact = (e) => {
        const id = e.target.dataset.id
        setContacts(prev => prev.filter(e => e.id !== id))
    }

    const filterContactByName = (e) => {
        setFilter(e.target.value.toLowerCase())
    }

    const filterContacts = useMemo(() => contacts.filter(e => e.name.toLowerCase().includes(filter)), [contacts, filter])

    return (
      <div className={s.app}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm addNewContact={addNewContact} contactList={contacts}/>
        <h2 className={s.title}>Contacts</h2>
        {contacts.length > 0 ? (
          <>
            <Filter filterContactByName={filterContactByName}/>
            <ContactList contacts={filterContacts} deleteContact={deleteContact} />
          </>
        ) : (<Notification/>)}
      </div>)
}
export default App;