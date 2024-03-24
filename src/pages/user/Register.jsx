import React, { useEffect, useState } from 'react';
import styles from '../../styles/register/register.module.css';
import { useCountries } from 'use-react-countries';
import { register, sendOTP, verifyOTP } from '../../api/authClient';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useOutletContext } from 'react-router-dom';
import { TextField } from '@mui/material';

export default function Register() {
  const [userInfo, setUserInfo] = useState({});
  const [code, setCode] = useState('');
  const [disabledEmail, setDisabledEmail] = useState(false);
  const [tokenPassed, settokenPassed] = useState(true); // false
  const [sentEmail, setSentEmail] = useState(true); //false
  const [error, setError] = useState(null);
  const { setVerified, setUserVerified } = useAuthContext();
  const [codeError, setCodeError] = useState(false);
  const [disabledCode, setDisabledCode] = useState(false);
  const [emailError, setEmailError] = useState(null);

  // const [setVerified] = useOutletContext();

  const { countries } = useCountries();

  // useEffect(()=>{
  // 	settokenPassed(false);
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
  // console.log(countries);
  


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
    console.log(JSON.stringify({name: userInfo.country, countryUrl: userInfo.countryUrl}));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userInfo);

    const res = await register(userInfo);
    if (!res.error) {
      setUserVerified();
      setError(null);
      setVerified(true);
      navigate('/');
    } else {
      setError(res.message);
    }
    // navigate(`/`);
  };
  const sendCode = async (e) => {
    console.log('send cdoe');
    // console.log(userInfo.email);
    const res = await sendOTP(userInfo.email);
    if (!res.error) {
      setSentEmail(res);
      setDisabledEmail(true);
      setEmailError(null);
    } else {
      setEmailError(res.message);
    }
  };
  const handleCode = (e) => {
    setCode(e.target.value);
  };
  const verifyCode = async (e) => {
    const res = await verifyOTP(userInfo.email, code);
    console.log(res);
    if (!res.error) {
      settokenPassed(res);
      setCodeError(false);
      setDisabledCode(true);
    } else {
      setCodeError(true);
    }
  };
  const checkPwd = () => {
    if (userInfo.password !== userInfo.confirmPwd) {
      setError('Password & Confirm Password do not match.');
      console.log(userInfo);
    } else {
      setError(null);
    }
  };

  return (
    <section className={styles.register}>
      <h2>Register</h2>
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
          <span className={styles.emailErrMsg}>{emailError}</span>
        </p>

        <div className={`${sentEmail ? styles.visible : styles.unvisible}`}>
          <label htmlFor=''>
            Verification Code:
            <input
              type='text'
              name='OTP'
              value={code}
              placeholder='6 digits'
              required
              onChange={handleCode}
              disabled={disabledCode}
            />
          </label>
          <p className={styles.verify} onClick={verifyCode}>
            Verify Code{' '}
            <span className={styles.codeErrMsg}>
              {codeError ? 'Code is not correct' : ''}
            </span>
          </p>
        </div>
        <div
          // className={`${styles.addtional} ${
          //   tokenPassed ? styles.visible : styles.unvisible
          // }`}>
          className={tokenPassed ? styles.visible : styles.unvisible}>
          {/* <TextField
            required
            id='outlined-password-input'
            label='Password'
            variant='outlined'
            type='password'
            name='password'
            value={userInfo.password ?? ''}
            placeholder='password'
            onChange={handleChange}
            onBlur={checkPwd}
          /> */}

          <label htmlFor=''>
            Password
            <input
              type='password'
              name='password'
              value={userInfo.password ?? ''}
              placeholder='password'
              required
              autoComplete='new-password'
              onChange={handleChange}
              onBlur={checkPwd}
            />
          </label>
          <label htmlFor=''>
            Confirm Password
            <input
              type='password'
              name='confirmPwd'
              autoComplete='new-password'
              value={userInfo.confirmPwd ?? ''}
              placeholder='Confirm password'
              required
              onChange={handleChange}
              onBlur={checkPwd}
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
          <FormControl fullWidth>
            <InputLabel id='countries-label'>Choose your country</InputLabel>
            <Select
              name='countries'
              id=''
              label='Choose your country'
              value={userInfo.country ? JSON.stringify({name: userInfo.country, countryUrl: userInfo.countryUrl}) : ''}
              onChange={handleChange}>
              
              {countries.map(({ name, flags }) => (
                <MenuItem
                  key={name}
                  value={JSON.stringify({ name, countryUrl: flags.png })}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <label>
            Country
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
          </label> */}
          {error && <p>{Array.isArray(error) ? error[0] : error}</p>}
          <button className={styles.btn}>Register</button>
        </div>
      </form>
    </section>
  );
}
