import React, { useEffect } from 'react';
import Navbar from '../components/community/Navbar';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

// responsive view
import MediaQuery from 'react-responsive';

export default function Root() {
  const { user, setUser, verified, setUserVerified, setVerified } =
    useAuthContext();
  // console.log(verified);
  useEffect(() => {
    // console.log('asdf');
    setUserVerified();
  }, []);
  // setUserVerified();
  // console.log(user);
  // console.log(verified);

  return (
    <>
      <MediaQuery minWidth={768}>
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
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <Outlet
          context={{
            user,
            setUser,
            verified,
            setUserVerified,
            setVerified,
          }}></Outlet>
        <Navbar
          auth={{
            user,
            setUser,
            verified,
            setUserVerified,
            setVerified,
          }}></Navbar>
      </MediaQuery>
    </>
  );
}
