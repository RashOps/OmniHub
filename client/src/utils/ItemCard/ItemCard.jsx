import "./ItemCard.css"
import Button from "../Button/Button" 
import { Edit2, Trash2 } from "lucide-react"

const ItemCard = ({ 
    title, 
    Icon,
    priority, 
    isTodo = false, 
    isCompleted = false, 
    onToggle, 
    onEdit, 
    onDelete 
}) => {
    return (
        <div className={`item-card-container ${isCompleted ? "completed" : ""}`}>
            <div className="item-card-leading">
                {isTodo ? (
                    <input 
                        type="checkbox" 
                        checked={isCompleted} 
                        onChange={onToggle} 
                        className="item-checkbox"
                    />
                ) : (
                    Icon && <Icon size={22} className="item-icon" />
                )}
            </div>

            {/* Partie Centrale : Le Texte */}
            <div className="item-card-content">
                <span className="item-title">{title}</span>
                {/* Affichage de la pastille de priorité */}
                {isTodo && priority && (
                    <span className={`priority-badge ${priority}`}>
                        {priority.toUpperCase()}
                    </span>
                )}
            </div>

            {/* Partie Droite : Groupe de boutons Modifier | Supprimer */}
            <div className="item-card-actions">
                <div className="action-group">
                    <button className="inner-action-btn" onClick={onEdit}>Modifier</button>
                    <div className="action-separator"></div>
                    <button className="inner-action-btn danger" onClick={onDelete}>Supprimer</button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard