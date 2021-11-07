import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import s from './ContactListItem.module.css'
import { useMemo } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../redux/contacts/contacts-actions'
import { getItems, getFilter } from '../../redux/contacts/contacts-selectors'

export function ContactListItem() {
    const contacts = useSelector(getItems)
    const filter = useSelector(getFilter)
    const dispatch = useDispatch()

    const filterContacts = useMemo(() => contacts.filter(e => e.name.toLowerCase().includes(filter)), [contacts, filter])
    
    return (
        <>
            {filterContacts.map(e => {
                return (
                    <li className={s.item} key={uuid()}>
                        {e.name}: {e.number}
                        <button
                            className={s.button}
                            onClick={() => dispatch(actions.deleteContact(e.id))}
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