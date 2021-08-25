import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Row, Spinner} from 'react-bootstrap'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useParams} from "react-router-dom";
import {Item} from "./Item";

export const ItemList = () => {
    const {id} =useParams()
    const {alert}=useContext(AuthContext)
    const [items,setItems]=useState()
    const {request}= useHttp()
    const fetchItems =useCallback (async ()=> {
        const data = await request('/api/item/getItems?id='+id, 'GET', null);
        await setItems(data)
    },[request,id])
    useEffect(()=>{
        fetchItems()
    },[alert,fetchItems])
    if(!!!items)
        return(<Spinner animation={"border"}/>)
    return( <Row className="d-flex" >
            {Object.values(items).map(item=>
                <Item key={item.id} item={item}/>
            )}
        </Row>
    );
}