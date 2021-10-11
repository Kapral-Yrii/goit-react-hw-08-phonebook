import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

export function ContactListItem({ contacts, deleteContact }) {
    return (
        <>
            {contacts.map(e => {
                return (
                    <li key={uuid()}>{e.name}: <span>{e.number}</span><button onClick={deleteContact} data-id={e.id}>delete</button></li>
                )
            })}
        </>
    )
}