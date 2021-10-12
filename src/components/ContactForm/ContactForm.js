import PropTypes from 'prop-types'
import { Component } from 'react'
import { v4 as uuid } from 'uuid'
import s from './ContactForm.module.css'

export class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const contactId = uuid()
    const newContact = {
      id: contactId,
      name: this.state.name,
      number: this.state.number,
    }
    const checkSameContact = this.props.contactList.find(e => e.name.toLowerCase() === newContact.name.toLowerCase())
    if (!checkSameContact) {
      this.props.addNewContact(newContact)
    } else {
      alert(`${checkSameContact.name} is already in contacts`)
    }
    
    this.resetForm()
  }

  resetForm = () => {
    this.setState({name: '', number: ''})
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            onChange={this.handleChange}
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            onChange={this.handleChange}
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button type="submit" className={s.button}>Add contact</button>
      </form>
    )
  }
}

ContactForm.propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  addNewContact: PropTypes.func
}