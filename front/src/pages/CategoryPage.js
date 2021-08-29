import React, {useContext} from 'react'
import {CollectionList} from "../components/CollectionList";
import {Alert} from "../components/Alert";
import {AuthContext} from "../context/AuthContext";
import {useParams} from "react-router-dom";


export const CategoryPage = () => {
    const {alert} = useContext(AuthContext)
    const {category} = useParams()
    return (
        <div><Alert message={alert}/>
            <CollectionList md={2} lg={2} sm={3} xs={5} path={`/getCategoryCol?category=${category}`}/>
        </div>
    )
}