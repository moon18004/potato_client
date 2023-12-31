import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <Link to='/'>Home</Link>
			<Link to='/information'>information</Link>
			<Link to='/course'>course</Link>
			<Link to='/community'>community</Link>
    </div>
  );
}
