import React from 'react';
import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

export async function postCommunity(post){
	const accessToken =localStorage.getItem('accessToken');
	const headers ={
		Authorization: `Bearer ${accessToken}`
	}
	const res = await axios.post(`${baseURL}posts`, {...post}, {headers}).then(res=> res.data).catch((error)=> error.response.data);
	// console.log(res);
	
	return res
}

export async function getCommunity(){
	// console.log('getComm')
	const res = await axios.get(`${baseURL}posts`).then(res=> res.data).catch((error)=> error.response.data);
	console.log(res);
	
	return res;
}
export async function getCrucials(){
	// console.log('getComm')
	const res = await axios.get(`${baseURL}posts/crucials`).then(res=> res.data).catch((error)=> error.response.data);
	// console.log(res);
	
	return res;
}

export async function getCommunityById(id){
	
	const res = await axios.get(`${baseURL}posts/${id}`).then(res=> res.data).catch((error)=> error.response.data);
	// console.log(res);
	return res;
}

export async function increaseView(id){
	const res = await axios.patch(`${baseURL}posts/view/${id}`).then(res=> res.data).catch((error)=> error.response.data);
	return res;
}
export async function deleteCommunity(id){
	const accessToken =localStorage.getItem('accessToken');
	const headers ={
		Authorization: `Bearer ${accessToken}`
	}
	const res = await axios.delete(`${baseURL}posts/${id}`, {headers}).then(res=> res.data).catch((error)=> error.response.data);
	return res;
}

export async function editCommunity(id, post){
	const accessToken =localStorage.getItem('accessToken');
	const headers ={
		Authorization: `Bearer ${accessToken}`
	}
	// console.log(post);

	const res = await axios.patch(`${baseURL}posts/${id}`, {...post}, {headers}).then(res=> res.data).catch((error)=> error.response.data);
	return res;
}

export async function editType(id, type){
	// console.log(type);
	const accessToken =localStorage.getItem('accessToken');
	const headers ={
		Authorization: `Bearer ${accessToken}`
	}
	// console.log(headers);
	const res = await axios.patch(`${baseURL}posts/popular/${id}`, {type}, {headers}).then(res=> res.data).catch((error)=> error.response.data);
	return res;


}