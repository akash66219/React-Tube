import React from 'react'
import VideoCard from './VideoCard'
import ChannelCard from './ChannelCard'
import { Box,LinearProgress, useMediaQuery } from '@mui/material'
 
const Videos = ({videos,innerref, isChannel, direction}) => {
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  if(!videos || !videos.length) {
    console.log("aasdasd")
    // return <Box sx={{height:"100vh", width:"100vw", bgcolor:"red",zIndex:1001}}></Box>
    return <LinearProgress sx={{position:"relative",top:"-82px",left:"0px", zIndex:1001}} color="primary" />
  }
  return (
    <>
        <Box direction = {direction || "row"} sx={{display:"flex",
        flexDirection : {direction},
        flexWrap:"wrap", px:4,
        justifyContent:"space-evenly",
        height:"92vh",
        overflowY:"scroll",
        mt: !isScreenGreaterThanMd?"50px":"0px"
        }}>
            {videos.map((video,key) => {
              if(video.id.videoId !== undefined){
                if(video.isEnd === true){
                  return <VideoCard key={key} innerref={innerref} video={video} />
                }
                return <VideoCard key={key} video={video} />
              }else if(!isChannel){
                return <ChannelCard key={key} channelDetail={video} />
              }
              return [];
            })}
        </Box>
    </>
  )
} 

export default Videos
