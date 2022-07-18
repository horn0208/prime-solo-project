import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
// MUI style imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <div>
        <div className='welcome-txt'>
          <Typography variant='h5'>{heading}</Typography>
          <Typography variant='body1'>
            Log in or register to see and share about conditions at the climbing areas!
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
