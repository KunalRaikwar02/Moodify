import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import "../style/login.scss"

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        try {
            await handleLogin({ email, password })
            navigate("/")
        } catch (err) {
            setError("ACCESS DENIED. INVALID CREDENTIALS.")
        }
    }

    return (
        <main className="login-vanta-page">
            <div className="noise-floor"></div>
            
            <div className="vanta-container">
             
                <div className="vanta-branding">
                    <div className="vanta-branding-content">
                        <h1 className="anton-font">YOUR VIBE,<br />OUR MUSIC.</h1>
                        <p className="mono-font">Detect your mood, feel the vibe, and <br /> get your perfect song in seconds.</p>
                        <div className="branding-footer">
                            <span className="dot"></span>
                            <span className="line"></span>
                        </div>
                    </div>
                </div>

                <div className="vanta-form-wrapper">
                    <div className="vanta-form-card">
                        <h2 className="vanta-form-title anton-font">LOGIN</h2>

                        <form onSubmit={handleSubmit} className="vanta-form">
                            <div className="vanta-group">
                                <label className="mono-font">IDENTIFIER</label>
                                <input
                                    type="text"
                                    placeholder="email or username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="vanta-group password-group">
                                <label className="mono-font">PASSWORD</label>
                                <div className="vanta-input-wrap">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="vanta-toggle mono-font"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "[ HIDE ]" : "[ SHOW ]"}
                                    </button>
                                </div>
                            </div>

                            {error && <p className="vanta-error mono-font">{error}</p>}

                            <button 
                                type="submit" 
                                className="vanta-btn-submit anton-font"
                                disabled={loading}
                            >
                                {loading ? <span className="vanta-spinner"></span> : "JOIN VIBE →"}
                            </button>
                        </form>

                        <p className="vanta-register-text mono-font">
                            NEW USER? <Link to="/register">CREATE_ACCOUNT</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login