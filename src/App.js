import s from './App.module.css';
import { ContactForm } from './components/ContactForm/ContactForm'
import { ContactList } from './components/ContactList/ContactList'
import { Filter } from './components/Filter/Filter'
import { Notification } from './components/Notification/Notification'
import { useSelector } from 'react-redux'
// import { useFetchContactsQuery } from './redux/contactsAPI'


function App() {
  const contacts = useSelector(state => state.contacts.items)
  // const { data } = useFetchContactsQuery()
  // console.log(data);
  
  return (
    <div className={s.app}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={s.title}>Contacts</h2>
      {/* {contacts.length > 0 ? ( */}
        {/* <> */}
          <Filter />
          <ContactList />
        {/* </> */}
      {/* ) : (<Notification />)
      } */}
    </div>)
}

export default App;