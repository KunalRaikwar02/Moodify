import { login, register, getMe, logout } from "../services/auth.api"
import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.contex"


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({ email, password }) {
        setLoading(true)
        const data = await login({ email, password })
        setUser(data.user)
        setLoading(false)
    }

    async function handleGetMe() {
        try {
            setLoading(true)
            const data = await getMe()
            setUser(data.user)
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        try {
            setLoading(true)
            await logout()
            setUser(null)
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout }
}