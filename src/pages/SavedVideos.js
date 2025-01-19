import { Box, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { formatNumber, reformat } from '../assets/utils/unitConverter'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const SavedVideos = () => {

    let { savedVideos, deleteVideo, setSidebarOpen } = useAppContext()
    const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const isScreenGreaterThanMdx = useMediaQuery((theme) => theme.breakpoints.up('md'));
    let navigate = useNavigate()

    useEffect(() => {
      setSidebarOpen(false)
    }, [])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt:isScreenGreaterThanMdx?"0px":"50px"}}>
            <Box sx={{ height: "auto", width: { md: "70vw", sm: "90vw", xs: "95vw" } }}>
                <Typography variant='h4' sx={{ color: "white", fontFamily: "cursive", mb: "20px", opacity: "0.9", position: "fixed", bgcolor: "black", display: "inline-block", width: "100%" }}>Saved Videos</Typography>
                {!savedVideos || savedVideos.length === 0 ? (
                    <Typography variant='h5' sx={{ color: "white", my: "60px",ml:"10px", fontFamily: "cursive" }}>No Saved Videos</Typography>
                ) : (
                    savedVideos.map((video, index) => (
                            <Box key={index} sx={{
                                display: "flex",flexDirection:isScreenGreaterThanMd?"row":"column", my: "50px", mt: index === 0 ? "80px" : "0px", bgcolor: "#48424263", p: "7px", borderRadius: "8px", '&:hover': {
                                    bgcolor: "#938e8e63"
                                }
                            }}>
                            {isScreenGreaterThanMd && 
                                <Typography onClick={() => navigate(`/video/${video.videoId}`)} sx={{ color: "darkgrey", display: "flex",justifySelf:"center", alignItems: "center", mr: "12px",'&:hover': {
                                                cursor: 'default',
                                            } }}>{index + 1}</Typography>
                            }
                                            <Box>
                                <img onClick={() => navigate(`/video/${video.videoId}`)} src={video.videoThumbnail} alt="img.." style={{ borderRadius: "20px", height: "160", width: isScreenGreaterThanMd ? "250px" : "100%" }}></img>
                                </Box>
                                <Box onClick={() => navigate(`/video/${video.videoId}`)} sx={{ display: "flex", width: "100%" }}>
                                    <Box sx={{ ml: "15px", mt: "10px" }}>
                                        <Typography sx={{ color: "white", fontSize: "16px" }}>{video.videoTitle}</Typography>
                                        <Typography sx={{ color: "grey", fontSize: "15px" }}>{video.channelTitle}<CheckCircleIcon sx={{ fontSize: "12px", color: "gray" }} /></Typography>
                                        <Typography sx={{ color: "grey", fontSize: "13px" }}>{reformat(formatNumber(parseInt(video.views).toLocaleString()))} views</Typography>
                                    </Box>
                                </Box>
                                    <Box 
                                    onClick={() => deleteVideo(video.videoId)}
                                    sx={{ ml: "auto", mt: "auto" }}>
                                        <DeleteIcon sx={{
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

export default SavedVideos
