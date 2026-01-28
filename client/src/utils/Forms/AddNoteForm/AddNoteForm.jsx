import { useState } from "react"
import Button from "../../Button/Button"
import { Check, Trash2 } from "lucide-react"
import "./AddNoteForm.css"

const AddNoteForm = ({ onAdd, onCancel }) => {
    const [note, setNote] = useState({ title: "", content: "" })

    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd(note)
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h3 className="form-title">Nouvelle Note</h3>
            <input 
                type="text" 
                placeholder="Titre de la note" 
                required 
                onChange={(e) => setNote({...note, title: e.target.value})} 
            />
            <textarea 
                placeholder="Contenu de la note..." 
                rows="6"
                required
                onChange={(e) => setNote({...note, content: e.target.value})}
            ></textarea>
            
            <div className="form-actions">
                <Button label="Annuler" variant="danger" Icon={Trash2} action={onCancel} />
                <Button label="Valider" variant="primary" type="submit" Icon={Check} />
            </div>
        </form>
    )
}

export default AddNoteForm