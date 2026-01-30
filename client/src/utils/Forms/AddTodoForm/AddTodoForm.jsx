import { useState, useEffect } from "react";
import Button from "../../Button/Button";
import { Save, X } from "lucide-react";
import "./AddTodoForm.css"

const AddTodoForm = ({ onAdd, onCancel, initialData }) => {
    const [formData, setFormData] = useState({ task: "", priority: "medium" });

    useEffect(() => {
        if (initialData) {
            setFormData({
                task: initialData.task || "",
                priority: initialData.priority || "medium"
            });
        }
    }, [initialData]);

    return (
        <form className="form-container" onSubmit={(e) => { e.preventDefault(); onAdd(formData); }}>
            <h3 className="form-title">Modifier la tâche</h3>
            <input 
                type="text" 
                name="task" 
                placeholder="Tâche..." 
                required 
                value={formData.task} 
                onChange={(e) => setFormData({...formData, task: e.target.value})} 
            />
            <h4 className="form-title">Changer la priorité</h4>
            <select 
                value={formData.priority} 
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="quick-add-input" /* On réutilise tes styles existants */
            >
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
            </select>
            
            <div className="form-actions">
                <Button label="Annuler" variant="neutral" Icon={X} action={onCancel} />
                <Button label="Enregistrer" variant="primary" type="submit" Icon={Save} />
            </div>
        </form>
    );
};

export default AddTodoForm;