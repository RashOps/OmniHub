import { useState, useEffect } from "react";
import Button from "../../Button/Button";
import { Check, Trash2 } from "lucide-react";
import "./AddNoteForm.css";

const AddNoteForm = ({ onAdd, onCancel, initialData }) => {
    const [note, setNote] = useState({ title: "", content: "" });

    useEffect(() => {
        if (initialData) {
            setNote({
                title: initialData.title || "",
                content: initialData.content || ""
            });
        }
    }, [initialData]);

    return (
        <form className="form-container" onSubmit={(e) => { e.preventDefault(); onAdd(note); }}>
            <h3 className="form-title">{initialData ? "Modifier la Note" : "Nouvelle Note"}</h3>
            <input 
                type="text" 
                placeholder="Titre de la note" 
                required 
                value={note.title}
                onChange={(e) => setNote(prev => ({...prev, title: e.target.value}))} 
            />
            <textarea 
                placeholder="Contenu de la note..." 
                rows="6"
                required
                value={note.content}
                onChange={(e) => setNote(prev => ({...prev, content: e.target.value}))}
            ></textarea>
            
            <div className="form-actions">
                <Button label="Annuler" variant="danger" Icon={Trash2} action={onCancel} />
                <Button label="Valider" variant="primary" type="submit" Icon={Check} />
            </div>
        </form>
    );
};

export default AddNoteForm;