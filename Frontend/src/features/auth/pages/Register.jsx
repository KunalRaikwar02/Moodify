import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import "../style/register.scss"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [passwordStrength, setPasswordStrength] = useState(0)

    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    const handlePasswordChange = (e) => {
        const pwd = e.target.value
        setPassword(pwd)
        let strength = 0
        if (pwd.length >= 8) strength++
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
        if (/[0-9]/.test(pwd)) strength++
        if (/[^a-zA-Z0-9]/.test(pwd)) strength++
        setPasswordStrength(strength)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        if (password !== confirmPassword) return setError("PASSPHRASE_MISMATCH")
        if (password.length < 6) return setError("MINIMUM_6_CHARACTERS_REQUIRED")

        try {
            await handleRegister({ username, email, password })
            navigate("/")
        } catch (err) {
            setError("REGISTRATION_FAILED")
        }
    }

    return (
        <main className="login-vanta-page">
            <div className="noise-floor"></div>
            
            <div className="vanta-container">
           
                <div className="vanta-branding">
                    <div className="vanta-branding-content">
                        <h1 className="anton-font">YOUR MUSIC,<br />YOUR MOOD.</h1>
                        <p className="mono-font">Create your digital footprint. Sync your <br /> expressions with our curated frequencies.</p>
                        <div className="branding-footer">
                            <span className="dot"></span>
                            <span className="line"></span>
                        </div>
                    </div>
                </div>

               <div className="vanta-form-wrapper">
    <div className="vanta-form-card">
        <h2 className="vanta-form-title anton-font">REGISTER</h2>

        <form onSubmit={handleSubmit} className="vanta-form">
            <div className="vanta-group">
                <label className="mono-font">USERNAME</label>
      
                <input 
                    type="text" 
                    placeholder="unique_username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>

            <div className="vanta-group">
                <label className="mono-font">EMAIL_ADDRESS</label>
                <input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>

            <div className="vanta-group password-group">
                <label className="mono-font flex-label">
                    PASSWORD
                    <span className={`strength-text s-${passwordStrength}`}>
                        [{['WEAK', 'FAIR', 'GOOD', 'STRONG', 'SECURE'][passwordStrength]}]
                    </span>
                </label>
                <div className="vanta-input-wrap">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                    />
                    <button type="button" className="vanta-toggle mono-font" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "[ HIDE ]" : "[ SHOW ]"}
                    </button>
                </div>
                <div className="strength-meter"><div className={`fill s-${passwordStrength}`}></div></div>
            </div>

            <div className="vanta-group password-group">
                <label className="mono-font">CONFIRM PASSWORD</label> 
                <div className="vanta-input-wrap">
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <button type="button" className="vanta-toggle mono-font" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? "[ HIDE ]" : "[ SHOW ]"}
                    </button>
                </div>
            </div>

            {error && <p className="vanta-error mono-font">{error}</p>}

            <button type="submit" className="vanta-btn-submit anton-font" disabled={loading}>
                {loading ? <span className="vanta-spinner"></span> : "CREATE_ACCOUNT →"}
            </button>
        </form>

        <p className="vanta-register-text mono-font">
            ALREADY A MEMBER? <Link to="/login">LOGIN_HERE</Link>
        </p>
    </div>
</div>
            </div>
        </main>
    )
}

export default Register