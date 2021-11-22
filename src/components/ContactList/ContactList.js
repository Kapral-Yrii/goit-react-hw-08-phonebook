import { ContactListItem } from '../ContactListItem/ContactListItem'
import PropTypes from 'prop-types'
import s from './ContactList.module.css'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../redux/contacts/contacts-actions'
import { getFilter} from '../../redux/contacts/contacts-selectors'
import { useFetchContactsQuery } from '../../redux/contactsAPI'
import toast, { Toaster } from 'react-hot-toast';


export function ContactList() {
    const [filteredContacts, setFilteredContacts] = useState([])
    const filterValue = useSelector(getFilter)
    const dispatch = useDispatch()
    const { data, isSuccess, isError, isLoading } = useFetchContactsQuery()

    useEffect(() => {
        if (isLoading) {
           toast.success('Contacts list updated')
        }
        const normalizedFilter = filterValue.toLowerCase();
        try {
            setFilteredContacts(data.filter(({ name }) => name.toLowerCase().includes(normalizedFilter)))
            dispatch(actions.addNewContact(data))
        } catch (error) {
            if (isError) {
               toast.error('Oops, there was an error. Contact list not updated');
           }
          return error
        }
    }, [data, dispatch, filterValue, isError, isLoading, isSuccess]);
    
    return (
        <>
            <ul className={s.list}>
                {filteredContacts.map(contact => {
                    return (
                        <ContactListItem key={contact.id} {...contact}/>
                    )
                })} 
            </ul>
            {filterValue !== '' && filteredContacts.length === 0 &&
                <p className={s.filterNote}>Contact with name <b>{filterValue}</b> not found</p>}
            {isSuccess && <Toaster position="top-right" />}
            {isError && <Toaster position="top-right" />}
        </>
    )
}

ContactList.propTypes = {
    filteredContacts: PropTypes.array,
    filterValue: PropTypes.string,
    dispatch: PropTypes.func
}