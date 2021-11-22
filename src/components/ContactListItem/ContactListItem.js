import PropTypes from 'prop-types'
import s from './ContactListItem.module.css'
import { useEffect} from 'react'
import { useDeleteContactMutation } from '../../redux/contactsAPI'
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-loader-spinner"

export function ContactListItem({name, phone, id}) {
    const [deleteContact, { isLoading, isSuccess, isError}] = useDeleteContactMutation()
   
    useEffect(() => {
        if (isSuccess) {
            toast.success('Contact deleted')
        }
        if (isError) {
            toast.error('Oops, there was an error. Contact not deleted')
        }
    },[isSuccess, isError])

    return (
        <>
            <li className={s.item}>
                {name}: {phone}
                <button
                    className={s.button}
                    onClick={() =>deleteContact(id)}
                    disabled={isLoading}
                    >
                    {isLoading ?
                        (<Loader type="Oval" color="black" height={10} width={10} />)
                        : (<>X</>)}
                </button>
            </li>
            {isSuccess && <Toaster position="top-right" />}
            {isError && <Toaster position="top-right" />}
        </>
    )
}

ContactListItem.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    id: PropTypes.string
}