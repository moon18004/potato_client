import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { clearTokens } from '../api/authClient';
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
  return (
    <header>
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
    </header>
  );
}
