import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useCountries } from 'use-react-countries';
import { useNavigate } from 'react-router-dom';
import { editUser, getUser, register } from '../api/authClient';
import styles from '../styles/profile/profile.module.css';

import useAuth from '../hooks/useAuth';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    fullName: '',
    country: '',
    countryUrl: '',
  });
  const [pwd, setPwd] = useState({
    currentPwd: '',
    password: '',
    confirmPwd: '',
  });
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [msg, setMsg] = useState();
  // console.log(userData);
  const { user, setVerified } = useAuthContext();
  const { countries } = useCountries();
  // const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [pwdError, setPwdError] = useState(null);
  // const [selected, setSelected] = useState(false);
  // console.log(user);

  const {
    userQuery: { isLoading, err, data: userData },
    updateUser,
  } = useAuth(user.email);
  // const {email, fullName, nickname, country} = userData;
  // console.log(userData);
  // console.log(email);

  // useEffect(()=>{
  // 	setUserInfo({email, fullName, nickname,country})
  // }, [])

  // const {email, fullName, nickname, country} = getUser(user.email);
  // 	setUserInfo({
  // 		email, fullName, nickname, country
  // 	})

  // const userData = getUser(user.email);

  useEffect(() => {
    if (userData) {
      console.log(userData.country);
      setUserInfo((info) => ({
        ...info,
        email: userData.email || info.email,
        nickname: userData.nickname || info.nickname,
        fullName: userData.fullName || info.fullName,
        country: userData.country || info.country,
        countryUrl: userData.countryUrl || info.countryUrl,
      }));
    }
  }, [userData]);

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
  const handlePwd = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPwd((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userInfo);
    // console.log(userInfo);
    const res = await updateUser.mutateAsync({ email: user.email, userInfo });
    console.log(res);
    if (!res.error) {
      setError(null);
      setVerified(true);
      // navigate('/');
      setMsg('User information has been modified.');
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    } else {
      setError(res.message);
    }
    // navigate(`/`);
  };

  const submitPwd = async (e) => {
    e.preventDefault();
    const res = await updateUser.mutateAsync({ email: user.email, pwd });
    if (!res.error) {
      setError(null);
      setVerified(true);
      // navigate('/');
      setPwdError('Password has been modified.');
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    } else {
      setPwdError(res.message);
    }
  };
  const checkPwd = () => {
    if (pwd.password !== pwd.confirmPwd) {
      setPwdError('Password & Confirm Password do not match.');
      console.log(pwd);
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
      setPwdError(null);
    }
  };

  return (
    <section className={styles.profile}>
      <form className={styles.form1} onSubmit={handleSubmit}>
        <label htmlFor=''>
          Email
          <input
            className={styles.input}
            type='text'
            name='email'
            // value=''
            value={userInfo.email ?? ''}
            placeholder='email@email.com'
            required
            onChange={handleChange}
            disabled={true}
          />
        </label>

        <div className={styles.info}>
          <label htmlFor=''>
            Nickname
            <input
              className={styles.input}
              type='text'
              name='nickname'
              // value={userInfo.nickname ? userInfo.nickname : userData?.nickname}
              value={userInfo.nickname ?? ''}
              placeholder='nickname'
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor=''>
            Full Name
            <input
              className={styles.input}
              type='text'
              name='fullName'
              // value={userInfo.fullName ? userInfo.fullName : userData?.fullName}
              value={userInfo.fullName ?? ''}
              placeholder='nickname'
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor=''>Country</label>
          <select
            className={styles.input}
            name='countries'
            id=''
            onChange={handleChange}>
            <option key={userInfo.country ?? ''} value=''>
              {/* {userInfo.country ? userInfo.country : userData.country} */}
              --Please choose your country
            </option>
            {countries.map(({ name, flags, area }) => (
              <option
                key={name}
                value={JSON.stringify({ name, countryUrl: flags.png })}
                selected={name === userInfo.country ? true : false}>
                {name}
              </option>
            ))}
          </select>

          <button
          className={styles.btn}>Change</button>
          {error && <p>{Array.isArray(error) ? error[0] : error}</p>}
          {msg && <p>{msg}</p>}
        </div>
      </form>
      <form action='' onSubmit={submitPwd}>
        <label htmlFor=''>
          Current Password
          <input
            className={styles.input}
            type='password'
            name='currentPwd'
            value={pwd.currentPwd ?? ''}
            placeholder='Current password'
            required
            onChange={handlePwd}
          />
        </label>
        <label htmlFor=''>
          New Password
          <input
            className={styles.input}
            type='password'
            name='password'
            value={pwd.password ?? ''}
            placeholder='password'
            required
            onChange={handlePwd}
            onBlur={checkPwd}
          />
        </label>
        <label htmlFor=''>
          Confirm New Password
          <input
            className={styles.input}
            type='password'
            name='confirmPwd'
            value={pwd.confirmPwd ?? ''}
            placeholder='Confirm password'
            required
            onChange={handlePwd}
            onBlur={checkPwd}
          />
        </label>
        <button 
        className={styles.btn}
        disabled={disabledBtn}>Change Change</button>
        {pwdError && <p>{Array.isArray(pwdError) ? pwdError[0] : pwdError}</p>}
      </form>
    </section>
  );
}
