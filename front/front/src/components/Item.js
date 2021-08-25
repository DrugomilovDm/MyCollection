import React, {useContext, useState} from 'react';
import {Col,Card,Image}from 'react-bootstrap'
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {CreateItem} from "./modals/CreateItem";

export const Item = ({item}) => {
    const [changeItemVisible,setChangeItemVisible]=useState(false)
    const {userId,token,setAlert }=useContext(AuthContext)
    const {request}=useHttp()
    const history=useHistory()
    const delHandler = async () => {
        try {
            const data = await request('/api/item/delItem', 'DELETE', { id:item.id },{
                Authorization:`Bearer ${token}`
            })
            setAlert(data.message)
        } catch (e) {setAlert(e.message)}
    }
    return (
        <Col md={3} lg={2} sm={5} xl={2} xs={5} className="mt-3 mx-3" >
            <Card style={{width:150,cursor:'pointer'}} border={"light"}>
                <div className="imgCont">
                    {userId===item.userId? <div>
                            <div onClick={delHandler}  className="remove">&times;</div>
                            <div onClick={()=>setChangeItemVisible(true)} className="edit">&#x270E;</div>
                        </div>
                        :<div></div>
                    }
                    <Image width={150} height={150} src={item.img||'/emptyItem.png'} onClick={()=>history.push('/Item/'+item.id)}/>
                </div>
                <div >
                    <div>{item.name}</div>
                </div>
            </Card>
            <CreateItem show={changeItemVisible} onHide={()=>setChangeItemVisible(false)} path='/changeItem' type='change' itemId={item.id}/>
        </Col>
    );
};
