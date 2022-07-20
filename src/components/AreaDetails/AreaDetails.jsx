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
    const forecastData = useSelector((store) => store.forecast);
    const observed = useSelector((store) => store.observed);

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
            <div className='area-name'>
                <Typography variant='h5'>{name}</Typography>
            </div>
            
            {/* Conditional rendering to display FORECAST only when data is back from API */}  
            {forecastData.length === 0 ? (
                <p>loading forecast</p>
            ) : (
                <div>
                    {/* weather API results */}
                    <Typography variant='body1'>{forecastData.periods[0].name}</Typography>
                    <img src={forecastData.periods[0].icon} alt="today icon"/>
                    <Typography variant='body2'>{forecastData.periods[0].detailedForecast}</Typography>
                </div>
            )}

            {/* Only display OBSERVED weather info when data is back from API */}
            {observed.length === 0 ? (
                <div>
                    <p>loading observed weather</p>
                </div>
            ) : (
                <div>
                    {/* if humidity value is null, show "not measured" */}
                    <Typography variant='body2'>% Humidity: {
                        !(observed.relativeHumidity.value) ?
                        <Typography component={'span'} variant='body2'>not measured</Typography>
                        :
                        Math.round(observed.relativeHumidity.value)
                    }
                    </Typography>

                    {/* if precip last 6 hours is null, show "none" */}
                    <Typography variant='body2'>Precip past 6hrs: {
                        !(observed.precipitationLast6Hours.value) ?
                        <Typography component={'span'} variant='body2'>none</Typography>
                        :
                        observed.precipitationLast6Hours.value   
                    }
                    </Typography>
                </div>
            )}

            {/* Comments */}
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