const express = require("express")
const Joi = require('joi')
const router = express.Router()
const { readFile, writeFile } = require("../utils/fileHandler")
const { v4: uuidv4 } = require("uuid")

const FILE_PATH = "contacts.json"

// Creation d'un schema reutilisable
const contactSchema = {
    surname: Joi.string().max(50).trim(),
    firstname: Joi.string().max(50).trim(),
    phonenumber: Joi.string().pattern(/^0[1-9][0-9]{8}$/).trim(),
    email: Joi.string().email().lowercase().trim()
}

// Route Contact
router.get("/api/contacts", async (req, res) => {
    try {
        const data = await readFile(FILE_PATH)
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Erreur de lecture" })
    }
})

router.post("/api/contacts", async (req, res) => {
    try {
        const schema = Joi.object({
            surname: contactSchema.surname.required(),
            firstname: contactSchema.firstname.required(),
            phonenumber: contactSchema.phonenumber.required(),
            email: contactSchema.email.optional()
        })

        const {error, value} = schema.validate(req.body)
        if (error) {
        const message = error.details[0].message.includes('pattern') 
            ? "Le format du numéro de téléphone est invalide (10 chiffres attendus)."
            : error.details[0].message
            
        return res.status(400).json({ error: "Numéro invalide", details: error.details[0].message });
    }
        
        const contacts = await readFile(FILE_PATH)

        const isDuplicate = contacts.some(c => c.email === value.email || c.phonenumber === value.phonenumber);
        if (isDuplicate) {
            return res.status(409).json({ message: "Ce contact existe déjà (email ou téléphone)" });
        }

        
        const newContact = {
            id: uuidv4(),
            ...value, 
            createdAt: new Date().toISOString()
        };

        
        contacts.push(newContact)

        
        await writeFile(FILE_PATH, contacts)
        res.status(201).json(newContact)

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création" })
    }
})

router.put("/api/contacts/:id", async (req, res) => {
    try {
        const schema = Joi.object({
            surname: contactSchema.surname.optional(),
            firstname: contactSchema.firstname.optional(),
            phonenumber: contactSchema.phonenumber.optional(),
            email: contactSchema.email.optional()
        }).min(1)

        const { error, value } = schema.validate(req.body)
        if (error) return res.status(400).json({ error: "Validation failed", details: error.details[0].message })

        const { id } = req.params
        const contacts = await readFile(FILE_PATH);
        const index = contacts.findIndex(c => c.id === id);

        if (index === -1) return res.status(404).json({ message: "Contact non trouvé" });

        // Update avec Merge
        contacts[index] = { 
            ...contacts[index], 
            ...value, 
            updatedAt: new Date().toISOString() 
        };

        await writeFile(FILE_PATH, contacts)
        res.json(contacts[index])

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
    }
})

router.delete("/api/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params
        const contacts = await readFile(FILE_PATH)

        const filteredContacts = contacts.filter(c => c.id !== id)

        await writeFile(FILE_PATH, filteredContacts);
        res.status(204).send()

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression" })
    }
})

module.exports = router