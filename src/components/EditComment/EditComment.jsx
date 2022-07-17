import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function EditComment(){

    // get original comment data from store/reducers
    const myComment = useSelector(store => store.comment);

    // hold input values in local state. Defaults = original comment info
    const [ date, setDate ] = useState(myComment.date);
    const [comment, setComment] = useState(myComment.comment);

    const updateComment =()=>{
        // validate inputs:
        if(date!=='' && comment!=='') {
            // dispatch comment to saga
            
        }
    }
     
    return(
        <div>
            <h2>{myComment.area}</h2>
            <h3>Edit Observation</h3>
            <label>When did you go? </label>
            <input value={date}
                onChange={(event)=>setDate(event.target.value)}
                type="date" />
            <input value={comment} 
                onChange={(event)=>setComment(event.target.value)} 
                type="text" 
                placeholder="How was it?"/>
                <button onClick={updateComment}>Update</button>
                <br />
                <button onClick={()=>{history.goBack()}}>Cancel</button>
        </div>
    );
}

export default EditComment;