import { useState } from "react"
import Button from "../../utils/Button/Button"
import { Plus, Trash2 } from "lucide-react" // Utilisation de Lucide comme prévu
import "./AddTodoQuick.css"

const AddTodoQuick = ({ onAdd, onDeleteAll }) => {
    const [taskName, setTaskName] = useState("")

    const handleAdd = () => {
        if (taskName.trim()) {
            onAdd({ task: taskName, priority: "medium" }) // On envoie l'objet au parent
            setTaskName("") // On vide le champ après l'ajout
        }
    }

    return (
        <div className="quick-add-wrapper">
            {/* Le grand champ de saisie de l'image */}
            <input 
                type="text" 
                className="quick-add-input"
                placeholder="Aller au sport ..." 
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />

            {/* Le bloc de boutons à droite */}
            <div className="quick-add-buttons">
                <Button 
                    label="Ajouter une tâche" 
                    variant="primary" 
                    Icon={Plus} 
                    action={handleAdd} 
                />
                <Button 
                    label="Tous supprimer" 
                    variant="danger" 
                    Icon={Trash2} 
                    action={onDeleteAll} 
                />
            </div>
        </div>
    )
}

export default AddTodoQuick