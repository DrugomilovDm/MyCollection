import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Alert} from "../components/Alert";
import {Button, Card, Container, Form, Row, Col} from "react-bootstrap";

export const RegPage = () => {
    const {alert, setAlert} = useContext(AuthContext)
    const {loading, request} = useHttp()
    const [form, setFrom] = useState({
        name: '', email: '', password: ''
    })
    const changeHandler = event => {
        setFrom({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            setAlert(data.message)
        } catch (e) {
            setAlert(e.message)
        }
    }

    return (
        <Row className="mt-5">
            <Alert message={alert}/>
            <Col md={{span: 6, offset: 3}} xs={{span: 12, offset: 0}}>
                <Container>
                    <Form>
                        <Card className="cardStyle">
                            <Card.Body>
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={changeHandler} type="name" id="name" name="name"
                                              placeholder="Name"/>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control onChange={changeHandler} type="email" id="email" name="email"
                                              placeholder="Example@email.com"/>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={changeHandler} type="password" id="password" name="password"
                                              placeholder="Password"/>
                                <Button variant="outline-dark" onClick={registerHandler} disabled={loading}
                                        className="my-3">Confirm</Button>
                                <Button variant="outline-dark" href="/Auth" disabled={loading} className="mx-2">Sign
                                    in</Button>
                            </Card.Body>
                        </Card>
                    </Form>
                </Container>
            </Col>
        </Row>
    )
}