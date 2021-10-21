import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import s from './ContactForm.module.css'
import { useState, useCallback} from 'react'

export function ContactForm({contactList, addNewContact}) {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const handleChange = useCallback((e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value)
                break
            case 'number':
                setNumber(e.target.value)
                break
            default:
                return
        }
    }, [])
    
    const handleSubmit = useCallback((e) => {
      e.preventDefault()
      const contactId = uuid()
      const newContact = {
        id: contactId,
        name: name,
        number: number,
      }
      const checkSameContact = contactList.find(e => e.name.toLowerCase() === newContact.name.toLowerCase())
      if (!checkSameContact) {
        addNewContact(newContact)
      } else {
        alert(`${checkSameContact.name} is already in contacts`)
      }

      resetForm()
    }, [addNewContact, contactList, name, number])

    const resetForm = () => {
        setName('')
        setNumber('')
    }

    return(
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            onChange={handleChange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            onChange={handleChange}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button type="submit" className={s.button}>Add contact</button>
      </form>
    )
}

ContactForm.propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  addNewContact: PropTypes.func
}