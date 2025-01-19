import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchData from '../assets/utils/dataFetcher'
import { Box, LinearProgress, useMediaQuery } from '@mui/material'
import ChannelCard from '../components/ChannelCard'
import Videos from '../components/Videos'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import CircularProgress from '@mui/material/CircularProgress';
import { useAppContext } from '../context/appContext'

const Channel = () => {
    const {channelId} = useParams();
    let {ref, inView} = useInView()
    const [channelDetail, setChannelDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const {setSidebarOpen} = useAppContext()

    useEffect(() => {
      setSidebarOpen(false)
    }, [])

    useEffect(() => {
      setIsLoading(true)

      fetchData(`channels?part=snippet&id=${channelId}`)
      .then((data) => setChannelDetail(data.items[0]))
      .catch((err) => {throw new Error("Cannot fetch channel data")})

      setIsLoading(false)
    }, [channelId])
  
    const fetchVideos = async ({ pageParam = '' }) => {
      let res = await fetchData(`search?channelId=${channelId}&part=snippet&order=date`,pageParam)
      return res; 
     };
  
     let videos;
     
     const {
      data,
      status,
      error,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
     } = useInfiniteQuery({
      queryKey: ['fetchVideos'],
      queryFn: fetchVideos,
      initialPageParam: '',
      refetchOnWindowFocus: false,
      getNextPageParam: (data) => {
         return data.nextPageToken || false;
      },
     });
  
  
     useEffect(() => {
       if(inView && hasNextPage){
         fetchNextPage()
       }
     }, [inView,hasNextPage,fetchNextPage])
  
     if (status === 'pending' || isLoading) return <LinearProgress sx={{position:"relative",top:"-82px",left:"0px", zIndex:1001}} color="primary" />;
     if (error) return <div>Error: {error.message}</div>;
  
    videos = data?.pages.map(page => page.items).reduce((acc, val) => acc.concat(val), []);
    if(videos.length) videos[videos.length-1].isEnd = true

    
  return (
    <>
      <Box>
        <Box sx={{height:"230px", bgcolor:"yellow", width:"100%",mt: isScreenGreaterThanMd ? "0px" : "45px", zIndex: "100"}} />
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <ChannelCard channelDetail={channelDetail} marginTop='-100px' isLinkDisabled={true}/>
        </Box>
        <Box>
          <Videos videos={videos} innerref={ref} isChannel={true}/>
        </Box>
      </Box>
      {isFetchingNextPage && 
        <Box sx={{display:"flex", justifyContent:"center", my:"25px"}}>
          <CircularProgress color="success" />
        </Box>
      }
    </>
  )
}

export default Channel
