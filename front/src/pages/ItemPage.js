import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Card, Image, Spinner} from "react-bootstrap";
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import { WithContext as ReactTags } from 'react-tag-input';
import {AuthContext} from "../context/AuthContext";
import {Tags} from "../components/Tags";
import styles from "../ReactTags.module.scss";

export const ItemPage = () => {
    const {request}= useHttp()
    const {userId,token,userRole}=useContext(AuthContext)
    const [item,setItem]=useState()
    const [likesNumber,setLikesNumber]=useState(0)
    const [like,setLike]=useState('')
    const [allTags,setAllTags]=useState()
    const [tags,setTags]=useState([])
    const {id}=useParams()
    const fetchItem =useCallback (async ()=> {
        const data = await request('/api/item/getItem?id='+id, 'GET', null);
        await setItem(data)
        setLike(data.likes.filter((like)=>like.userId===userId).length!==0?'/Like.jpg':'/NoLike.jpg')
        await setTags(data.tags)
        await setLikesNumber(data.likes.length)
        const  data2 =await request('/api/tag/getTags','GET',null)
        await setAllTags(data2)
    },[request])
    const delTagHandler= async (i)=>{
        setTags(tags.filter((tag, index) => index !== i))
        const data =await request('/api/tag/delTag','POST',{text:tags[i].text,itemId:id})
        console.log(data)
    }
    const addTagHandler =async (tag)=>{
        const data =await request('/api/tag/addTag','POST',{text:tag.text,itemId:id})
        setTags([...tags,tag])
        console.log(data)
    }
    const handleDrag=(tag, currPos, newPos) =>{
        const tgs = [...tags];
        const newTags = tgs.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    }
    const likeHandler =  ()=>{
        if(!!!token){return}
        if(like==='/NoLike.jpg'){
            request('/api/like/addLike', 'POST', {itemId: id}, {Authorization: `Bearer ${token}`})
            setLike('/Like.jpg'); setLikesNumber(likesNumber+1)}
        else{ request('/api/like/delLike', 'DELETE', {itemId:id},{Authorization:`Bearer ${token}`})
        setLike('/NoLike.jpg'); setLikesNumber(likesNumber-1)}
    }
    useEffect(()=>{
        fetchItem()
    },[])
    if(!!!item)
        return(<Spinner animation={"border"}/>)
    return (<div>
    <div className="d-flex">
        <Card className="m-5" style={{width:150}} border={"light"}>
                <Image width={150} height={150} src={item.img||'/emptyItem.png'} rounded/>
            <div className="likeCont">
                <Image onClick={likeHandler} className='like' src={like||'/NoLike'} />
                <div className="likeNumber">{likesNumber}</div>
            </div>
            </Card>
        <div>
        <h1 className='m-5'>{item.name}</h1>
            {userId===item.userId||userRole==="ADMIN"? <div className={styles.ReactTags}>
                <ReactTags tags={tags}
                              suggestions={allTags}
                              handleDelete={delTagHandler}
                              handleAddition={addTagHandler}
                              handleDrag={handleDrag}
                              placeholder="add tags"
            />
            </div>:<Tags tags={tags}/>}
        </div>
    </div>
    </div>
    );
};
