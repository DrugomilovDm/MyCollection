import React, {useContext, useState} from 'react'
import {Container, Nav, Navbar, FormControl, NavDropdown} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const Navb = () => {
    const auth = useContext(AuthContext)
    const history = useHistory();
    const logoutHandler = event => {
        console.log(auth)
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    const [value, setValue] = useState('')
    const keyPressHandler = event => {
        if (event.code === "Enter")
            window.location.href = `/Search/${value}`
    }
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand href="/">Collector</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto">
                            <NavDropdown title="Category" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/Category/Coins">Coins</NavDropdown.Item>
                                <NavDropdown.Item href="/Category/Alcohol">Alcohol</NavDropdown.Item>
                                <NavDropdown.Item href="/Category/Books">Books</NavDropdown.Item>
                                <NavDropdown.Item href="/Category/Cars">Cars</NavDropdown.Item>
                                <NavDropdown.Item href="/Category/Stamps">Stamps</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {auth.isAuthenticated ?
                            <Nav>
                                {auth.userRole === "ADMIN" ?
                                    <Nav.Link href="/Admin" style={{whiteSpace: "nowrap"}}>Admin panel</Nav.Link> :
                                    <div></div>}
                                <Nav.Link href="/MyCol" style={{whiteSpace: "nowrap"}}>My Collections</Nav.Link>
                                <FormControl
                                    onChange={(event) => setValue(event.target.value)}
                                    onKeyPress={keyPressHandler}
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <Nav.Link onClick={logoutHandler} href="/">Logout</Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <FormControl
                                    onChange={(event) => setValue(event.target.value)}
                                    onKeyPress={keyPressHandler}
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <Nav.Link href="/Reg">Registration</Nav.Link>
                                <Nav.Link href="/Auth">Auth</Nav.Link>
                            </Nav>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}