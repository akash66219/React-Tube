import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, LinearProgress, CardMedia, useMediaQuery } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatNumber, reformat } from "../assets/utils/unitConverter";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import { Videos } from "./";
import fetchData from "../assets/utils/dataFetcher";
import { demoProfilePicture } from "../assets/utils/constants";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { useAppContext } from "../context/appContext";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import classes from './VideoDetail.module.css'

const VideoDetail = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState(null);
  const { videoId } = useParams();
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const isScreenGreaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const { user, savedVideos, deleteVideo, subscriptions, setSidebarOpen, saveVideo, saveSubscription, removeSubscription } = useAppContext()

  useEffect(() => {
    setSidebarOpen(false)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetchData(`videos?part=snippet,statistics&id=${videoId}`)
      .then((data) => {
        setVideoDetail(data.items[0])
        let channelId = data?.items[0]?.snippet?.channelId
        return channelId
      })
      .then(channelId => {
        fetchData(`channels?part=snippet&id=${channelId}`)
          .then((data) => setChannelDetail(data.items[0]))
      })

    fetchData(`search?part=snippet&relatedToVideoId=${videoId}&type=video`)
      .then((data) => {
        setVideos(data.items)
      })
    setIsLoading(false)
  }, [videoId]);

  if (!videoDetail?.snippet || isLoading) return <LinearProgress sx={{position:"relative",top:"-82px",left:"0px", zIndex:1001}} color="primary" />;

  let saveVideoHandler = () => {
    let newVideo = {
      videoId: videoId,
      videoTitle: videoDetail.snippet.title,
      videoThumbnail: videoDetail.snippet.thumbnails.medium.url,
      channelTitle: videoDetail.snippet.channelTitle,
      views: videoDetail.statistics.viewCount,
      likes: videoDetail.statistics.likeCount
    }
    saveVideo(newVideo)
  }

  let subscriptionHandler = () => {
    let newChannel = {
      channelId: channelDetail.id,
      channelTitle: channelDetail.snippet.title,
      channelDescription: channelDetail.snippet.description,
      channelThumbnail: channelDetail.snippet.thumbnails.medium.url,
      subscribers: channelDetail.statistics.subscriberCount,
    }
    saveSubscription(newChannel)
  }

  if (isLoading) return <LinearProgress sx={{position:"relative",top:"-82px",left:"0px", zIndex:1001}} color="primary" />;

  const subscribed = subscriptions.some(channel => channel.channelId === channelDetail?.id)
  const isSaved = savedVideos.some(vid => vid.videoId === videoId)

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <>
      <Box minHeight="90vh" sx={{ mt: !isScreenGreaterThanMd ? "70px" : "0px" }}>
        <Stack direction={{ xs: "column", lg: "row" }}
          sx={{ display: "flex", }}
          divider={
            <Box
              component="hr"
              sx={{
                border: (theme) =>
                  `1px solid ${theme.palette.mode === 'dark' ? 'grey' : '#BBAB8C'}`,
              }}
            />
          }
        >
          <Box sx={{ width: "90vw" }}>
            <Box sx={{ width: { lg: "75vw", xs: "100vw" }, position: "sticky", top: "50px", ml:"2px" }}>
              <div className={classes["react-player-wrapper"]}>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} className={classes["react-player"]} controls width={!isScreenGreaterThanMd?"100%":"98%"} height="100%" />
              </div>
              <Typography color="#fff" variant="h6" fontWeight="bold" p={2}>
                {title}
              </Typography>
              <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
                <Box sx={{ display: "flex" }}>
                  <Link to={`/channel/${channelId}`}>
                    <Box sx={{ display: "flex", alignItems: "conter" }} color="#fff" >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CardMedia
                          image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                          alt={channelDetail?.snippet?.title}
                          sx={{ borderRadius: '50%', height: '45px', width: '45px', border: '1px solid #e3e3e3' }}
                        />
                        {isScreenGreaterThanSm &&
                          <Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography variant="subtitle1" fontSize='1rem' sx={{ ml: "10px", fontWeight: "900" }}>{channelTitle}</Typography>
                              {isScreenGreaterThanMd && <CheckCircleIcon sx={{ fontSize: "18px", color: "gray", ml: "5px", mb: "10px" }} />}
                            </Box>
                            {channelDetail?.statistics?.subscriberCount && (
                              <Typography sx={{ fontSize: '11px', fontWeight: 500, color: 'gray', ml: "10px" }}>
                                {reformat(formatNumber(parseInt(channelDetail?.statistics?.subscriberCount)).toLocaleString('en-US'))} {isScreenGreaterThanMd ? "Subscribers" : "Subs"}
                              </Typography>
                            )}
                          </Box>
                        }

                      </Box>
                    </Box>
                  </Link>
                  {user && 
                  <Box sx={{ display: "flex" }}>
                    <Box
                      onClick={() => !isSaved ? saveVideoHandler() : deleteVideo(videoId)}
                      sx={{
                        border: "1px solid white",
                        display: "flex",
                        alignItems: "center",
                        padding: "7px 12px",
                        borderRadius: "999px",
                        transition: "200ms ease-in-out",
                        ml: { md: "20px", xs: "10px" },
                        '&:hover': {
                          cursor: 'pointer',
                          bgcolor: "#F9C11C"
                        }
                      }}><LibraryAddRoundedIcon />
                      {isScreenGreaterThanSm &&
                        <Typography sx={{ color: "white", ml: "3px" }}>
                          {isSaved ? "Remove" : "Save"}
                        </Typography>
                      }
                    </Box>
                    <Box
                      onClick={() => subscribed ? removeSubscription(channelDetail.id) : subscriptionHandler()}
                      sx={{
                        border: "1px solid white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "7px 12px",
                        ml: "12px",
                        borderRadius: "999px",
                        transition: "200ms ease-in-out",
                        bgcolor: subscribed ? "" : "#820300",
                        '&:hover': {
                          cursor: 'pointer',
                          bgcolor: "#ff0000",
                        },
                      }}>
                      {isScreenGreaterThanSm ?
                        <Typography sx={{ color: "white", ml: "3px" }}>{subscribed ? "Unsubscribe" : "Subscribe"}</Typography> :
                        <SubscriptionsIcon />
                      }
                    </Box>
                  </Box>
                  }
                </Box>
                <Stack direction="row" alignItems="center" gap={"12px"}>
                  <Typography variant="body1" sx={{
                    opacity: 0.7,
                    border: "1px solid white",
                    display: "flex",
                    alignItems: "center",
                    py: "4px",
                    px: { md: "14px", xs: "4px" },
                    borderRadius: "999px",
                    bgcolor: "#5e5656"
                  }}>
                    {reformat(formatNumber(parseInt(likeCount).toLocaleString()))}<ThumbUpIcon sx={{ ml: "2px", mb: "6px" }} />
                  </Typography>
                  <Typography variant="body1" sx={{
                    opacity: 0.7,
                    border: "1px solid white",
                    display: "flex",
                    alignItems: "center",
                    py: "8px",
                    px: { md: "14px", xs: "4px" },
                    borderRadius: "999px",
                    bgcolor: "#5e5656"
                  }}>
                    {reformat(formatNumber(parseInt(viewCount).toLocaleString()))} <RemoveRedEyeRoundedIcon sx={{ ml: "2px" }} />
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ height: "100%" }}>
            <Videos videos={videos} isChannel={true} direction="column" />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default VideoDetail;