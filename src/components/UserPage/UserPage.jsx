import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';

function UserPage() {
  // this component is the user welcome page and climbing area list view
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: 'FETCH_ALL_AREAS'});
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Where do you want to climb?</p>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* <LogOutButton className="btn" /> */}

      {/* map over areas and display */}

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
