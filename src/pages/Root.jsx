import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function Root() {
  const { user, setUser, verified, setUserVerified, setVerified } =
    useAuthContext();
  // console.log(verified);
  useEffect(() => {
    // console.log('asdf');
    setUserVerified();
  }, []);
  // setUserVerified();
  // console.log(verified);

  return (
    <>
      <Navbar
        auth={{
          user,
          setUser,
          verified,
          setUserVerified,
          setVerified,
        }}></Navbar>
      <Outlet
        context={{
          user,
          setUser,
          verified,
          setUserVerified,
          setVerified,
        }}></Outlet>
    </>
  );
}
