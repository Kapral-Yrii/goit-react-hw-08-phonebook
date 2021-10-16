import s from './App.module.css';
import { Component } from 'react'
import { ContactForm } from './components/ContactForm/ContactForm'
import { ContactList } from './components/ContactList/ContactList'
import { Filter } from './components/Filter/Filter'
import{ Notification } from './components/Notification/Notification'

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
  componentDidMount() {
    const localContacts = localStorage.getItem('contacts')
    this.setState({
      contacts: JSON.parse(localContacts)
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  
  addNewContact = (newContact) => {
    this.setState((prev) => {
      return ({
        contacts: [...prev.contacts, newContact]
      })
    })
  }
  deleteContact = (e) => {
    const id = e.target.dataset.id
    this.setState((prev) => {
      return ({
        contacts: prev.contacts.filter(e => e.id !== id)
      })
    })
  }
  filterContactByName = (e) => {
    this.setState({ filter: e.target.value.toLowerCase()})
  }

  render() {
    const filterContacts = this.state.contacts.filter(e => e.name.toLowerCase().includes(this.state.filter))

    return (
      <div className={s.app}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm addNewContact={this.addNewContact} contactList={this.state.contacts}/>
        <h2 className={s.title}>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter filterContactByName={this.filterContactByName}/>
            <ContactList contacts={filterContacts} deleteContact={this.deleteContact} />
          </>
        ) : (<Notification/>)}
        
      </div>)
  }   
}

export default App;
