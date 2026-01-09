const express = require("express")
const router = express.Router()
const { readFile, writeFile } = require("../utils/fileHandler")
const { v4: uuidv4 } = require("uuid")

// Route Contact
router.get("/api/contacts", async (req, res) => {
    try {
        const data = await readFile("contacts.json")
        res.json(data); // On attend d'avoir les data avant d'envoyer
    } catch (error) {
        res.status(500).json({ message: "Erreur de lecture" })
    }
})

router.post("/api/contacts", async (req, res) => {
    // console.log(req.body)

    try {
        // 1. Lire la liste actuelle
        const contacts = await readFile("contacts.json")

        // 2. Créer le nouveau contact en fusionnant l'ID et le corps de la requête
        const newContact = {
            id: uuidv4(),
            ...req.body // On "étale" les données reçues (nom, tel, etc.)
        };

        // 3. Ajouter au tableau
        contacts.push(newContact)

        // 4. Sauvegarder la liste mise à jour
        await writeFile("contacts.json", contacts)

        res.status(201).json(newContact)
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création" })
    }
})

router.put("/api/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body; // Les nouvelles infos envoyées par le client

        // 1. Lire les données existantes
        const contacts = await readFile("contacts.json");

        // 2. Vérifier si le contact existe avant de faire quoi que ce soit
        const contactExists = contacts.some(c => c.id === id);
        if (!contactExists) {
            return res.status(404).json({ message: "Contact non trouvé" });
        }

        // 3. Créer le nouveau tableau avec la modification
        const updatedContacts = contacts.map(contact => {
            if (contact.id === id) {
                // On fusionne l'ancien contact avec les nouveaux champs
                // L'ID reste inchangé car il est déjà dans 'contact'
                return { ...contact, ...updatedFields };
            }
            return contact; // On ne touche pas aux autres
        });

        // 4. Sauvegarder dans le fichier JSON
        await writeFile("contacts.json", updatedContacts);

        // 5. Trouver le contact modifié pour le renvoyer (optionnel mais recommandé)
        const finalContact = updatedContacts.find(c => c.id === id);
        res.json(finalContact);

    } catch (error) {
        console.error("Erreur PUT contacts:", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour" });
    }
})

router.delete("/api/contacts/:id", async (req, res) => {
    try {
        const { id } = req.params
        const contacts = await readFile("contacts.json")

        // On garde tout SAUF celui qui a l'ID correspondant
        const filteredContacts = contacts.filter(c => c.id !== id)

        await writeFile("contacts.json", filteredContacts);
        res.status(204).send("Contact supprimé"); // 204 = Succès, mais rien à renvoyer
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression" })
    }
})

module.exports = router