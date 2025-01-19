import React, { useEffect } from 'react';
import { Stack, Box, LinearProgress, useMediaQuery } from '@mui/material';
import fetchData from '../assets/utils/dataFetcher';
import Videos from '../components/Videos';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppContext } from '../context/appContext';

const Home = () => {
  const { ref, inView } = useInView();
  const { isSidebarOpen, category } = useAppContext();
  const queryClient = useQueryClient();
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const fetchVideos = async ({ pageParam = '' }) => {
    const res = await fetchData(`search?part=snippet&q=${category}`, pageParam);
    return res;
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchVideos', category], // Include category in queryKey
    queryFn: fetchVideos,
    refetchOnWindowFocus: false,
    initialPageParam: '',
    getNextPageParam: (data) => data.nextPageToken || false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    queryClient.resetQueries(['fetchVideos', category]);
  }, [category, queryClient]);
  
  if (status === 'pending') {
    return <LinearProgress sx={{position:"relative",top:"-82px",left:"0px", zIndex:1001}} color="primary" />;
  }
  if (error) return <div>Error: {error.message}</div>;

  const videos = data?.pages.map(page => page.items).flat();
  if (videos?.length > 0) {
    videos[videos.length - 1].isEnd = true;
  }

  return (
    <>
      <Stack
        sx={{
          flexDirection: { sx: 'column', md: 'row' },
          ml: isSidebarOpen && isScreenGreaterThanMd ? "250px" : "0px",
        }}
      >
        <div>
          <Videos videos={videos} innerref={ref} isChannel={false} />
        </div>
      </Stack>
      {isFetchingNextPage &&
        <Box sx={{ display: "flex", justifyContent: "center", my: "25px" }}>
          <CircularProgress color="success" />
        </Box>
      }
    </>
  );
};

export default Home;
