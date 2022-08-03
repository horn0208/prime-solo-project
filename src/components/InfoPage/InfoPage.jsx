import React from 'react';
import Typography from '@mui/material/Typography';
import image from './palisade2.jpeg';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="areas-container">
      <Typography variant='h6'>
        WRDR was built with: <br /> 
        </Typography>
        <Typography variant='body2'>
        React, Redux, Redux-Saga, Express, Node.js, PostgreSQL, 
        Material UI, and The National Weather Service API (https://api.weather.gov);
      </Typography>
      <br />
      <img src={image} alt="" />
    </div>
  );
}

export default InfoPage;
