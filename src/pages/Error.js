import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Box sx={{height:"80vh",display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Box sx={{display:"flex", flexDirection:"column "}}>
            <Box sx={{display:"flex", justifyContent:"center"}}>
                <ErrorIcon sx={{color:"red", fontSize:"20vh"}}/>
            </Box>
            <Box textAlign="center">
                <Typography variant="h3" color="white">Some Error Occured!</Typography>
                <Typography variant="h5" color="white">Could not fetch requested data...</Typography>
                <Button variant='contained' sx={{mt:2}}><Link to="./">Home</Link></Button>
            </Box>
        </Box>
    </Box>
  )
}

export default Error
