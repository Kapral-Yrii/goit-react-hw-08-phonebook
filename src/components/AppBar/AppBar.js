import s from './AppBar.module.css'
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUserName } from '../../redux/auth/auth-selectors'
import { Navigation } from '../Navigation/Navigation'
import { AuthNav } from '../AuthNav/AuthNav'
import { UserMenu } from '../UserMenu/UserMenu'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export function AppBar() {
  const isLoggedIn = useSelector(getIsLoggedIn)
  const userName = useSelector(getUserName)
  const windowInnerWidth = window.innerWidth
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
      <header className={s.header}>
      {windowInnerWidth > 768 ?
        (<>
          <Navigation />
          {!isLoggedIn && <AuthNav />}
          {isLoggedIn && <UserMenu />}
        </>)
        :
        (<>
          <div className={s.menu}>
            <Button
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              MENU
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}><Link className={s.link} to="/">Home</Link></MenuItem>
              {isLoggedIn && <MenuItem onClick={handleClose}><Link className={s.link} to="/contacts">Contacts</Link></MenuItem>}
              {!isLoggedIn && <MenuItem onClick={handleClose}><Link className={s.link} to="/Login">Login</Link></MenuItem>}
              {!isLoggedIn && <MenuItem onClick={handleClose}><Link className={s.link} to="/register">Register</Link></MenuItem>} 
              {isLoggedIn && <MenuItem onClick={handleClose}><UserMenu /></MenuItem>}
            </Menu>
          </div>
          <div>
            <ul className={s.userData}>
              <li className={s.item}>{<AccountCircleIcon/>}</li>
              <li className={s.item}>{userName}</li>
            </ul>
          </div>
          </>)}
      </header>
  )
}