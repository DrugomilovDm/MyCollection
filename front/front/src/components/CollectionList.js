import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Row, Spinner} from 'react-bootstrap'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Collection} from "./Collection";

 export const CollectionList = ({md,xs,lg,sm}) => {
     const {token,alert}=useContext(AuthContext)
     const {request}= useHttp()
     const [myCollections,setMyCollections]=useState()
    const fetchCollections =useCallback (async ()=> {
        const data = await request('/api/col/getMyCol', 'GET', null,{Authorization:`Bearer ${token}`});
        await setMyCollections(data)
    },[request,token])
    useEffect(()=>{
        fetchCollections()
    },[alert,fetchCollections])

     if(!!!myCollections)
         return(<Spinner animation={"border"}/>)
       return( <Row >
           {Object.values(myCollections).map(collection=>
           <Collection key={collection.id} collection={collection} md={md} xs={xs} lg={lg} sm={sm}/>
           )}
       </Row>
    );
}
