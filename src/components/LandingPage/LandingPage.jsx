import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
// MUI style imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Wet Rock Dry Rock');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <div>
      <h1 className='welcome-logo'>{heading}</h1>
        <div className='welcome-txt'>
          <Typography variant='button'>
            Conditions are weird.<br/>You should get WRDR.
          </Typography>
        </div>
        <div>
          <RegisterForm />

          <center>
            <Typography variant='body1'>Already a Member?</Typography>
            <br />
            <Button variant='contained' onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
