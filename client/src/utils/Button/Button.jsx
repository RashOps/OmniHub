import "./Button.css"

// On ajoute 'Icon' aux props
const Button = ({ label, variant, action, type = "button", Icon }) => {
    return (
        /* On utilise 'variant' pour créer une classe dynamique (ex: btn-danger) */
        <button 
            type={type} 
            className={`custom-btn btn-${variant}`} 
            onClick={action}
        >
            {Icon && <Icon size={18} className="btn-icon" />}
            {label && <span>{label}</span>}
        </button>
    )
}

export default Button