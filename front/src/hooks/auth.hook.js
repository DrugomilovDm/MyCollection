import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const  useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [alert, setAlert] = useState('')
    const [users, setUsers] = useState({})
    const [ready,setReady]=useState(null)
    const [userRole,setUserRole]=useState(null)

    const clearAlert = () => setAlert('')
    const login = useCallback((jwtToken, id,role) => {
        setToken(jwtToken)
        setUserId(id)
        setUserRole(role)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken,userRole:role
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserRole(null)
        localStorage.removeItem(storageName)
    }, [])
      useEffect( () => {
        const data =  JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
              login(data.token, data.userId ,data.userRole)
        }
        setReady(true)
    },[login])

    return { alert, setAlert, clearAlert, users, setUsers, login, logout, token, userId,ready,userRole,setUserRole }
}