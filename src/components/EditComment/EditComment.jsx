import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
// MUI style imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function EditComment(){

    // get original comment data from store/reducers
    const myComment = useSelector(store => store.comment);

    // hold input values in local state. Defaults = original comment info
    const [ date, setDate ] = useState(myComment.date);
    const [comment, setComment] = useState(myComment.comment);

    const dispatch = useDispatch();
    const history = useHistory();

    const updateComment =()=>{
        // validate inputs:
        if(date!=='' && comment!=='') {
            // dispatch comment to saga (and history)
            dispatch({
                type: 'UPDATE_COMMENT',
                payload: {
                    date: date,
                    comment: comment,
                    comment_id: myComment.id,
                    user_id: myComment.user_id,
                    area_id: myComment.area_id,
                    area: myComment.area,
                    history: history
                }
            });
            // reset inputs
            setDate('');
            setComment('');
            // go back to Area Details view (do this in saga instead?)
            // history.push(`/area/${myComment.area}/${myComment.area_id}`)
        } else {
            alert('Please fill out all fields before submitting');
        }
    }
     
    return(
        <div className='mega-container'>
            <Typography className='title' variant='h5'>Edit Observation for <br /> {myComment.area} </Typography>
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
                type="text">
            </TextField>
            <br />
            <div className='add-btn-box'>
                <Button
                    className='add-btn'
                    variant='contained'
                    onClick={updateComment}>
                    Update
                </Button>
                <Button
                    className='add-btn'
                    variant='contained' 
                    onClick={()=>{history.goBack()}}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default EditComment;