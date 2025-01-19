import React from 'react';
import { categories } from '../assets/utils/constants';
import { Stack, useMediaQuery, Typography,Box } from '@mui/material';
import { Button } from '@mui/material';
import './Sidebar.css'; 
import CopyrightSharpIcon from '@mui/icons-material/CopyrightSharp';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {

  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const {setCategoryHandler} = useAppContext();
  let navigate = useNavigate()

  let changeCategoryHandler = (val) => {
    setCategoryHandler(val)
    .then(() => {
      navigate('/')
    })
  }

  return (
    <Box sx={{
        position: "fixed",
        top: "80px",
        left: 0,
        height: isScreenGreaterThanMd?"97%":"auto",
        zIndex: "1",
        bgcolor:"black",
        opacity:"0.9",
        display:"flex",
        overflowY: 'auto',
        overflowX: 'auto',
        flexDirection :"column"
    }}>
      <Stack
        direction="row"
        sx={{
          flexDirection: { md: 'column' },
          overflowY: 'auto',
          overflowX: 'auto',
          height: { xs: 'auto', md: '95%'},
          width:{xs:"100vw",md:"91%"},
          mb:{md:2},
          mx:{md:3},
        }}
        className="sidebar-container" 
      >
        {categories.map((category, index) => (
          <Box key={index} sx={{px:{md:1}}}>
            <Button variant="standard" key={category.name} 
            sx={{'&:hover':{backgroundColor:"#7D7C7C", transform:"scale(1.1)"}, 
            my:{md:0.8}, 
            width:"auto"}}
            onClick={() => changeCategoryHandler(category.name)}
            >
              <span style={{ color:"lightgreen", marginTop:"4px" }}><div>{category.icon}</div></span>
              <Typography variant="body1" color="grey" sx={{px:2}}>
                {category.name}
              </Typography>
            </Button>
          </Box>
        ))}

        {isScreenGreaterThanMd && (
            <Stack direction="row" sx={{ml:1, position:"relative"}}>
              <CopyrightSharpIcon height="10px" sx={{ color: 'grey' }} />
              <Typography variant="body1" color={'grey'} sx={{ mt: 0.1}}>
                Copyright ReactTube
              </Typography>
            </Stack>
        )}
      </Stack>
      </Box>
  );
};

export default Sidebar;
