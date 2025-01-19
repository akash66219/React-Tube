import React, { useEffect } from 'react';
import { LinearProgress, Box, useMediaQuery } from '@mui/material';
import fetchData from '../assets/utils/dataFetcher';
import Videos from '../components/Videos';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import CircularProgress from '@mui/material/CircularProgress';

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  
  const fetchVideos = async ({ pageParam = '' }) => {
    let res = await fetchData(`search?part=snippet&q=${searchTerm}`, pageParam);
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
    queryKey: ['fetchVideos', searchTerm],
    queryFn: fetchVideos,
    initialPageParam: '',
    getNextPageParam: (data) => data.nextPageToken || false,
    refetchOnWindowFocus: false, 
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'pending') return <LinearProgress sx={{position:"relative",top:"-82px",left:"0px", zIndex:1001}} color="primary" />;
  if (error) return <div>Error: {error.message}</div>;

  const videos = data?.pages
    .map(page => page.items)
    .reduce((acc, val) => acc.concat(val), []);
  
  if (videos?.length > 0) {
    videos[videos.length - 1].isEnd = true;
  }

  return (
    <>
      <div>
        <Videos videos={videos} innerref={ref} isChannel={false} />
      </div>
      {isFetchingNextPage && 
        <Box sx={{ display: "flex", justifyContent: "center", my: "25px" }}>
          <CircularProgress color="success" />
        </Box>
      }
    </>
  );
};

export default SearchFeed;
