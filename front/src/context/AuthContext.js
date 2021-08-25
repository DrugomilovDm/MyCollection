import { createContext } from 'react'

function noop() { }

export const AuthContext = createContext({
    alert: '',
    setAlert: noop,
    clearAlert: noop,
    users: {},
    setUsers: noop,
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: true,
})