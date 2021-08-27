import React from 'react';
import {Spinner,Badge} from "react-bootstrap";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

export const Tags = ({tags}) => {
    const history=useHistory()
    if(!!!tags)
        return(<Spinner animation={"border"}/>)
    return( <div className="my-3 text-center" >
            {Object.values(tags).map(tag=>
                <Badge key={tag.text} bg="dark" className="mx-1 pointer" href="/myCol" onClick={()=>history.push('/Search/'+tag.text)}>{tag.text}</Badge>
            )}
        </div>
    );
};
