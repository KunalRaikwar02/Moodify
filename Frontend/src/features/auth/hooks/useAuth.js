import { login, register, logout } from "../services/auth.api"
import { useContext } from "react"
import { AuthContext } from "../auth.contex"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password }) {
        try {
            setLoading(true)
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {
            setLoading(false)
            throw err 
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ email, password }) {
        try {
            setLoading(true)
            const data = await login({ email, password })
            setUser(data.user)
        } catch (err) {
            setLoading(false)
            throw err  
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

    return { user, loading, handleRegister, handleLogin, handleLogout }
}