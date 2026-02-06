import "./Button.css"

const Button = ({ label, variant, action, type = "button", Icon }) => {
    return (
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