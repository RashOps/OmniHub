import { FileText, Plus, Trash2 } from "lucide-react"
import SearchBar from "../utils/SearchBar/SearchBar"
import ItemCard from "../utils/ItemCard/ItemCard"
import Button from "../utils/Button/Button"

const NoteList = ({ items, onSearch, onAddClick, onDeleteAll, onEdit, onDelete }) => {
    return (
        <div className="note-list-container">
            <SearchBar placeholder="Rechercher une note..." onSearchChange={onSearch} />
            
            <div className="action-row">
                <Button label="Ajouter une note" variant="neutral" Icon={Plus} action={onAddClick} />
                <Button label="Supprimer toutes les notes" variant="danger" Icon={Trash2} action={onDeleteAll} />
            </div>

            <div className="list-items">
                {items.map((note) => (
                    <ItemCard 
                        key={note.id} 
                        title={note.title} 
                        Icon={FileText} 
                        onEdit={() => onEdit(note)}
                        onDelete={() => onDelete(note.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default NoteList