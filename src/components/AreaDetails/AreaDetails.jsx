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
     
    return(
        <div>
            <div>
                <h2>{name}</h2>
            </div>
            <div>
                {comments.map(each =>{
                    return(
                        <div key={each.id}>
                            <p>{each.username}</p>
                            <p>{each.date}</p>
                            <p>{each.comment}</p>
                            {/* if user id of comment matches id of logged in user,
                            render edit + delete btns */}
                                {
                                    user.id === each.user_id?
                                    <div>
                                        <button>Edit</button>
                                        <button>Delete</button>
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