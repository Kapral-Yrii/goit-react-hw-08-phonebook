import { useCallback, useState, useEffect } from 'react'
import { useLoginUserMutation } from '../../redux/authAPI'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/auth/auth-actions'
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-loader-spinner"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '../../components/InputStyle'

const theme = createTheme()

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
        <>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'white',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in to Phonebook
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    margin="normal"
                    variant="standard"
                    autoComplete="email"
                    fullWidth
                    required
                    onChange={handleChange}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    margin="normal"
                    variant="standard"
                    autoComplete="current-password"
                    fullWidth
                    required
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isLoading ? (<Loader type="Oval" color="white" height={24} width={24}/>) : (<>Log in</>)}
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
          {isError && <Toaster position="top-right" />}
        </>
    )
}