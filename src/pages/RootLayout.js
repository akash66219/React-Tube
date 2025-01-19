import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box, useMediaQuery } from '@mui/material';
import { useAppContext } from '../context/appContext';

const RootLayout = () => {
  const {isSidebarOpen} = useAppContext()
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));


  return ( 
    <>
      <Navbar />
      <Box >
      {isScreenGreaterThanMd ? isSidebarOpen &&  
      <Box>
        <Sidebar />
      </Box>
      :
      <Box>
        <Sidebar />
      </Box>
      }
        <Outlet />
      </Box>
    </>
  );
};

export default RootLayout;
