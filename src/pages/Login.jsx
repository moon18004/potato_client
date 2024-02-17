import React, { useState } from 'react';
import '../styles/base.css';
import { login } from '../api/authClient';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
  const [user, setUser] = useState({});
	const navigate = useNavigate();
	const {verified, setUserVerified, setVerified} = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((info) => ({ ...info, [name]: value }));
    // console.log(user);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = `${user.email}:${user.password}`;
    const encoded = btoa(token);
		const res = await login(encoded);
		if(!res.error){
			setVerified(true);
			navigate('/');
		}
		else{
			alert(res.message);
		}
  };

  return (
    <section>
      Login
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>
          Email:
          <input
            type='text'
            name='email'
            value={user.email ?? ''}
            placeholder='email@email.com'
            required
            onChange={handleChange}
          />
        </label>
        <label htmlFor=''>
          Password
          <input
            type='password'
            name='password'
            value={user.password ?? ''}
            placeholder='password'
            required
            onChange={handleChange}
          />
        </label>
        <button>login</button>
      </form>
    </section>
  );
}
