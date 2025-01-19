import React from 'react';
import { Box, CardContent, CardMedia, Typography, useMediaQuery } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useLocation } from 'react-router-dom';
import { demoProfilePicture } from '../assets/utils/constants';
import { formatNumber, reformat } from '../assets/utils/unitConverter'
import { useAppContext } from '../context/appContext';

const ChannelCard = ({ channelDetail, marginTop, isLinkDisabled }) => {
  const { user, subscriptions,saveSubscription, removeSubscription } = useAppContext()
  let {pathname} = useLocation()
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

  const isDisabled = isLinkDisabled;

  const subscribed = subscriptions?.some(channel => channel.channelId === channelDetail?.id)
  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        flexDirection:"column",
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '356px', md: '320px' },
        height: '326px',
        marginTop,
        mb:pathname.startsWith('/channel')?"50px":"0px",
      }}
    >
      <Link
        to={`/channel/${channelDetail?.id?.channelId}`}
        className={isDisabled ? 'disabled-link' : ''}
        style={isDisabled ? { pointerEvents: 'none', color: 'gray' } : {}}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
              alt={channelDetail?.snippet?.title}
              sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
            />
          </Box>
          <Typography variant="h6">
            {channelDetail?.snippet?.title}{' '}
            <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
              {reformat(formatNumber(parseInt(channelDetail?.statistics?.subscriberCount)).toLocaleString('en-US'))} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
      {user && pathname.startsWith('/channel') && 
          <Box
            onClick={() => {subscribed ? removeSubscription(channelDetail?.id) : subscriptionHandler()}}
            sx={{
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "12px 24px",
              borderRadius: "999px",
              marginTop:"-13px",
              transition: "200ms ease-in-out",
              bgcolor: subscribed?"":"#820300",
              '&:hover': {
                cursor: 'pointer',
                bgcolor: "#ff0000", 
              },
            }}>
            <Typography sx={{ color: "white", ml: "3px" }}>{subscribed?"Unsubscribe":"Subscribe"}</Typography>
          </Box>
      }
    </Box>
  )
};

export default ChannelCard;