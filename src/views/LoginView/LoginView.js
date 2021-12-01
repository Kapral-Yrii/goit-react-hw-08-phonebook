import { useCallback, useState, useEffect } from 'react'
import { useLoginUserMutation } from '../../redux/authAPI'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/auth/auth-actions'
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-loader-spinner"

export default function LoginView() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [loginUser, { isLoading, isError }] = useLoginUserMutation()

    const handleChange = useCallback((e) => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            default:
                return
        }
    }, [])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        const dataLogin = {
            email: email,
            password: password,
        }
        try {
            const response = await loginUser(dataLogin)
            dispatch(actions.user(response.data.user))
            dispatch(actions.token(response.data.token))
            dispatch(actions.isLoggedIn(true))
        } catch (error) {
            console.log(error);
        }
        resetForm()
    }, [dispatch, email, loginUser, password])

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        if (isError) {
            toast.error('Oops, there was an error. You are not logged in.')
        }
    },[isError])

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <br/>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={email}
                    required
                />
            </label>
                <br/>
            <label>
                Password
                <br/>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={password}
                    required/>
            </label>
            <br />
            <button type="submit" disabled={isLoading}>
              {isLoading ? (<Loader type="Oval" color="black" height={10} width={10} />) : (<>Login</>)}
            </button>
            {isError && <Toaster position="top-right" />}
        </form>
    )
}