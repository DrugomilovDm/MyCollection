import React, {useContext} from 'react'
import {Toast, ToastContainer} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";

export const Alert = ({message}) => {
    const {clearAlert} = useContext(AuthContext)


    return <ToastContainer position="top-center">
        <Toast onClose={clearAlert} show={!!message} delay={2000} autohide>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    </ToastContainer>
}
