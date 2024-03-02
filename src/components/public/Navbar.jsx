import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { clearTokens } from '../../api/authClient';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// icons
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import ForumIcon from '@mui/icons-material/Forum';

// responsive view
import MediaQuery from 'react-responsive';

export default function Navbar({ auth }) {
  // const {user, setUser, verified,setUserVerified, setVerified} = useAuthContext();
  const { user, setUser, verified, setUserVerified, setVerified } = auth;
  // console.log(verified);
  // console.log(verified);
  // useEffect(()=>{
  //   setUserVerified();
  // }, [])

  // console.log(setUserVerified());
  const handleLogout = () => {
    const ans = confirm('Do you want to logout?');
    if (ans) {
      clearTokens();
      setVerified(false);
      setUser({});
    }
  };

  const [event, setEvent] = useState(false);
  const handleChange = (event, newValue) => {
    setEvent(newValue);
  };

  return (
    <header>
      <MediaQuery minWidth={1024}>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/information'>information</Link>
          <Link to='/course'>course</Link>
          <Link to='/community'>community</Link>
        </div>
        <div>
          {!verified && <Link to='/register'>Register</Link>}
          {!verified && <Link to='/login'>Login</Link>}
          {verified && <Link onClick={handleLogout}>Logout</Link>}
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={1023}>
        <BottomNavigation
          showLabels
          value={event}
          onChange={handleChange}
        >
          
          <BottomNavigationAction 
            label="Home" 
            value='home' 
            icon={<HomeIcon />} 
            component={Link}
            to="/" />
          <BottomNavigationAction 
            label="Information" 
            value='info' 
            icon={<InfoIcon />} 
            component={Link}
            to="/information" /> 
          <BottomNavigationAction 
            label="Course" 
            icon={<SchoolIcon />} 
            component={Link}
            to="/course" /> 
          <BottomNavigationAction 
            label="community" 
            icon={<ForumIcon />} 
            component={Link}
            to="/community" /> 
        </BottomNavigation>

        <div>
          {!verified && <Link to='/register'>Register</Link>}
          {!verified && <Link to='/login'>Login</Link>}
          {verified && <Link onClick={handleLogout}>Logout</Link>}
        </div>
      </MediaQuery>
    </header>
  );
}
