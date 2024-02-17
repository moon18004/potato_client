import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Information from './pages/Information';
import Course from './pages/Course';
import Community from './pages/Community';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContextProvider } from './context/AuthContext';
import PostCommunity from './pages/PostCommunity';
import ProtectedRoute from './pages/ProtectedRoute';
import CommunityPost from './components/CommunityPost';
import CommunityDetail from './pages/CommunityDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/information', element: <Information /> },
      { path: '/course', element: <Course /> },
      { path: '/community', element: <Community /> },
      
      {
        path: '/community/post',
        element: (
          <ProtectedRoute>
            <PostCommunity />
          </ProtectedRoute>
        ),
      },
      { path: '/communityPost/:id', element: <CommunityDetail /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
