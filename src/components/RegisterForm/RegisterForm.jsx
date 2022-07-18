import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//MUI style imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <Typography variant='h6'>Register User</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <TextField
            margin='dense'
            size="small"
            type="text"
            label='Username'
            value={username}
            required
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
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}>
          </TextField>
        </label>
      </div>
      <div>
        <Button variant='contained' type="submit" value="Register" >Register</Button>
        {/* <input className="btn" type="submit" name="submit" value="Register" /> */}
      </div>
    </form>
  );
}

export default RegisterForm;
