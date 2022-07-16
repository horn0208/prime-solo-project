import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

function AddComment(){
    // hook for area name
    const [ name, setName ] = useState( 'Area Name' );
    // hooks for inputs
    const [ date, setDate ] = useState( '' );
    const [ comment, setComment] = useState( '' );

    const dispatch = useDispatch();
    const history = useHistory();

     // to use the area id and name from url path:
     const params = useParams();
     const areaID = params.id;
     const areaName = params.name;

     useEffect(()=>{
         // set and display current area name from params
         setName(areaName);
     })

     const submitComment =()=>{
        // validate inputs:
        if(date!=='' && comment!=='') {
            // dispatch comment to saga
            dispatch({
                type: 'POST_COMMENT',
                payload: {
                    date: date,
                    comment: comment,
                    area_id: Number(areaID)
                }
            });
            // reset inputs
            setDate('');
            setComment('');
            // go back to Area Details view
            history.push(`/area/${areaName}/${areaID}`);
        } else {
            alert('Please fill out all fields before submitting');
        }
     }
     
    return(
        <div>
            <div>
                <h2>New Observation: {name}</h2>
            </div>
            <label>When did you go? </label>
            <input value={date}
                onChange={(event)=>setDate(event.target.value)}
                type="date" />
            <input value={comment} 
                onChange={(event)=>setComment(event.target.value)} 
                type="text" 
                placeholder="How was it?"/>
                <button onClick={submitComment}>Submit</button>
                <br />
                <button onClick={()=>{history.goBack()}}>Cancel</button>
        </div>

    );
}

export default AddComment;