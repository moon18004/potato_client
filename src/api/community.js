import React from 'react';
import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

export async function postCommunity(post){
	const accessToken =localStorage.getItem('accessToken');
	const headers ={
		Authorization: `Bearer ${accessToken}`
	}
	const res = await axios.post(`${baseURL}posts`, {...post}, {headers}).then(res=> res.data).catch((error)=> error.response.data);
	console.log(res);
	
	return res
}

export async function getCommunity(){
	console.log('getComm')
	const res = await axios.get(`${baseURL}posts`).then(res=> res.data).catch((error)=> error.response.data);
	console.log(res);
	return res;

}
export async function getCommunityById(id){
	console.log('asdf');
	const res = await axios.get(`${baseURL}posts/${id}`).then(res=> res.data).catch((error)=> error.response.data);
	// console.log(res);
	return res;

}