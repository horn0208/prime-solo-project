import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

function AreaDetails(){
    
    const [name, setName] = useState('Area Name');

    const dispatch = useDispatch();
    const history = useHistory();
    // to use the id from url path:
    const params = useParams();
    const areaID = params.id;
    const areaName = params.name;

    useEffect(()=>{
        setName(areaName);
    }, [areaID]);
     
    return(
        <div>
            <h2>{name}</h2>
        </div>
    );
}

export default AreaDetails;