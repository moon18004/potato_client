import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { clearTokens } from '../api/authClient';
export default function Navbar({auth}) {

  // const {user, setUser, verified,setUserVerified, setVerified} = useAuthContext();
  const {user, setUser, verified,setUserVerified, setVerified} = auth;
  // console.log(verified);
  // console.log(verified);
  // useEffect(()=>{
  //   setUserVerified();
  // }, [])
  

  // console.log(setUserVerified());
  const handleLogout = () => {
    const ans = confirm("Do you want to logout?")
    if(ans){
      clearTokens();
      setVerified(false);
      setUser({})
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
