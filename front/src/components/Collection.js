import React, {useContext, useState} from 'react';
import {Col, Card, Image} from 'react-bootstrap'
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {CreateCollection} from "./modals/CreateCollection";

export const Collection = ({collection,md,xs,lg,sm}) => {
    const [changeColVisible,setChangeColVisible]=useState(false)
    const history=useHistory()
    const {token,setAlert,userId,userRole}=useContext(AuthContext)
    const {request} =useHttp()
    const delHandler = async () => {
        try {
            const data = await request('/api/col/delCol', 'DELETE', { id:collection.id },{
                Authorization:`Bearer ${token}`
            })
            setAlert(data.message)
        } catch (e) {setAlert(e.message)}
    }
    return (
        <Col md={md} lg={lg} sm={sm} xs={xs}  className="mt-3 mx-3" >
            <Card style={{width:150,cursor:'pointer'}} border={"light"}>
                <div className="imgCont">
                    {userId===collection.userId||userRole==="ADMIN"? <div>
                        <div onClick={delHandler} className="remove">&times;</div>
                    <div onClick={()=>setChangeColVisible(true)} className="edit">&#x270E;</div>
                        </div>
                    :<div></div>
                    }
                <Image onClick={()=>history.push('/Collection/'+collection.id)} width={150} height={150} src={collection.img||'/empty.png'} roundedCircle/>
                </div>
                <div className="text-center">
                <div>{collection.title}</div>
                    <div>{collection.category}</div>
                </div>
            </Card>
            <CreateCollection show={changeColVisible} onHide={()=>setChangeColVisible(false)} path='/changeCol' type='change' id={collection.id}/>
        </Col>
    );
};

