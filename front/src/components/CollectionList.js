import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Row, Spinner} from 'react-bootstrap'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Collection} from "./Collection";

export const CollectionList = ({md, xs, lg, sm, path, className}) => {
    const {token, alert} = useContext(AuthContext)
    const {request} = useHttp()
    const [collections, setCollections] = useState()
    const fetchCollections = useCallback(async () => {
        const data = await request('/api/col' + path, 'GET', null, {Authorization: `Bearer ${token}`});
        await setCollections(data)
    }, [request, token])
    useEffect(() => {
        fetchCollections()
    }, [alert, fetchCollections])

    if (!!!collections)
        return (<Spinner animation={"border"}/>)
    return (<Row className={className}>
            {Object.values(collections).map(collection =>
                <Collection key={collection.id} collection={collection} md={md} xs={xs} lg={lg} sm={sm}/>
            )}
        </Row>
    );
}
