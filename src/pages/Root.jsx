import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

// responsive view
import MediaQuery from 'react-responsive';

export default function Root() {
  return (
    <>
      <MediaQuery minWidth={768}>
        <Navbar></Navbar>
        <Outlet></Outlet> 
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <Outlet></Outlet>
        <Navbar></Navbar>
      </MediaQuery>
    </>
  );
}
