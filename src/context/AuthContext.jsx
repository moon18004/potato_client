
import { createContext, useContext, useEffect, useState } from 'react';
import { refreshAccessToken, verifyToken } from '../api/authClient';

const AuthContext = createContext();

export function AuthContextProvider({children}){
	
	const [verified, setVerified] = useState(false);
	const [user, setUser] = useState();

	// useEffect( () => { async () => {
	// 	const res = await verifyToken();
		
	// 	console.log(res);
	// 	if (res.email){
	// 		setVerified(true);
	// 		setUser(res);
			
	// 	}
	// 	else if(res.error){
	// 		setVerified(false);
	// 		const me = await refreshAccessToken();
	// 		setVerified(me)
	// 	}
	// }
	// }, [])

	const setUserVerified = async () => {
		const res = await verifyToken();
		// console.log(res);
		// console.log(res);
		// console.log(res);
		if (res.email){
			setVerified(true);
			setUser(res);
		}
		else if(res.error){
			setVerified(false);
			const me = await refreshAccessToken();
			// console.log(me);
			setVerified(me)
		}
	}

	return(
		<AuthContext.Provider
			value={{user, setUser, verified, setUserVerified, setVerified}}>
			
				{children}
			</AuthContext.Provider>
	)

}
export function useAuthContext(){
	return useContext(AuthContext);
}