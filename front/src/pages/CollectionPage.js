import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Button, Card, Spinner} from "react-bootstrap";
import {CreateItem} from "../components/modals/CreateItem";
import {ItemList} from "../components/ItemList";
import {Alert} from "../components/Alert";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import ReactMarkdown from 'react-markdown'

export const CollectionPage = () => {
    const {alert, userId, userRole} = useContext(AuthContext)
    const [addItemVisible, setAddItemVisible] = useState(false)
    const {request} = useHttp()
    const [collection, setCollection] = useState()
    const {id} = useParams()
    const fetchCollection = useCallback(async () => {
        const data = await request('/api/col/getCol?id=' + id, 'GET', null);
        await setCollection(data)
    }, [request])
    useEffect(() => {
        fetchCollection()
    }, [])
    if (!!!collection)
        return (<Spinner animation={"border"}/>)
    return (
        <div>
            <Alert message={alert}/>
            <h1 className="text-center">{collection.title}</h1>
            <Card><ReactMarkdown>{collection.shortDesc}</ReactMarkdown></Card>
            {(collection.userId === userId || userRole === "ADMIN") ? <div>
                <Button variant="outline-dark" className="m-3" onClick={() => setAddItemVisible(true)}>add item</Button>
            </div> : <div></div>
            }
            <CreateItem show={addItemVisible} onHide={() => setAddItemVisible(false)} path="/addItem" type="Add"/>
            <ItemList/>
        </div>
    )
}