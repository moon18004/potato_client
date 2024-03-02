import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

export default function ProtectedRoute({children}) {

	const {verified, setVerified, setUserVerified} = useOutletContext();
	// console.log('asdf');
	
	useEffect(()=>{
		const fetchData = async () => {
			await setUserVerified();
			// console.log(verified);
			
		}
		fetchData();
    
  }, [])
	if(!verified){
		// console.log(verified);
		return <Navigate to = '/' replace />
	}
	// setUserVerified();
	// console.log(verified);

	return children
}

