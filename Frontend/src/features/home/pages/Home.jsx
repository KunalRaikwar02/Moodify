import React from 'react'
import { useNavigate } from 'react-router-dom'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import './home.scss'

const Home = () => {
    const navigate = useNavigate()
    const { handleGetSong, song } = useSong()

    const handleLogout = () => {
        localStorage.clear()
        sessionStorage.clear() 
        navigate('/login')
    }

    return (
        <main className="home-page">
            <div className="noise-floor"></div>

            <button className="logout-btn" onClick={handleLogout}>
                TERMINATE_SESSION [ESC]
            </button>
            
            <div className="home-container">
                <header className="brand-header">
                    <h1 className="logo-text">MOODIFY</h1>
                    <div className="separator">
                        <span className="line"></span>
                        <span className="dot"></span>
                        <span className="line"></span>
                    </div>
                </header>

                <section className="scanner-section">
                    <div className="viewport-container">
                        <div className="hud-corner tl"></div>
                        <div className="hud-corner tr"></div>
                        <div className="hud-corner bl"></div>
                        <div className="hud-corner br"></div>
                        
                        <div className="scanner-meta top">
                            <span className="rec-dot"></span>
                            <span className="text">SYSTEM_ACTIVE</span>
                        </div>

                        <div className="face-viewport">
                            <FaceExpression 
                                onClick={(expression) => { handleGetSong({ mood: expression }) }} 
                            />
                            <div className="vignette"></div>
                        </div>

                        <div className="scanner-meta bottom">
                            <span>NEURAL_LINK: ESTABLISHED</span>
                        </div>
                    </div>

                    <div className="ux-brief-large">
                        <p>Align your face within the digital brackets. Our neural engine will decode your current state and pull a matching frequency from our curated vault.</p>
                    </div>
                </section>
            </div>

            {song && <Player />}
        </main>
    )
}

export default Home