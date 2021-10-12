import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import s from './ContactListItem.module.css'

export function ContactListItem({ contacts, deleteContact }) {
    return (
        <>
            {contacts.map(e => {
                return (
                    <li className={s.item} key={uuid()}>{e.name}: {e.number}<button className={s.button} onClick={deleteContact} data-id={e.id}>X</button></li>
                )
            })}
        </>
    )
}

ContactListItem.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    deleteContact: PropTypes.func
}