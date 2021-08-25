import React, {useContext, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import {AuthContext} from "../../context/AuthContext";
import {useParams} from "react-router-dom";
import {Drag} from "../Drag";

export const CreateItem = ({show,onHide,type,path,itemId}) => {
    const [file,setFile]=useState(null)
    const {id}=useParams()
    const {token,setAlert}=useContext(AuthContext)
    const [form, setFrom] = useState({
        name: ''
    })
    const changeHandler = event => {
        setFrom({ ...form, [event.target.name]: event.target.value })
    }
    const addItemHandler = async () => {
        try {
            const formData=new FormData()
            formData.append('name',form.name)
            !!itemId?formData.append('id',itemId):formData.append('collectionId',id)
            formData.append('img', file);
            const response=await fetch('/api/item'+path,{method:'POST',body:formData,headers:{Authorization:`Bearer ${token}`}})
            const result=await response.json()
            setAlert(result.message)
        } catch (e) {}
    }
    const handleClick=()=>{
        addItemHandler()
        onHide()
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{type} item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="mx-4">
                    <Form.Group className="mb-3" >
                        <Form.Label>Item name</Form.Label>
                        <Form.Control onChange={changeHandler} type="name" id="name" name="name" placeholder="name" />
                    </Form.Group>
                    <Form.Label>Item image</Form.Label>
                    <Drag setFile={setFile}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} >
                    Close
                </Button>
                <Button onClick={handleClick} >{type} item</Button>
            </Modal.Footer>
        </Modal>
    );
};
