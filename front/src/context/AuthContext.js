import {createContext} from 'react'

function noop() {
}

export const AuthContext = createContext({
    alert: '',
    setAlert: noop,
    clearAlert: noop,
    users: {},
    setUsers: noop,
    token: null,
    userId: null,
    userRole: null,
    setUserRole: noop,
    login: noop,
    logout: noop,
    isAuthenticated: true,
})