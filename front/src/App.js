import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navb} from "./components/Navb";
import {Spinner} from "react-bootstrap";


function App() {
    const {
        token,
        setAlert,
        userId,
        alert,
        login,
        logout,
        ready,
        setUsers,
        users,
        clearAlert,
        setUserRole,
        userRole
    } = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    if (!ready)
        return (<Spinner animation={"border"}/>)
    return (
        <AuthContext.Provider value={{
            token,
            setAlert,
            userId,
            alert,
            login,
            logout,
            isAuthenticated,
            users,
            setUsers,
            clearAlert,
            setUserRole,
            userRole
        }}>
            <Router>
                <div>
                    <Navb/>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;