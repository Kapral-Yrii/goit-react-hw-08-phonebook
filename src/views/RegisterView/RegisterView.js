import { useCallback, useState, useEffect } from 'react'
import { useSignupUserMutation } from '../../redux/authAPI'
import { useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-loader-spinner"
import * as actions from '../../redux/auth/auth-actions'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '../../components/InputStyle'

const theme = createTheme()

export default function RegisterView() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [signupUser, { isLoading, isError }] = useSignupUserMutation()

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

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()
        const newUser = {
            name: name,
            email: email,
            password: password,
        }
        try {
            const response = await signupUser(newUser)
            dispatch(actions.user(response.data.user))
            dispatch(actions.token(response.data.token))
            dispatch(actions.isLoggedIn(true))
        } catch (error) {
            console.log(error);
        }
        resetForm()
    }, [dispatch, email, name, password, signupUser])

    const resetForm = () => {
        setName('')
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
        if (isError) {
            toast.error('Oops, there was an error. User not created.')
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
                        Sign up
                      </Typography>
                      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                          <Input
                              label="Name"
                              name="name"
                              type="text"
                              margin="normal"
                              variant="standard"
                              fullWidth
                              required
                              onChange={handleChange} 
                          />
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
                            {isLoading ? (<Loader type="Oval" color="white" height={24} width={24}/>) : (<>Sign up</>)}
                          </Button>
                      </Box>
                  </Box>
              </Container>
            </ThemeProvider>
            {isError && <Toaster position="top-right" />}
        </>
    )
}