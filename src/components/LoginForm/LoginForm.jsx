import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
// MUI style imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Typography variant='h5'>Login</Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
            margin='normal'
            size="small"
            type="text"
            label='Username'
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}>
          </TextField>
        </label>
      </div>
      <div>
        <label htmlFor="password">
        <TextField
            margin='normal'
            size="small"
            type="password"
            label='Password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}>
            </TextField>
          
        </label>
      </div>
      <div>
        <Button className='loginBtn' variant='contained' type="submit" value="Log In" >Log In</Button>
      </div>
    </form>
  );
}

export default LoginForm;
