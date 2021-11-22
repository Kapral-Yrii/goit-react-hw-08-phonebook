import PropTypes from 'prop-types'
import s from './ContactListItem.module.css'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../redux/contacts/contacts-actions'
import { getFilter, getContacts } from '../../redux/contacts/contacts-selectors'
import { useFetchContactsQuery, useDeleteContactMutation } from '../../redux/contactsAPI'
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-loader-spinner"

export function ContactListItem() {
    const [filteredContacts, setFilteredContacts] = useState([])
    const { data } = useFetchContactsQuery()
    const [deleteContact, { isLoading, isSuccess, isError}] = useDeleteContactMutation()
    const filterValue = useSelector(getFilter)

    const dispatch = useDispatch()
    // const contacts = useSelector(getContacts)

    useEffect(() => {
        if (isSuccess) {
            toast.success('Contact deleted')
        }
        if (isError) {
            toast.error('Oops, there was an error. Contact not deleted')
        }
    },[isSuccess, isError])

    useEffect(() => {
        const normalizedFilter = filterValue.toLowerCase();
        try {
            setFilteredContacts(data.filter(({ name }) => name.toLowerCase().includes(normalizedFilter)))
            dispatch(actions.addNewContact(data))
        } catch (error) {
          return error;
        }
    }, [data, dispatch, filterValue]);
    
    return (
        <>
            {filteredContacts.map(e => {
                return (
                    <li className={s.item} key={e.id}>
                        {e.name}: {e.phone}
                        <button
                            className={s.button}
                            onClick={() =>deleteContact(e.id)}
                            data-id={e.id}
                            disabled={isLoading}
                            >
                            {isLoading ?
                                (<Loader type="Oval" color="black" height={10} width={10} />)
                                : (<>X</>)}
                        </button>
                    </li>
                )
            })}
            {isSuccess && <Toaster position="top-right" />}
            {isError && <Toaster position="top-right" />}
        </>
    )
}

ContactListItem.propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
    dispatch: PropTypes.func
}