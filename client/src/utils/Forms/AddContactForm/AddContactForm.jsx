import { useState } from "react"
import Button from "../../Button/Button" // On réutilise ton composant !
import { Save, X } from "lucide-react"
import "./AddContactForm.css"

const AddContactForm = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState({
        surname: "",
        firstname: "",
        phonenumber: "",
        email: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd(formData) // On envoie l'objet complet au service Ky via le parent
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h3 className="form-title">Nouveau Contact</h3>
            <div className="input-group">
                <input type="text" name="surname" placeholder="Nom" required onChange={handleChange} />
                <input type="text" name="firstname" placeholder="Prénom" required onChange={handleChange} />
            </div>
            <input type="tel" name="phonenumber" placeholder="Numéro (ex: 06...)" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            
            <div className="form-actions">
                <Button label="Annuler" variant="neutral" Icon={X} action={onCancel} />
                <Button label="Enregistrer" variant="primary" type="submit" Icon={Save} />
            </div>
        </form>
    )
}

export default AddContactForm