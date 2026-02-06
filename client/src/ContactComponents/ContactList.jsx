import { User, Plus } from "lucide-react"
import SearchBar from "../utils/SearchBar/SearchBar"
import ItemCard from "../utils/ItemCard/ItemCard"
import Button from "../utils/Button/Button"

const ContactList = ({ items, onSearch, onAddClick, onEdit, onDelete }) => {
    return (
        <div className="contact-list-container">
            <h2>Contacts</h2>
            <SearchBar placeholder="Rechercher un contact..." onSearchChange={onSearch} />
            
            <div className="list-header">
                <span>Liste de contacts</span>
                {/* Bouton pour ouvrir la modale d'ajout */}
                <Button label="Ajouter un contact" variant="neutral" Icon={Plus} action={onAddClick} />
            </div>

            <div className="list-items-container">
                {items.map((contact) => (
                    <ItemCard 
                        key={contact.id} 
                        title={`${contact.surname} - ${contact.firstname}`} 
                        Icon={User} 
                        onEdit={() => onEdit(contact)}
                        onDelete={() => onDelete(contact.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ContactList