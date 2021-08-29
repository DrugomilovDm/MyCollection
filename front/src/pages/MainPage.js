import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {LastItems} from "../components/LastItems";
import {useHttp} from "../hooks/http.hook";
import {Tags} from "../components/Tags";
import {Alert} from "../components/Alert";
import {AuthContext} from "../context/AuthContext";
import {CollectionList} from "../components/CollectionList";


export const MainPage = () => {
    const {alert} = useContext(AuthContext)
    const [tags, setTags] = useState()
    const {request} = useHttp()
    const fetchTags = useCallback(async () => {
        const data = await request('/api/tag/getTags', 'GET', null);
        await setTags(data)
    }, [request])
    useEffect(() => {
        fetchTags()
    }, [alert, fetchTags])

    return (<Row>
            <Alert message={alert}/>
            <Col md="10" className="px-3">
                <h2 className="my-3 text-center">Tags</h2>
                <Tags tags={tags}/>
                <h2 className="text-center">Last added items</h2>
                <LastItems/>
            </Col>
            <Col md="2" className="d-flex justify-content-center flex-wrap"><h3 className="text-center my-3">Largest
                collections</h3><CollectionList path={"/getLargestCols"}
                                                className={"d-flex justify-content-center"}/></Col>
        </Row>
    )
}