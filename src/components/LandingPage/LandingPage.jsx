import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
// MUI style imports
import Button from '@mui/material/Button';

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
      <h2>{heading}</h2>

      <div>
        <div>
          <p>
            Log in or register to see and share about conditions at the climbing areas!
          </p>
        </div>
        <div>
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
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
