import PropTypes from 'prop-types'
import { Component } from 'react'
import { v4 as uuid } from 'uuid'

export class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  }

  nameId = uuid()
  numberId = uuid()

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const contactId = uuid()
    const contact = {
      id: contactId,
      name: this.state.name,
      number: this.state.number,
    }
    this.props.addNewContact(contact)
    this.resetForm()
    e.target[0].value = ''
    e.target[1].value = ''
  }

  resetForm = () => {
    this.setState({name: '', number: ''})
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameId}>Name</label>
        <input
          onChange={this.handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <br />
        <label htmlFor={this.numberId}>Number</label>
        <input
          onChange={this.handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
        <button type="submit">Add contact</button>
      </form>
    )
  }
}