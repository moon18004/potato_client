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
	return res

}