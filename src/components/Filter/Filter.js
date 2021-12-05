import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import * as actions from '../../redux/contacts/contacts-actions'
import { Input } from '../InputStyle'
import { useCallback } from 'react'


export function Filter() {
    const dispatch = useDispatch()

    const onChange = useCallback((e) => {
        const value = e.target.value.toLowerCase()
        dispatch(actions.filterContactByName(value))
    }, [dispatch])

    return (
        <Input
            type="text"
            onChange={onChange}
            label="Find contact by name"
            margin="normal"
            variant="standard"
            fullWidth
            sx={{ mt: 0 }}
        />
    )
}

Filter.propTypes = {
    dispatch: PropTypes.func
}
