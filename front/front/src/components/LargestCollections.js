import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Row, Spinner} from 'react-bootstrap'
import {useHttp} from "../hooks/http.hook";
import {Collection} from "./Collection";
import {AuthContext} from "../context/AuthContext";

export const LargestCollections = () => {
    const {request}= useHttp()
    const {alert}=useContext(AuthContext)
    const [collections,setCollections]=useState()
    const fetchCollections =useCallback (async ()=> {
        const data = await request('/api/col/getLargestCols', 'GET', null);
        await setCollections(data)
    },[request])
    useEffect(()=>{
        fetchCollections()
    },[alert])

    if(!!!collections)
        return(<Spinner animation={"border"}/>)
    return( <Row className="d-flex" >
            {Object.values(collections).map(collection=>
                <Collection key={collection.id} collection={collection}/>
            )}
        </Row>
    );
}
