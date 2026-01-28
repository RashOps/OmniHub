import { useState, useEffect } from "react"
import "./NavBar.css"

const NavBar = () => {
    // État pour l'horloge en temps réel
    const [time, setTime] = useState(new Date())

    // Effet pour mettre à jour l'heure chaque seconde
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer) // Nettoyage pour éviter les fuites de mémoire
    }, [])

    return (
        <header className="navbar-container">
            <div className="navbar-logo">
                <h1>OmniHub</h1>
                <span className="navbar-slogan">Restez organisé en toutes circonstances</span>
            </div>
            
            <div className="navbar-clock">
                {time.toLocaleTimeString()}
            </div>
        </header>
    )
}

export default NavBar