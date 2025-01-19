import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext';
import { Box, Typography, useMediaQuery } from '@mui/material'
import { formatNumber, reformat } from '../assets/utils/unitConverter'
import { useNavigate } from 'react-router-dom';
import BookmarkRemoveRoundedIcon from '@mui/icons-material/BookmarkRemoveRounded';

const Subscriptions = () => {
  let { subscriptions, removeSubscription, setSidebarOpen } = useAppContext()
  let navigate = useNavigate()
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const isScreenGreaterThanMdx = useMediaQuery((theme) => theme.breakpoints.up('md'));
  
  useEffect(() => {
    setSidebarOpen(false)
  }, [])

  let wordCount = isScreenGreaterThanMd?150:80;

  return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt:isScreenGreaterThanMdx?"0px":"50px" }}>
          <Box sx={{ height: "auto", width: { md: "70vw", sm: "90vw", xs: "95vw" } }}>
              <Typography variant='h4' sx={{ color: "white", fontFamily: "cursive", mb: "30px", opacity: "0.9", position: "fixed", bgcolor: "black", display: "inline-block", width: "100%" }}>Subscriptions</Typography>
              {!subscriptions || subscriptions.length === 0 ? (
                  <Typography variant='h5' sx={{ color: "white", my: "60px",ml:"10px", fontFamily: "cursive" }}>No Subscriptions</Typography>
              ) : (
                subscriptions.map((channel, index) => (
                          <Box key={index} sx={{
                              display: "flex",flexDirection:isScreenGreaterThanMd?"row":"column", my: "50px", mt: index === 0 ? "80px" : "0px", bgcolor: "#48424263", p: "7px", borderRadius: "8px", '&:hover': {
                                  bgcolor: "#938e8e63"
                              }
                          }}>
                          {isScreenGreaterThanMd && 
                              <Typography onClick={() => navigate(`/channel/${channel.channelId}`)} sx={{ color: "darkgrey", display: "flex", alignItems: "center", mr: "12px",'&:hover': {
                                              cursor: 'default',
                                          } }}>{index + 1}</Typography>
                          }
                                <Box onClick={() => navigate(`/channel/${channel.channelId}`)} sx={{textAlign:"center"}}>
                              <img src={channel.channelThumbnail} alt="img.." style={{ height: "auto", width: isScreenGreaterThanMd ? "160px" : "50%", borderRadius:"100%" }}></img>
                              </Box>
                              <Box onClick={() => navigate(`/channel/${channel.channelId}`)} sx={{ display: "flex", width: "100%" }}>
                                  <Box sx={{ ml: "15px", mt: "10px" }}>
                                      <Typography sx={{ color: "white", fontSize: "20px",textAlign:!isScreenGreaterThanMd?"center":"start" }}>{channel.channelTitle}</Typography>
                                      <Typography sx={{ color: "grey", fontSize: "16px" }}>{channel.channelDescription.slice(0,wordCount)}..</Typography>
                                      <Typography sx={{ color: "grey", fontSize: "14px" }}>{reformat(formatNumber(parseInt(channel.subscribers)).toLocaleString('en-US'))} subscribers</Typography>
                                  </Box>
                              </Box>
                                  <Box 
                                  onClick={() => removeSubscription(channel.channelId)}
                                  sx={{ ml: "auto", mt: "auto" }}>
                                      <BookmarkRemoveRoundedIcon fontSize='large' sx={{
                                          color: "white", '&:hover': {
                                              cursor: 'pointer',
                                              transform: "scale(1.1)",
                                              bgcolor: "#5e5656",
                                              borderRadius: "50%",
                                          },
                                      }} />
                                  </Box>
                          </Box>
                  ))
              )}
          </Box>
      </Box>
  )
}

export default Subscriptions;