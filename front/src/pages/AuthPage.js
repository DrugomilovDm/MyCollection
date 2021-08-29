import React, {useState, useContext} from 'react'
import {Button, Form, Card, Container, Row, Col} from "react-bootstrap";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Alert} from '../components/Alert';

export const AuthPage = () => {
    const {alert, setAlert, login,} = useContext(AuthContext)
    const {loading, request,} = useHttp()
    const [form, setFrom] = useState({
        email: '', password: ''
    })
    const changeHandler = event => {
        setFrom({...form, [event.target.name]: event.target.value})
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            login(data.token, data.userID, data.role)
        } catch (e) {
            setAlert(e.message)
        }
    }

    return (
        <Row>
            <Alert message={alert}/>
            <Col md={{span: 6, offset: 3}} xs={{span: 12, offset: 0}}>
                <Container>
                    <Form>
                        <Card>
                            <Card.Body>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control onChange={changeHandler} type="email" id="email" name="email"
                                              placeholder="Example@email.com"/>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={changeHandler} type="password" id="password" name="password"
                                              placeholder="Password"/>
                                <Button variant="outline-dark" disabled={loading} onClick={loginHandler}
                                        className="my-3 ">Sign in</Button>
                                <Button variant="outline-dark" href="/Reg" disabled={loading}
                                        className="mx-2">Registration</Button>
                            </Card.Body>
                        </Card>
                    </Form>
                </Container>
            </Col>
        </Row>
    )
}