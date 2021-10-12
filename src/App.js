import s from './App.module.css';
import { Component } from 'react'
import { ContactForm } from './components/ContactForm/ContactForm'
import { ContactList } from './components/ContactList/ContactList'
import { Filter } from './components/Filter/Filter'

class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
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
        <Filter filterContactByName={this.filterContactByName}/>
        <ContactList contacts={filterContacts} deleteContact={this.deleteContact}/>
      </div>)
  }   
}

export default App;
