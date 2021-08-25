import React, {useContext, useState} from 'react'
import {Button} from 'react-bootstrap';
import {CollectionList} from "../components/CollectionList";
import {CreateCollection} from "../components/modals/CreateCollection";
import {Alert} from "../components/Alert";
import {AuthContext} from "../context/AuthContext";


export const MyCollectionsPage =()=>{
    const {alert}=useContext(AuthContext)
    const [addColVisible,setAddColVisible]=useState(false)
    return(
        <div><Alert message={alert}/>
            <Button variant="outline-dark" className="m-3" onClick={()=>setAddColVisible(true)}>add collection</Button>
            <CreateCollection show={addColVisible} onHide={()=>setAddColVisible(false)} path='/addCol' type='Add'/>
            <CollectionList md={2} lg={2} sm={3} xs={5}/>
        </div>
    )
}