import React, { useEffect, useState } from 'react';
import styles from '../styles/register.module.css';
import { useCountries } from 'use-react-countries';
import { register, sendOTP, verifyOTP } from '../api/authClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [userInfo, setUserInfo] = useState({});
  const [code, setCode] = useState('');
  const [disabledEmail, setDisabledEmail] = useState(false);
  const [verified, setVerified] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);

  const { countries } = useCountries();

  // useEffect(()=>{
  // 	setVerified(false);
  // 	setSentEmail(false);
  // }, [])
	const navigate = useNavigate();

  countries.sort(function (comp1, comp2) {
    let comp1UC = comp1.name.toUpperCase();
    let comp2UC = comp2.name.toUpperCase();
    if (comp1UC < comp2UC) {
      return -1;
    } else if (comp1UC > comp2UC) {
      return 1;
    }
    return 0;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'countries') {
      const values = JSON.parse(value);
      setUserInfo((info) => ({
        ...info,
        country: values.name,
        countryUrl: values.countryUrl,
      }));
    } else {
      setUserInfo((info) => ({ ...info, [name]: value }));
    }

    // console.log(userInfo);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userInfo);
		
		const res = await register(userInfo);
		if(!res.error){
			navigate('/');
		}
			// navigate(`/`);
		
		
  };
  const sendCode = async  (e) => {
    console.log('send cdoe');
    const res = await sendOTP(userInfo.email);
		if(!res.error){
			setSentEmail(res);
			setDisabledEmail(true);
		}
    
  };
  const handleCode = (e) => {
    setCode(e.target.value);
  };
  const verifyCode = async (e) => {
		const res = await verifyOTP(userInfo.email, code);
		console.log(res);
		if(!res.error){
			setVerified(res);
		}
    
  };

  return (
    <section>
      Register
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>
          Email:
          <input
            type='text'
            name='email'
            value={userInfo.email ?? ''}
            placeholder='email@email.com'
            required
            onChange={handleChange}
            disabled={disabledEmail}
          />
        </label>
        <p className={styles.sendCode} onClick={sendCode}>
          Send Verification Code
        </p>

        <div className={`${sentEmail? styles.visible: styles.unvisible}`}>
          <label htmlFor=''>
            Verification Code:
            <input
              type='text'
              name='OTP'
              value={code}
              placeholder='6 digits'
              required
              onChange={handleCode}
            />
          </label>
          <p className={styles.verify} onClick={verifyCode}>
            Verify Code
          </p>
        </div>
        <div className={verified ? styles.visible : styles.unvisible}>
          <label htmlFor=''>
            Password
            <input
              type='password'
              name='password'
              value={userInfo.password ?? ''}
              placeholder='password'
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor=''>
            Nickname
            <input
              type='text'
              name='nickname'
              value={userInfo.nickname ?? ''}
              placeholder='nickname'
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor=''>
            Full Name
            <input
              type='text'
              name='fullName'
              value={userInfo.fullName ?? ''}
              placeholder='nickname'
              required
              onChange={handleChange}
            />
          </label>

          <select name='countries' id='' onChange={handleChange}>
            <option key='00' value=''>
              --Please choose your country
            </option>
            {countries.map(({ name, flags, area }) => (
              <option
                key={name}
                value={JSON.stringify({ name, countryUrl: flags.png })}>
                {name}
              </option>
            ))}
          </select>
          <button>submit</button>
        </div>
      </form>
    </section>
  );
}
