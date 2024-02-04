
import { createContext, useContext, useEffect, useState } from 'react';
import { refreshAccessToken, verifyToken } from '../api/authClient';

const AuthContext = createContext();

export function AuthContextProvider({children}){
	const [verified, setVerified] = useState(false);

	const setUserVerified = async () => {
		const res = await verifyToken();
		console.log(res);
		if (res.email){
			setVerified(true);
		}
		else if(res.error){
			setVerified(false);
			const me = await refreshAccessToken();
			setVerified(me)
		}
	}

	return(
		<AuthContext.Provider
			value={{verified, setUserVerified, setVerified}}>
				{children}
			</AuthContext.Provider>
	)

}
export function useAuthContext(){
	return useContext(AuthContext);
}