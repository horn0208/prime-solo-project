import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import './AddComment.css';
// MUI style imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


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
        <div className='add-container'>
            <div>
                <Typography className='title' variant='h5'>New Observation for <br /> {name}</Typography>
            </div>
            <label>
                <Typography variant='body2'>
                    When did you go? 
                </Typography>
            </label>
            <input className='date-picker'
                value={date}
                onChange={(event)=>setDate(event.target.value)}
                type="date" />
            <TextField 
                variant='outlined'
                margin='normal'
                fullWidth
                multiline
                rows={6}
                label='How was it?'
                value={comment} 
                onChange={(event)=>setComment(event.target.value)} 
                type="text" >
            </TextField>
            <br />
            <div className='add-btn-box'>
                <Button className='add-btn'
                    variant='contained'
                    onClick={submitComment}>
                    Submit
                </Button>
                <Button className='add-btn'
                    variant='contained' 
                    onClick={()=>{history.goBack()}}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default AddComment;