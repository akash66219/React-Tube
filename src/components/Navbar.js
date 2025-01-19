import React, { useRef, useState } from 'react';
import { Avatar, Box, Paper, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import vidLogo from '../assets/images/vid_logo.png';
import TroubleshootSharpIcon from '@mui/icons-material/TroubleshootSharp';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useAppContext } from '../context/appContext';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';


const Navbar = () => {
  let searchContentRef = useRef('');
  let navigate = useNavigate();
  let [isSearchBarOpen, setSearchBarOpen] = useState(false);
  let [userNav, setUserNav] = useState(false)
  let { setSidebarOpen, signupWithGoogle, signOutUser, user } = useAppContext()
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  let handleSignup = () => {
    signupWithGoogle()
  }

  let handleSignOut = () => {
    signOutUser()
  }

  let submitHandler = (event) => {
    event.preventDefault();
    let content = searchContentRef.current.value;
    if (content === '') {
      searchContentRef.current.focus();
      return;
    }
    navigate(`/search/${content}`);
  };

  if (isSearchBarOpen) {
    return (
      <Box py={3} sx={{ display: "flex", mr: "1px", justifyContent: "center", position: 'sticky',top: 0,zIndex: 10000, bgcolor:"black" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowBackRoundedIcon fontSize='large'
            onClick={() => setSearchBarOpen(false)}
            sx={{

              color: "grey", transition: "200ms ease-in-out", mr: "5px", mt: "4px", p: "1px", '&:hover': {
                cursor: 'pointer',
                transform: "scale(1.07)",
                bgcolor: "#5e5656",
                borderRadius: "50%",
              },
            }}
          />
        </Box>
        <Paper
          component="form"
          sx={{ width: { xs: "350px", md: "500px" }, height: '40px', borderRadius: 4, opacity: "0.85" }}
        >
          <TextField
            variant="standard"
            placeholder="Search ReactTube"
            sx={{ pl: 1.5, pt: 1, borderRight: 2, width: { xs: "290px", md: "420px" } }}
            inputRef={searchContentRef}
            autoComplete='off'
          />
          <TroubleshootSharpIcon
            sx={{
              mt: 0.8,
              ml: 1,
              '&:hover': {
                bgcolor: 'transparent',
                cursor: 'pointer',
              },
            }}
            onClick={submitHandler}
          />
        </Paper>
      </Box>
    )
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={{ xs: 1, sm: 6 }}
      py={2}
      sx={{
        position: 'sticky',
        top: 0,
        bgcolor: 'rgba(0,0,0,0.9)',
        opacity: 1,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isScreenGreaterThanMd &&
          <Box sx={{ mr: "30px" }}>
            <MenuRoundedIcon fontSize='large'
              onClick={() => setSidebarOpen(val => !val)}
              sx={{
                color: "white", transition: "200ms ease-in-out", p: "4px", mt: "4px", '&:hover': {
                  cursor: 'pointer',
                  transform: "scale(1.07)",
                  bgcolor: "#5e5656",
                  borderRadius: "50%",
                },
              }} />
          </Box>
        }
        <Link to="./">
          <Stack direction="row">
            <img src={vidLogo} height={50} alt="Logo" />
            {isScreenGreaterThanMd && (
              <Typography variant="h4" sx={{ mt: 0.8, ml: 1, color: "red", fontFamily: "fantasy", textShadow: "red 2px 1px 3px" }}>
                ReactTube
              </Typography>
            )}
          </Stack>
        </Link>
      </Box>
      {isScreenGreaterThanMd &&
        <>
          <Paper
            component="form"
            sx={{ width: { xs: "350px", md: "450px" }, height: '40px', borderRadius: 4, opacity: "0.85" }}
          >
            <TextField
              variant="standard"
              placeholder="Search ReactTube"
              sx={{ pl: 1.5, pt: 1, borderRight: 2, width: { xs: "290px", md: "390px" } }}
              inputRef={searchContentRef}
              autoComplete='off'
            />
            <TroubleshootSharpIcon
              sx={{
                mt: 0.8,
                ml: 1,
                '&:hover': {
                  bgcolor: 'transparent',
                  cursor: 'pointer',
                },
              }}
              onClick={submitHandler}
            />
          </Paper>
        </>
      }
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {!isScreenGreaterThanMd &&
          <SearchRoundedIcon fontSize='large'
            onClick={() => setSearchBarOpen(true)}
            sx={{
              color: "white", mr: "15px", mt: "5px", p: "3px", transition: "200ms ease-in-out", '&:hover': {
                cursor: 'pointer',
                transform: "scale(1.07)",
                bgcolor: "#5e5656",
                borderRadius: "50%",
              }
            }} />
        }
        {user ? <>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Box onClick={() => setUserNav(val => !val)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ height: '42px', width: '42px', backgroundColor: '#416D19' }}>
                  {user.displayName[0]}
                </Avatar>
              </Box>
            </Box>
            <Box sx={{ position: 'absolute', top:"50px", right: "0px", zIndex: "5001", width: 'max-content' }}>
              <Collapse in={userNav} timeout="auto" unmountOnExit sx={{zIndex:"5000"}}>
                <List component="div" disablePadding sx={{ bgcolor: 'white', boxShadow: 3, borderRadius: 1, zIndex: "50001", width:"240px", py:"10px", px:"10px"}}>
                  <Typography variant='h6' sx={{textAlign:"center" }}>{user.displayName}</Typography>
                  <Typography sx={{textAlign:"center", fontSize:"15px", borderBottom:"1.5px solid gray"}}>{user.email}</Typography>
                  <ListItemButton onClick={() => navigate('saved-videos')}>
                    <ListItemIcon>
                      <GradeRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Saved Videos" />
                  </ListItemButton>
                  <ListItemButton onClick={() => navigate('subscriptions')}>
                    <ListItemIcon>
                      <SubscriptionsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subscriptions" />
                  </ListItemButton>
                  <ListItemButton sx={{color:"red"}} onClick={handleSignOut}>
                    <ListItemIcon>
                      <LogoutRoundedIcon sx={{color:"red"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Sign out" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>
          </Box>
        </> : <>
          <Box
            onClick={handleSignup}
            sx={{
              border: "2px solid red",
              display: "flex",
              alignItems: "center",
              padding: "3px 12px",
              borderRadius: "999px",
              transition: "200ms ease-in-out",

              '&:hover': {
                cursor: 'pointer',
                bgcolor: "#772727"
              }
            }}>
            <AccountCircleRoundedIcon fontSize='large' sx={{
              color: "red",
              mr: "5px"
            }} />
            <Typography sx={{ color: "red" }}>Sign up</Typography>
          </Box>
        </>}
      </Box>
    </Stack>
  );
};

export default Navbar;
