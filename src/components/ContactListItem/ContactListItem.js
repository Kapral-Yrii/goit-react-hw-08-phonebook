import PropTypes from 'prop-types'
import s from './ContactListItem.module.css'
import { useEffect} from 'react'
import { useDeleteContactMutation } from '../../redux/contactsAPI'
import toast, { Toaster } from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';


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
                <div className={s.buttonContainer}>
                    <LoadingButton
                        color="primary"
                        loading={isLoading}
                        onClick={() => deleteContact(id)}
                        startIcon={<DeleteIcon />}
                        variant="contained"
                    />
                </div>
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