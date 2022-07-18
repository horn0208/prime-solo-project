import React from 'react';
import './AboutPage.css';
import Typography from '@mui/material/Typography';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="mega-container">
        <Typography variant='h5'>Is The Rock Wet?</Typography>
        
      <div className='info'>
        <p>For rock climbers, it’s hard to figure out whether the rock 
          in an area is likely to be dry and safe to climb without driving 
          there, often several hours away, to check. Even worse, sometimes 
          unknown factors can ruin your day when you arrive unprepared, like 
          breaking trail through waist-deep snow on the hike in, a sudden hatch of 
          biting flies, or finding that falcons are nesting on the route you 
          planned to climb.
          <br />
          <br />
          WRDR gives climbers an easy way to check weather conditions and recent 
          rainfall where they hope to climb, as well as a place to share and view 
          other climbers’ recent experiences so there are fewer unknowns before 
          committing to that long drive.
          <br />
          <br />
        </p>
      </div>
      <Typography variant='button'>Conditions are weird. <br /> You should get WRDR.</Typography>
    </div>
  );
}

export default AboutPage;
