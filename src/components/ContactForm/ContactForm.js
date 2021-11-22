import PropTypes from 'prop-types'
import s from './ContactForm.module.css'
import { useState, useCallback, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { getContacts } from '../../redux/contacts/contacts-selectors'
import { useCreateContactMutation } from '../../redux/contactsAPI'
import Loader from "react-loader-spinner"
import toast, { Toaster } from 'react-hot-toast';


export function ContactForm() {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const contacts = useSelector(getContacts)
    const [addContact , { isLoading, isSuccess, isError }] = useCreateContactMutation()

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
      const newContact = {
        name: name,
        phone: number,
      }
      const checkSameContact = contacts.find(e => e.name.toLowerCase() === newContact.name.toLowerCase())
      if (!checkSameContact) {
        addContact(newContact)
      } else {
        toast(`${checkSameContact.name} is already in contacts`, {position: 'top-center'})
      }
      resetForm()
    }, [addContact, contacts, name, number])

    const resetForm = () => {
        setName('')
        setNumber('')
  }
  
  useEffect(() => {
        if (isSuccess) {
            toast.success('Contact created')
        }
        if (isError) {
            toast.error('Oops, there was an error. Contact not created')
        }
    },[isSuccess, isError])

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
        <button type="submit" className={s.button} disabled={isLoading}>
          {isLoading ? (<Loader type="Oval" color="black" height={46} width={46} />) : (<>Add contact</>)}
        </button>
        {isSuccess && <Toaster position="top-right" />}
        {isError && <Toaster position="top-right" />}
      </form>
    )
}

ContactForm.propTypes = {
  contacts: PropTypes.array,
  dispatch: PropTypes.func
}