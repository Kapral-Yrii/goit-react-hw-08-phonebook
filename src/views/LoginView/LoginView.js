import { useCallback, useState, useEffect } from 'react'
import { useLoginUserMutation } from '../../redux/authAPI'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/auth/auth-actions'
import toast, { Toaster } from 'react-hot-toast';
import Loader from "react-loader-spinner"
import s from './LoginView.module.css'
// //////////////////////////////////////////
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha, styled } from '@mui/material/styles';
import Input from '@mui/material/Input'

const theme = createTheme()

const ariaLabel = { 'aria-label': 'description' }
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#1976d2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#1976d2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

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
        // <form onSubmit={handleSubmit}>
        //     <label>
        //         Email
        //         <br/>
        //         <input
        //             onChange={handleChange}
        //             type="email"
        //             name="email"
        //             value={email}
        //             required
        //         />
        //     </label>
        //         <br/>
        //     <label>
        //         Password
        //         <br/>
        //         <input
        //             onChange={handleChange}
        //             type="password"
        //             name="password"
        //             value={password}
        //             required/>
        //     </label>
        //     <br />
        //     <button type="submit" disabled={isLoading}>
        //       {isLoading ? (<Loader type="Oval" color="black" height={10} width={10} />) : (<>Login</>)}
        //     </button>
        //     {isError && <Toaster position="top-right" />}
        // </form>
        <div className={s.form}>
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
             <TextField
            //   sx={{color: 'white'}}
            variant="standard"                
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
                            autoFocus
                            onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
                            id="password"
                            variant="standard"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
            </ThemeProvider>
            </div>
    )
}