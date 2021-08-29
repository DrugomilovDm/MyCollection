import React, {useContext, useEffect, useState} from 'react';
import {Row, Col, Form, Button, Card} from "react-bootstrap";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useParams} from "react-router-dom";

export const Comments = () => {
    const [comments, setComments] = useState([])
    const [value, setValue] = useState('')
    const {request} = useHttp()
    const {token, isAuthenticated} = useContext(AuthContext)
    const {id} = useParams()

    const sendComment = async () => {
        try {
            await request('/api/comments/newComment', 'POST', {commentText: value, id: Date.now(), itemId: id}, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {
            console.log(e)
        }
    }
    const getAllComments = async () => {
        try {
            const data = await request('/api/comments/getAllComments?id=' + id, 'GET', null)
            setComments(data)
        } catch (e) {
            console.log(e)
        }
    }
    const getComment = async () => {
        const data = await request('/api/comments/getComment', 'GET', null)
        setComments(prev => [data, ...prev])
        await getComment()
    }
    useEffect(() => {
        getAllComments()
        getComment()
    }, [])
    return (
        <>{isAuthenticated ?
            <Row>
                <Col>
                    <Form>
                        <Form.Control value={value} onChange={e => setValue(e.target.value)} as="textarea" rows={3}/>
                        <Button className="m-3" variant="outline-dark" onClick={sendComment}>Send</Button>
                    </Form>
                </Col>
            </Row> : <></>}
            <Row>
                <Col>
                    {comments.map(com =>
                        <Card className="m-3" id={com.id}>
                            <Card.Header as="h5">{com.userName}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {com.commentText}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                    }
                </Col>
            </Row>
        </>
    )
}
