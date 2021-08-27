import React, {useContext, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap'
import {AuthContext} from "../../context/AuthContext";
import {Drag} from "../Drag";

export const CreateCollection = ({show,onHide,type,path,id}) => {
    const [file,setFile]=useState(null)
    const {token,setAlert}=useContext(AuthContext)
    const [form, setFrom] = useState({
        title: '', category: '',shortDesc:''
    })
    const changeHandler = event => {
        setFrom({ ...form, [event.target.name]: event.target.value })
    }
    const addCollectionHandler = async () => {
        try {
            const formData=new FormData()
            formData.append('title',form.title)
            formData.append('category',form.category)
            formData.append('shortDesc',form.shortDesc)
            formData.append('img', file);
            if(!!id){formData.append('id',id)}
            const response=await fetch('/api/col'+path,{method:'POST',body:formData,headers:{Authorization:`Bearer ${token}`}})
            const result=await response.json()
               setAlert(result.message)
        } catch (e) {}
    }
    const handleClick=()=>{
        addCollectionHandler()
        onHide()
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{type} collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="mx-4">
                    <Form.Group className="mb-3" >
                        <Form.Label>Collection name</Form.Label>
                        <Form.Control onChange={changeHandler} type="title" id="title" name="title" placeholder="My collection" />
                    </Form.Group>
                    <Form.Select aria-label="Category" onChange={changeHandler} type="category" id="category" name="category" >
                        <option>Category</option>
                        <option>Coins</option>
                        <option>Alcohol</option>
                        <option>Books</option>
                        <option>Cars</option>
                        <option>Stamps</option>
                    </Form.Select>
                    <Form.Label>Collection image</Form.Label>
                    <Drag setFile={setFile}/>
                    <Form.Group className="mb-3" >
                        <Form.Label>Short description</Form.Label>
                        <Form.Control as="textarea" onChange={changeHandler} type="shortDesc" id="shortDesc" name="shortDesc" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide} >
                    Close
                </Button>
                <Button variant="outline-dark" onClick={handleClick} >{type} collection</Button>
            </Modal.Footer>
        </Modal>
    );
};
