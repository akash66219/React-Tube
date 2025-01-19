import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RootLayout, Home, Channel, Error, SearchFeed,VideoDetail } from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, useAppContext } from './context/appContext';
import SavedVideos from './pages/SavedVideos';
import Subscriptions from './pages/Subscriptions';
import PrivateRoute from './components/Private';

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', 
    },
    secondary: {
      main: '#f50057', 
    },
  },
});

const App = () => {
  const {setUser, fetchSavedVideo, fetchSubscription, fetchCategory} = useAppContext()

  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
      if(User){
        setUser(User)
      }else{
        setUser(null)
      }
    })
  }, [setUser])


  useEffect(() => {
    fetchSavedVideo()
    fetchSubscription()
    fetchCategory()
  }, [])
  

  let router = createBrowserRouter([ 
    {
      path: '/',
      element: <RootLayout />,
      errorElement : <Error />,
      children: [
        { index: true, element: <Home /> },
        { path : 'channel/:channelId', element : <Channel />},
        { path : 'search/:searchTerm', element : <SearchFeed />},
        { path : 'video/:videoId', element : <VideoDetail />},
        { path: 'saved-videos', element: <PrivateRoute><SavedVideos /></PrivateRoute> },
        { path: 'subscriptions', element: <PrivateRoute><Subscriptions /></PrivateRoute> },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
