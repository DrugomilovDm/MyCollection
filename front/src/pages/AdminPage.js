import React, {useCallback, useEffect, useContext} from 'react'
import {Col, Table, Row, ButtonGroup, ButtonToolbar, Button} from "react-bootstrap";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Alert} from '../components/Alert';

export const AdminPage = () => {
    const {request} = useHttp()
    const {users, setUsers, token, setAlert, alert} = useContext(AuthContext)
    const fetchUsers = useCallback(async () => {
        const data = await request('/api/users/getUsers', 'GET', null, {Authorization: `Bearer ${token}`});
        const newUsers = data.reduce((result, user) => ({...result, [user.id]: {...user, checked: false}}), {});
        setUsers(newUsers);
    }, [request]);

    const checkUser = (oldUsers, id, checked) => ({...oldUsers, [id]: {...oldUsers[id], checked}})
    const checkUsers = checked => Object.keys(users).reduce((result, id) => checkUser(result, id, checked), users)

    const checkHandler = event => {
        setUsers(checkUser(users, event.target.id, event.target.checked));
    }

    const checkAllHandler = (event) => {
        setUsers(checkUsers(event.target.checked));
    }

    const isCheckedAll = !Object.values(users).some(user => user.checked !== true);
    const deleteHandler = async () => {
        try {
            const ids = Object.keys(users).filter(item => users[item].checked === true);
            const data = await request('/api/users/delUsers', 'DELETE', {ids}, {Authorization: `Bearer ${token}`})
            setAlert(data.message);
        } catch (e) {
            setAlert(e.message)
        }
    }
    const addAdminHandler = async () => {
        try {
            const ids = Object.keys(users).filter(item => users[item].checked === true);
            const data = await request('/api/users/addAdmin', 'POST', {ids}, {Authorization: `Bearer ${token}`})
            setAlert(data.message);
        } catch (e) {
            setAlert(e.message)
        }
    }
    const removeAdminHandler = async () => {
        try {
            const ids = Object.keys(users).filter(item => users[item].checked === true);
            const data = await request('/api/users/deleteAdmin', 'POST', {ids}, {Authorization: `Bearer ${token}`})
            setAlert(data.message);
        } catch (e) {
            setAlert(e.message)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers, alert])

    return (<>
            <Alert message={alert}/>
            <Row className="my-3">
                <Col md={{span: 8, offset: 2}}>
                    <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                        <ButtonGroup className="me-2" aria-label="First group">
                            <Button variant="outline-dark" onClick={deleteHandler}>Delete</Button>
                            <Button variant="outline-dark" onClick={addAdminHandler}>Give admin role</Button>
                            <Button variant="outline-dark" onClick={removeAdminHandler}>Remove admin role</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 8, offset: 2}}>
                    <Table>
                        <thead>
                        <tr>
                            <th>
                                <div className="form-check">
                                    <input className="form-check-input" onChange={checkAllHandler} type="checkbox"
                                           value="" id="checkAll" checked={isCheckedAll}/>
                                </div>
                            </th>
                            <th>id</th>
                            <th>name</th>
                            <th>mail</th>
                            <th>regDate</th>
                            <th>lastLogin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.values(users).map(us => {
                            return (
                                <tr key={us.id}>
                                    <td>
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={checkHandler} type="checkbox"
                                                   value="" id={us.id} checked={us.checked}/>
                                        </div>
                                    </td>
                                    <td>{us.id}</td>
                                    <td>{us.name}</td>
                                    <td>{us.email}</td>
                                    <td>{us.createdAt}</td>
                                    <td>{us.updatedAt}</td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}