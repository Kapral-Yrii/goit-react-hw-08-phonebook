import s from './AppBar.module.css'
import { useSelector } from "react-redux";
import { getIsLoggedIn } from '../../redux/auth/auth-selectors'
import { Navigation } from '../Navigation/Navigation'
import { AuthNav } from '../AuthNav/AuthNav'
import { UserMenu } from '../UserMenu/UserMenu'

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



export function AppBar() {
    const isLoggedIn = useSelector(getIsLoggedIn)
    return (
        // <header className={s.header}>
        //     <Navigation />
        //     {!isLoggedIn && <AuthNav />}
        //     {isLoggedIn && <UserMenu/>}
        // </header>
        <Box sx={{ width: '100%' }}>
      <Tabs aria-label="nav tabs example">
        <Tab value="1" label="Home" href="/" />
        <Tab value="2" label="Contacts" href="/contacts" />
        <Tab value="3" label="Login" href="/login" />
        <Tab value="4" label="Register" href="/register" />
      </Tabs>
    </Box>
    )
}