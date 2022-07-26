import { useContext } from "react";                       // <== IMPORT 
import { AuthContext } from "../context/auth.context";  // <== IMPORT
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";


const pages = [{label:"Jams",link:"/jams"},
                {label:"Map",link:"/map"},];

const logedPages = [
    {label:"Create",link:"/createjam"},
    {label:"Jams",link:"/jams"},
    {label:"Map",link:"/map"},]

const settingsLoggedOut = [{label:"Log in",link:"/login"},
                        {label:"Sign Up",link:"/signup"},
                        ]

const ResponsiveAppBar = () => {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)    
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userMongo,setUserMongo] = React.useState(null);
    const [isPicture,setIsPicture] = React.useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function getCurrentUserInDb (user) {
		axios
		.get(`${process.env.REACT_APP_API_URL}/users/${user._id}`)
		.then((foundUser)=>{
			setUserMongo(foundUser.data)
		})
	}

    function handleChangePicture () {
        isPicture ? (setIsPicture(false)) : (setIsPicture(true))
    }

    React.useEffect(()=>{
        if(user){
            getCurrentUserInDb (user)
        }
    },[user])

    if(isLoggedIn){
        return (
            <>
                <AppBar position="static" sx={{backgroundColor:"primary.main"}}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                    <MusicNoteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,  }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        JAMME FIVE
                    </Typography>
    
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        {logedPages.map((page) => (
                                
                                <MenuItem key={page.label} href={page.link} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                        ))}                    
                        </Menu>
                    </Box>
                    <MusicNoteIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        JAMME FIVE
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {logedPages.map((page) => (
                        <Button
                            key={page.label}
                            onClick={handleCloseNavMenu}
                            href={page.link}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page.label}
                        </Button>
                        ))} 
                    </Box>
    
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {userMongo &&
                            <Avatar alt="" src={userMongo.picture}></Avatar>}
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        <MenuItem key="Profile" component={Link} to="/profile"
                        onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem key="Log out" component={Link} to="/" 
                        onClick={()=>{
                            logOutUser()
                            handleCloseUserMenu()
                            handleChangePicture()
                        }}>
                        <Typography textAlign="center">Logout</Typography>
                        </MenuItem>               
                        </Menu>
                    </Box>
                    </Toolbar>
                </Container>
                </AppBar> 
            </>
        );
    }else{
        return (
            <>
                <AppBar position="static" sx={{backgroundColor:"primary.main"}}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                    <MusicNoteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,  }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        JAMME FIVE
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        {pages.map((page) => (
                                
                                <MenuItem key={page.label} href={page.link} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))
                        }                    
                        </Menu>
                    </Box>
                    <MusicNoteIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        JAMME FIVE
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page.label}
                            onClick={handleCloseNavMenu}
                            href={page.link}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page.label}
                        </Button>
                        ))
                        } 
                    </Box>
    
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <LoginIcon sx={{color:'white'}}/>
                        </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settingsLoggedOut.map((setting) => (
                            <MenuItem key={setting.label} component={Link} to={setting.link}
                            onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting.label}</Typography>
                            </MenuItem>
                            ))
                        }               
                        </Menu>
                    </Box>
                    </Toolbar>
                </Container>
                </AppBar>
                
            </>
        );
    }
};

export default ResponsiveAppBar;
