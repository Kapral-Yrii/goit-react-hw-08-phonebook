import PropTypes from 'prop-types'
import s from './Filter.module.css'

export function Filter({filterContactByName}) {
    return (
        <>
            <label className={s.label}>
                Find contact by name
                <input className={s.input} type="text" onChange={filterContactByName}/>
            </label>
            
        </>
    )
}

Filter.propTypes = {
    filterContactByName: PropTypes.func
}
