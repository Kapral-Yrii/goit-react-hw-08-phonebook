import './App.css';
import { Component } from 'react'
import { ContactForm } from './components/ContactForm/ContactForm'
import { ContactList } from './components/ContactList/ContactList'

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
  
  addNewContact = (contact) => {
    this.setState((prev) => {
      return ({
        contacts: [...prev.contacts, contact]
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

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm addNewContact={this.addNewContact} />
        <h2>Contacts</h2>
        <label>Find contact by name</label>
        <input type="text" />
        <ContactList contacts={this.state.contacts} deleteContact={this.deleteContact}/>
      </div>)
  }   
}

export default App;
