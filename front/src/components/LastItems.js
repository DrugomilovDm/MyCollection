import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Row, Spinner} from 'react-bootstrap'
import {useHttp} from "../hooks/http.hook";
import {Item} from "./Item";
import {AuthContext} from "../context/AuthContext";

export const LastItems = () => {
    const {alert} = useContext(AuthContext)
    const [items, setItems] = useState()
    const {request} = useHttp()
    const fetchItems = useCallback(async () => {
        const data = await request('/api/item/getLastItems', 'GET', null);
        await setItems(data)
    }, [request])
    useEffect(() => {
        fetchItems()
    }, [alert])
    if (!!!items)
        return (<Spinner animation={"border"}/>)
    return (<Row className="d-flex justify-content-center">
            {Object.values(items).map(item =>
                <Item key={item.id} item={item}/>
            )}
        </Row>
    );
}