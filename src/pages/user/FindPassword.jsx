import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../../styles/profile/findpassword.module.css';
import Button from '@mui/material/Button';
import { changePwd, sendOTP, verifyOTP } from '../../api/authClient';

export default function FindPassword() {
  const [user, setUser] = useState({});
  const [emailValid, setEmailValid] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [codeError, setCodeError] = useState();
  const [pwdError, setPwdError] = useState();
  const [pwdErr, setPwdErr] = useState(false);
  const [message, setMessage] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((user) => {
      return { ...user, [name]: value };
    });
    
  };

  const sendCode = async (e) => {
    console.log('send cdoe');
    // console.log(userInfo.email);
    const res = await sendOTP(user.email, true);
    if (!res.error) {
      setEmailValid(res);
      setEmailError(null);
    } else {
      setEmailError(res.message);
    }
  };
  const verifyCode = async (e) => {
    const res = await verifyOTP(user.email, user.code);
    console.log(res);
    if (!res.error) {
      // settokenPassed(res);
      setCodeValid(true);
      setCodeError(false);
      // setDisabledCode(true);
    } else {
      setCodeError(res.message);
    }
  };
  const checkPwd = () => {
    if (user.password !== user.confirmPwd) {
      setPwdError('Passwords do not match.');
      console.log(user);
      setPwdErr(true);
    } else {
      setPwdError(null);
      setPwdErr(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await changePwd(user);
    if (!res.error) {
      console.log('changed');
    } else {
      setMessage(res.message);
    }
  };

  return (
    <form className={styles.findPwdForm}>
      
        <TextField
          margin='normal'
          fullWidth
          sx={{ display: 'block', mx: 'auto', width: 400 }}
          required
          id='standard-required'
          label='Email'
          variant='filled'
          name='email'
          value={user.email ?? ''}
          onChange={handleChange}
          disabled={emailValid}
        />
        <Button
          sx={{ display: 'block' }}
          variant='outlined'
          size='small'
          onClick={sendCode}>
          Send Verification Code
        </Button>

        <TextField
          margin='normal'
          fullWidth
          sx={{
            display: `${emailValid ? 'block' : 'none'}`,
            mx: 'auto',
            width: 400,
          }}
          required
          // id='standard-required'
          label='Code'
          variant='filled'
          name='code'
          value={user.code ?? ''}
          onChange={handleChange}
        />
        <Button
          sx={{ display: `${emailValid ? 'block' : 'none'}` }}
          variant='outlined'
          size='small'
          onClick={verifyCode}>
          Verify Code
        </Button>

        <TextField
          // {`${pwdErr? error: none}`}
          error={pwdErr}
          fullWidth
          margin='normal'
          sx={{
            display: `${codeValid ? 'block' : 'none'}`,
            mx: 'auto',
            width: 400,
          }}
          required
					autoComplete="new-password" 
          // id='filled-error'
          label='Password'
          variant='filled'
          type='password'
          name='password'
          value={user.password ?? ''}
          onChange={handleChange}
          onBlur={checkPwd}
        />
        <TextField
          fullWidth
          error={pwdErr}
          margin='normal'
          sx={{
            display: `${codeValid ? 'block' : 'none'}`,
            mx: 'auto',
            width: 400,
          }}
          required
					autoComplete="new-password" 
          id='filled-error-helper-text'
          label='Confirm Password'
          variant='filled'
          type='password'
          name='confirmPwd'
          value={user.confirmPwd ?? ''}
          onChange={handleChange}
          onBlur={checkPwd}
          helperText={pwdError}
        />
        <Button
          sx={{ display: `${codeValid ? 'block' : 'none'}` }}
          variant='contained'
          size='small'
          disabled={pwdErr}
          onClick={handleSubmit}>
          Change Password
        </Button>
      
    </form>
  );
}
