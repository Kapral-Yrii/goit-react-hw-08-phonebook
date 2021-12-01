import { useCallback, useState, useEffect } from 'react'
import { useSignupUserMutation } from '../../redux/authAPI'
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-loader-spinner"

export default function RegisterView() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signupUser, { isLoading, isSuccess, isError }] = useSignupUserMutation()

    const handleChange = useCallback((e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value)
                break
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

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        const newUser = {
            name: name,
            email: email,
            password: password,
        }
        signupUser(newUser)
        resetForm()
    }, [email, name, password, signupUser])

    const resetForm = () => {
        setName('')
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('User created')
        }
        if (isError) {
            toast.error('Oops, there was an error. User not created.')
        }
    },[isSuccess, isError])

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <br />
                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={name}
                    required
                />
            </label>
            <br/>
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
              {isLoading ? (<Loader type="Oval" color="black" height={10} width={10} />) : (<>Signup</>)}
            </button>
            {isSuccess && <Toaster position="top-right" />}
            {isError && <Toaster position="top-right" />}
        </form>
    )
}