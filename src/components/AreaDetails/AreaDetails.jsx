import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

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
        // STRETCH send area id to saga to get weather

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
        <div>
            <div>
                <h2>{name}</h2>
            </div>
            <div>
                <button onClick={addComment}>Add Comment</button>
            </div>
            <div>
                {comments.map(comment =>{
                    return(
                        <div key={comment.id}>
                            <p>{comment.username}</p>
                            <p>{comment.date}</p>
                            <p>{comment.comment}</p>
                            {/* if user id of comment matches id of logged in user,
                            render edit + delete btns */}
                                {
                                    user.id === comment.user_id?
                                    <div>
                                        <button onClick={()=>editComment(comment.id)}>Edit</button>
                                        <button onClick={()=>deleteComment(comment.id)}>Delete</button>
                                    </div>
                                    :
                                        <div></div>
                                }
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AreaDetails;