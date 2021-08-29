import React, {useCallback, useEffect, useState} from 'react';
import {Row, Spinner} from 'react-bootstrap'
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import {Item} from "./Item";

export const SearchList = () => {
    const {value} = useParams()
    const [items, setItems] = useState()
    const {request} = useHttp()
    const fetchItems = useCallback(async () => {
        const data = await request('/api/item/getItems?value=' + value, 'GET', null);
        await setItems(data)
    }, [request])
    useEffect(() => {
        fetchItems()
    }, [])
    if (!!!items)
        return (<Spinner animation={"border"}/>)
    return (<Row className="d-flex ">
            {Object.values(items).map(item =>
                <Item key={item.id} item={item}/>
            )}
        </Row>
    );
}