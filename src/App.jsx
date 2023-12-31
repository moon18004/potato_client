import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Root from './pages/Root'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Information from './pages/information'
import Course from './pages/Course'
import Community from './pages/Community'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <NotFound/>,
    children: [
      { index: true, element: <Home />},
      { path: '/information', element: <Information/>},
      { path: '/course', element: <Course />},
      { path: '/community', element: <Community />}  
    ]
  }
])

function App() {


  return (
    <RouterProvider router = {router}>
      
    </RouterProvider>
  )
}

export default App
