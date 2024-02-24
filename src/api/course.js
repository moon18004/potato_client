import React from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export async function postCourse(post) {
	const accessToken = localStorage.getItem("accessToken");
	const headers = {
		Authorization: `Bearer ${accessToken}`,
	};
	const res = await axios
		.post(`${baseURL}courses`, { ...post }, { headers })
		.then((res) => res.data)
		.catch((error) => error.response.data);
	console.log(res);

	return res;
}

export async function getCourse() {
	console.log("get");
	const res = await axios
		.get(`${baseURL}courses`)
		.then((res) => res.data)
		.catch((error) => error.response.data);
	console.log(res);
	return res;
}
export async function getCourseById(id) {
	console.log("getbyid");
	const res = await axios
		.get(`${baseURL}courses/${id}`)
		.then((res) => res.data)
		.catch((error) => error.response.data);
	console.log(res);
	return res;
}
