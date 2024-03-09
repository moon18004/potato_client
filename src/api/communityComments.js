import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

export async function getCommentsByPostId(id) {
  const res = await axios
    .get(`${baseURL}postsComments/${id}`)
    .then((res) => res.data)
    .catch((error) => error.response.data);
  return res;
}

export async function postCommunityComment(id, comment) {
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
	console.log(comment);
  const res = await axios
    .post(`${baseURL}postsComments/${id}`, { ...comment }, { headers })
    .then((res) => res.data)
    .catch((error) => error.response.data);

	return res;
}

export async function removeComment(id){
	const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
	const res = await axios
    .delete(`${baseURL}postsComments/${id}`, { headers })
    .then((res) => res.data)
    .catch((error) => error.response.data);
  return res;
}

export async function editComment(id, comment){
	const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
	const res = await axios
    .patch(`${baseURL}postsComments/${id}`, { ...comment }, { headers })
    .then((res) => res.data)
    .catch((error) => error.response.data);
  return res;
}
