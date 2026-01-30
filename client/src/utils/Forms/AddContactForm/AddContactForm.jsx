import { useState, useEffect } from "react";
import Button from "../../Button/Button";
import { Save, X } from "lucide-react";
import "./AddContactForm.css";

const AddContactForm = ({ onAdd, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        surname: "",
        firstname: "",
        phonenumber: "",
        email: ""
    });

    // Remplit le formulaire si on est en mode "Edition"
    useEffect(() => {
        if (initialData) {
            setFormData({
                surname: initialData.surname || "",
                firstname: initialData.firstname || "",
                phonenumber: initialData.phonenumber || "",
                email: initialData.email || ""
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className="form-container" onSubmit={(e) => { e.preventDefault(); onAdd(formData); }}>
            <h3 className="form-title">{initialData ? "Modifier le Contact" : "Nouveau Contact"}</h3>
            <div className="input-group">
                <input type="text" name="surname" placeholder="Nom" required value={formData.surname} onChange={handleChange} />
                <input type="text" name="firstname" placeholder="Prénom" required value={formData.firstname} onChange={handleChange} />
            </div>
            <input type="tel" name="phonenumber" placeholder="Numéro" required value={formData.phonenumber} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            
            <div className="form-actions">
                <Button label="Annuler" variant="neutral" Icon={X} action={onCancel} />
                <Button label="Enregistrer" variant="primary" type="submit" Icon={Save} />
            </div>
        </form>
    );
};

export default AddContactForm;