import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { clearTokens } from '../api/authClient';

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// icons
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import ForumIcon from '@mui/icons-material/Forum';

// responsive view
import MediaQuery from 'react-responsive';

export default function Navbar() {
  const {verified, setUserVerified, setVerified} = useAuthContext();
  console.log(verified);
  setUserVerified();

  // console.log(setUserVerified());
  const handleLogout = () => {
    const ans = confirm("Do you want to logout?")
    if(ans){
      clearTokens();
      setVerified(false);
    }
  }

  const [event, setEvent] = useState(false);
  const handleChange = (event, newValue) => {
    setEvent(newValue);
  };

  return (
    <header>
      <MediaQuery minWidth={1024} >
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
          <Link to='/'>
            <BottomNavigationAction label="Home" value='home' icon={<HomeIcon />} />
          </Link>
          <Link to='/information'>
            <BottomNavigationAction label="Information" value='info' icon={<InfoIcon />} />
          </Link>
          <Link to='/course'>
            <BottomNavigationAction label="Course" icon={<SchoolIcon />} />
          </Link>
          <Link to='/community'>
            <BottomNavigationAction label="community" icon={<ForumIcon />} />
          </Link>
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
