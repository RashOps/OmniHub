const express = require("express")
const Joi = require('joi')
const router = express.Router()
const { readFile, writeFile } = require("../utils/fileHandler")
const { v4: uuidv4 } = require("uuid")

const FILE_PATH = "notes.json"

// Creation d'un schema reutilisable
const noteSchema = {
    title: Joi.string().min(5).max(20).trim(),
    content: Joi.string().max(500).trim()
}

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
        const schema = Joi.object({
            title: noteSchema.title.required(),
            content: noteSchema.content.required()
        })
        const {error, value} = schema.validate(req.body)
        if (error) return res.status(400).json({ error: "Données invalides", details: error.details[0].message })

        const notes = await readFile(FILE_PATH)
        const newNote = {
            id: uuidv4(), 
            ...value,
            createdAt: new Date().toISOString()   
        }

        notes.push(newNote)
        await writeFile(FILE_PATH, notes)
        res.status(201).json(newNote) 

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création" })
    }
});

// Route PUT : Update
router.put("/api/notes/:id", async (req, res) => {
    try {
        const schema = Joi.object({
            title: noteSchema.title.optional(),
            content: noteSchema.content.optional()
        }).min(1)
        const {error, value} = schema.validate(req.body)
        if (error) return res.status(400).json({ error: "Données invalides", details: error.details[0].message })
        
        const { id } = req.params;
        const notes = await readFile(FILE_PATH)
        const index = notes.findIndex(n => n.id === id)

        if (index === -1) {
            return res.status(404).json({ message: "Note introuvable" })
        }

        notes[index] = { 
            ...notes[index], 
            ...value,
            updatedAt: new Date().toISOString()
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
        res.status(204).send()

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression" })
    }
});

module.exports = router