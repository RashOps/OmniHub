import { useState } from "react"
import Button from "../../utils/Button/Button"
import { Plus, Trash2 } from "lucide-react" 
import "./AddTodoQuick.css"

const AddTodoQuick = ({ onAdd, onDeleteAll }) => {
    const [taskName, setTaskName] = useState("")

    const handleAdd = () => {
        if (taskName.trim()) {
            onAdd({ task: taskName, priority: "medium" }) 
            setTaskName("") 
        }
    }

    return (
        <div className="quick-add-wrapper">
            {/* Champ de saisie */}
            <input 
                type="text" 
                className="quick-add-input"
                placeholder="Nouvelle tâche..." 
                minLength={3}
                maxLength={50}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />

            {/* Bloc de boutons à droite */}
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