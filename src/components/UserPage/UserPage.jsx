import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './UserPage.css';
//MUI style imports
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


function UserPage() {
  // this component is the user welcome page and climbing area list view
  const user = useSelector((store) => store.user);
  const areas = useSelector((store)=> store.areas);
  const dispatch = useDispatch();
  const history = useHistory();

  // on page load, fetch all areas
  useEffect(()=>{
    dispatch({type: 'FETCH_ALL_AREAS'});
    // and clear forecast and observed weather reducers
    dispatch({type: 'SET_FORECAST', payload: []});
    dispatch({type: 'SET_OBSERVED', payload: []});
  }, []);

  // go to Area Details view
  const seeDetails =(areaID, areaName)=>{
    history.push(`/area/${areaName}/${areaID}`);
  }
  
  return (
    <div className="areas-container">
      <Typography variant='h5'>Welcome, {user.username}!</Typography>
      <Typography className='where-climb' variant='body1'>Where do you want to climb?</Typography>
       {/* map over areas and display */}
      <Stack 
        justifyContent="flex-start"
        spacing={1.5}>
        {areas.map(each =>{
          return (
            <div className='area-li' key={each.id} onClick={()=>seeDetails(each.id, each.area)}>
              <Typography variant='button'>{each.area}</Typography>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
