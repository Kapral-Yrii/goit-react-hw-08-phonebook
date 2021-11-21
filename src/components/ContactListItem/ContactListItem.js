import PropTypes from 'prop-types'
// import { v4 as uuid } from 'uuid'
import s from './ContactListItem.module.css'
import { useEffect, useMemo, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../redux/contacts/contacts-actions'
import { getItems, getFilter } from '../../redux/contacts/contacts-selectors'
import { useFetchContactsQuery, useDeleteContactMutation } from '../../redux/contactsAPI'

export function ContactListItem() {
    const [contacts, setContacts] = useState([]);
    const { data, isFetching } = useFetchContactsQuery()
    const [deleteContact] = useDeleteContactMutation()
    const filterValue = useSelector(getFilter)

    useEffect(() => {
        const normalizedFilter = filterValue.toLowerCase();
        try {
          setContacts(
            data.filter(({ name }) => name.toLowerCase().includes(normalizedFilter))
          );
        } catch (error) {
          return error;
        }
    }, [data, filterValue]);
    
    return (
        <>
            {contacts.map(e => {
                return (
                    <li className={s.item} key={e.id}>
                        {e.name}: {e.phone}
                        <button
                            className={s.button}
                            onClick={() =>deleteContact(e.id)}
                            data-id={e.id}>
                            X
                        </button>
                    </li>
                )
            })}
        </>
    )
}

ContactListItem.propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
    dispatch: PropTypes.func
}