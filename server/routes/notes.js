const express = require("express")
const Joi = require('joi')
const router = express.Router()
const { readFile, writeFile } = require("../utils/fileHandler")
const { v4: uuidv4 } = require("uuid")

const FILE_PATH = "notes.json"

// Route GET : Récupérer toutes les notes
router.get("/api/notes", async (req, res) => {
    try {
        const data = await readFile(FILE_PATH)
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Erreur de lecture" })
    }
});

// Route POST : Créer une note
router.post("/api/notes", async (req, res) => {
    try {
        const data = await readFile(FILE_PATH)
        const newNote = {
            id: uuidv4(), 
            ...req.body,
            "createdAt": new Date().toISOString()   
        }

        data.push(newNote)
        await writeFile(FILE_PATH, data)
        
        res.status(201).json(newNote) 
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création" })
    }
});

// Route PUT : Update
router.put("/api/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const notes = await readFile(FILE_PATH)
        const index = notes.findIndex(n => n.id === id)

        if (index === -1) {
            return res.status(404).json({ message: "Note introuvable" })
        }

        // Merge des données existantes avec les modifications
        notes[index] = { 
            ...notes[index], 
            ...req.body,
            "createdAt": new Date().toISOString()
        }
        
        await writeFile(FILE_PATH, notes)
        res.json(notes[index])

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour" })
    }
});

// Route DELETE
router.delete("/api/notes/:id", async (req, res) => {
    try {
        const { id } = req.params
        const notes = await readFile(FILE_PATH)
        const filteredNotes = notes.filter(n => n.id !== id) 

        if (notes.length === filteredNotes.length) {
            return res.status(404).json({ message: "Note non trouvée" })
        }

        await writeFile(FILE_PATH, filteredNotes);
        res.status(200).json({ message: "Suppression effectuée" }) // 204 No Content : succès sans corps de réponse

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression" })
    }
});

module.exports = router;