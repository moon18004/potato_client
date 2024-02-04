import React from 'react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export async function sendOTP(email) {
  
  const res = await axios.post(`${baseURL}mail/send`, {email}).then(res=> res.data).catch(error=> error.response.data);
	// .then(console.log).catch((error) => console.log(error));
	console.log(res);
	return res;
  
}

export async function verifyOTP(email, code){
	const res = await axios.post(`${baseURL}mail/${code}`, {email}).then(res=> res.data).catch(error => error.response.data);
	console.log(res);
	return res;
}

export async function register(userInfo){
	const res = await axios.post(`${baseURL}auth/register/email`, {...userInfo}).then(res=> res.data).catch((error)=> error.response.data);
	console.log(res);
	if (res.accessToken){
		localStorage.setItem('accessToken', res.accessToken);
		localStorage.setItem('refreshToken', res.refreshToken);
	}
	return res
}
export async function verifyToken(){
	const accessToken =localStorage.getItem('accessToken');
	const headers ={
		Authorization: `Bearer ${accessToken}`
	}
	return await axios.post(`${baseURL}auth/verify`, {}, {headers}).then(res=> res.data).catch(error=> error.response.data);
}
export async function refreshAccessToken(){
	const refreshToken =localStorage.getItem('refreshToken');
	const headers ={
		Authorization: `Bearer ${refreshToken}`
	}
	// console.log(headers);
	const res = await axios.post(`${baseURL}auth/token/access`, {}, {headers}).then(res=> res.data).catch(error=> error.response.data);
	if(!res.error){
		localStorage.setItem('accessToken', res.accessToken);
		return true;
	}else{
		return false;
	}
}
export async function clearTokens(){
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
}
export async function login(token){
	const headers ={
		Authorization: `Basic ${token}`
	}
	const res = await axios.post(`${baseURL}auth/login/email`, {}, {headers}).then(res=> res.data).catch((error)=> error.response.data);
	if(!res.error){
		localStorage.setItem('accessToken', res.accessToken);
		localStorage.setItem('refreshToken', res.refreshToken);
		
	}return res;
	
}