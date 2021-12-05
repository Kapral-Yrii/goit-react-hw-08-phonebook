import PropTypes from 'prop-types'
import s from './ContactForm.module.css'
import { useState, useCallback, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { getContacts } from '../../redux/contacts/contacts-selectors'
import { useCreateContactMutation } from '../../redux/contactsAPI'
import toast, { Toaster } from 'react-hot-toast';
import { Input } from '../InputStyle'
import LoadingButton from '@mui/lab/LoadingButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


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
        <Input
            label="Name"
            name="name"
            type="text"
            margin="normal"
            variant="standard"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          onChange={handleChange}
          sx={{mt: 0}}
        />
        <Input
            label="Number"
            name="number"
            type="text"
            margin="normal"
            variant="standard"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={handleChange} 
        />
        <div className={s.buttonContainer}>
          <LoadingButton
            type="submit"
            color="primary"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<AddCircleOutlineIcon />}
            variant="contained">
            Add
          </LoadingButton>
        </div>
        {isSuccess && <Toaster position="top-right" />}
        {isError && <Toaster position="top-right" />}
      </form>
    )
}

ContactForm.propTypes = {
  contacts: PropTypes.array,
  dispatch: PropTypes.func
}