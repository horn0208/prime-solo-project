import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import './AreaDetails.css';
//MUI style imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function AreaDetails(){
    // this component shows the name, comments, and weather for selected area

    const [name, setName] = useState('Area Name');

    const dispatch = useDispatch();
    const history = useHistory();

    // to use the id and name from url path:
    const params = useParams();
    const areaID = params.id;
    const areaName = params.name;
    
    const comments = useSelector((store) => store.comments);
    const user = useSelector((store) => store.user);

    useEffect(()=>{
        // set and display current area name from params
        setName(areaName);
        // send area id to saga to get comments
        dispatch({type: 'FETCH_COMMENTS', payload: Number(areaID)});
        // send area id to saga to get weather from API
        dispatch({type: 'FETCH_FORECAST', payload: Number(areaID)});
    }, [areaID]);

    const addComment =()=>{
        history.push(`/add-comment/${areaName}/${areaID}`);
    }

    const deleteComment =(commentID)=>{
        dispatch({type: 'DELETE_COMMENT', payload: {
            comment_id: commentID,
            area_id: Number(areaID),
            }
        });
    }

    const editComment =(commentID)=>{
        // send comment ID to saga to get comment data
        // also passing history to do history.push in saga to prevent race condition
        dispatch({type: 'FETCH_MY_COMMENT', payload: {
            comment_id: commentID,
            history: history
            }
        });
    }
     
    return(
        <div className='mega-container'>
            <div>
                <div className='area-name'>
                    <Typography variant='h5'>{name}</Typography>
                </div>
                <p>Weather API info will go here</p>
                <br />
            </div>
            <div className='add-btn'>
                <Button variant='contained' onClick={addComment}>Add Comment</Button>
            </div>
            <Stack
                justifyContent="flex-start"
                spacing={1.5}>
                {comments.map(comment =>{
                    return(
                        <div className='comment-li' key={comment.id}>
                            <div className='comment-txt'>
                                <Typography variant='body1'>{comment.date} | {comment.username}</Typography>
                                <Typography variant='body2'>{comment.comment}</Typography>
                            </div>
                            {/* if user id of comment matches id of logged in user,
                            render edit + delete btns */}
                                {
                                    user.id === comment.user_id?
                                    <div className='btn-box'>
                                        <IconButton 
                                            aria-label='edit'
                                            color='primary'
                                            onClick={()=>editComment(comment.id)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton 
                                            aria-label='delete'
                                            color='primary'
                                            onClick={()=>deleteComment(comment.id)}>
                                            <DeleteForeverIcon/>
                                        </IconButton>
                                    </div>
                                    :
                                    <div className='btn-box'></div>
                                }
                        </div>
                    );
                })}
            </Stack>
        </div>
    );
}

export default AreaDetails;