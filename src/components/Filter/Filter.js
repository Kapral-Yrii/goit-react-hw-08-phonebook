import PropTypes from 'prop-types'
import s from './Filter.module.css'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../redux/contacts/contacts-actions'
import { useCallback } from 'react'
import { getItems, getContacts } from '../../redux/contacts/contacts-selectors'


export function Filter() {
    const dispatch = useDispatch()
    // const contacts = useSelector(getItems)
    // console.log(contacts);

    const onChange = useCallback((e) => {
        const value = e.target.value.toLowerCase()
        dispatch(actions.filterContactByName(value))
    }, [dispatch])

    return (
        <label className={s.label}>
            Find contact by name
            <input className={s.input} type="text" onChange={onChange}/>
        </label>
    )
}

Filter.propTypes = {
    dispatch: PropTypes.func
}
