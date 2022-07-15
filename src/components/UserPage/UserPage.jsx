import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function UserPage() {
  // this component is the user welcome page and climbing area list view
  const user = useSelector((store) => store.user);
  const areas = useSelector((store)=> store.areas);
  const dispatch = useDispatch();
  const history = useHistory();

  // on page load, fetch all areas
  useEffect(()=>{
    dispatch({type: 'FETCH_ALL_AREAS'});
  }, []);

  const seeDetails =(areaID, areaName)=>{
    history.push(`/area/${areaName}/${areaID}`)
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <h3>Where do you want to climb?</h3>
      {/* <p>Your ID is: {user.id}</p> */}
       {/* map over areas and display */}
      <div>
        {areas.map(each =>{
          return (
            <div key={each.id} onClick={()=>seeDetails(each.id, each.area)}>
              <p>{each.area}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
