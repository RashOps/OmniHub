import { useState, useEffect } from "react";
import Button from "../../Button/Button";
import { Check, Trash2 } from "lucide-react";
import "./AddNoteForm.css";

const AddNoteForm = ({ onAdd, onCancel, initialData }) => {
    const [note, setNote] = useState({ title: "", content: "" });

    // Définition des conditions de validité
    const isTitleValid = note.title.length >= 5 || note.title.length === 0; 
    const isTitleStrictlyValid = note.title.length >= 5;
    const isContentValid = note.content.length > 0;
    const isFormValid = isTitleStrictlyValid && isContentValid;

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
                placeholder="Titre de la note (min 5)" 
                minLength={5}
                maxLength={50}
                required 
                value={note.title}
                className={!isTitleValid ? "input-error" : ""}
                onChange={(e) => setNote(prev => ({...prev, title: e.target.value}))} 
            />
            <textarea 
                placeholder="Contenu de la note..." 
                rows="6"
                required
                maxLength={500}
                value={note.content}
                onChange={(e) => setNote(prev => ({...prev, content: e.target.value}))}
            ></textarea>
            <small className="char-counter">{note.content.length} / 500</small>

            <div className="form-actions">
                <Button label="Annuler" variant="danger" Icon={Trash2} action={onCancel} />
                <Button label="Valider" variant="primary" disabled={!isFormValid} type="submit" Icon={Check} />
            </div>
        </form>
    );
};

export default AddNoteForm;