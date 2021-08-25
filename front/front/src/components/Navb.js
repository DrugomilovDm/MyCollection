import React, {useContext, useState} from 'react'
import {Container, Nav,Navbar} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const Navb =()=>{
    const auth = useContext(AuthContext)
    const history = useHistory();
    const logoutHandler = event => {
        console.log(auth)
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    const [value,setValue]=useState('')
    const keyPressHandler=event=>{
        if(event.code==="Enter")
            window.location.href=`/Search/${value}`
    }
    return(
        <>
        <Navbar bg="dark" variant="dark" style={{height:60}}>
            <Container>
                <Navbar.Brand href="/">Collector</Navbar.Brand>
                {auth.isAuthenticated ?
                    <Nav className="right">
                        <Nav.Link href="/MyCol">My collections</Nav.Link>
                        <input style={{height:40}} onKeyPress={keyPressHandler} onChange={(event)=>setValue(event.target.value)} className="mx-3" type="text" placeholder="search"/>
                        <Nav.Link onClick={logoutHandler} href="/">Logout</Nav.Link>
                    </Nav>
                    :
                    <Nav className="right">
                        <input style={{height:40}} onKeyPress={keyPressHandler} onChange={(event)=>setValue(event.target.value)} className="mx-3" type="text" placeholder="search"/>
                        <Nav.Link href="/Reg">Registration</Nav.Link>
                        <Nav.Link href="/Auth">Auth</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>
        </>
    )
}