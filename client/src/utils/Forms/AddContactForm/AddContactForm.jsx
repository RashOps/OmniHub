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
        if (name === "phonenumber") {
            const onlyNums = value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 10) {
            setFormData(prev => ({ ...prev, [name]: onlyNums }));
        }
        return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isPhoneValid = /^0[1-9][0-9]{8}$/.test(formData.phonenumber);
    
    const isFormValid = formData.surname.trim() !== "" && 
                        formData.firstname.trim() !== "" && 
                        isPhoneValid;

    return (
        <form className="form-container" onSubmit={(e) => { e.preventDefault(); onAdd(formData); }}>
            <h3 className="form-title">{initialData ? "Modifier le Contact" : "Nouveau Contact"}</h3>
            <div className="input-group">
                <input type="text" name="surname" placeholder="Nom" required maxLength={50} value={formData.surname} onChange={handleChange} />
                <input type="text" name="firstname" placeholder="Prénom" required maxLength={50} value={formData.firstname} onChange={handleChange} />
            </div>

            <input type="tel" name="phonenumber" placeholder="Numéro (ex: 06...)" required pattern="0[1-9][0-9]{8}" className={formData.phonenumber.length > 0 && !isPhoneValid ? "input-error" : ""} value={formData.phonenumber} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            
            <div className="form-actions">
                <Button label="Annuler" variant="neutral" disabled={!isFormValid} Icon={X} action={onCancel} />
                <Button label="Enregistrer" variant="primary" type="submit" Icon={Save} />
            </div>
        </form>
    );
};

export default AddContactForm;