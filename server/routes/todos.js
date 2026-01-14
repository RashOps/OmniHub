const express = require("express")
const Joi = require('joi')
const router = express.Router()
const { readFile, writeFile } = require("../utils/fileHandler")
const { v4: uuidv4 } = require("uuid")

const FILE_PATH = "todos.json"

// Creation d'un schema reutilisable
const todoSchema = {
    task: Joi.string().min(3).max(50).trim(),
    priority: Joi.string().valid("low", "medium", "high"),
    isCompleted: Joi.boolean()
}

const priorityWeights = {
    "high": 3,
    "medium": 2,
    "low": 1
};

// Routes To-do
router.get("/api/todos", async (req, res) => {
    try {
        const data = await readFile(FILE_PATH)
        const sortedData = data.sort((a, b) => {
            return priorityWeights[b.priority] - priorityWeights[a.priority];
        })
        res.json(sortedData)

    } catch (error) {
        res.status(500).json({ message: "Erreur de lecture" })
    }
})

router.post("/api/todos", async (req, res) => {
    try {
        const schema = Joi.object({
            task: todoSchema.task.required(),
            priority: todoSchema.priority.default("medium")
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: "Données invalides", details: error.details[0].message })

        const todos = await readFile(FILE_PATH)
        
        const newTodo = {
            id: uuidv4(),
            ...value,
            isCompleted: false,
            createdAt: new Date().toISOString()
        }

        todos.push(newTodo)
        await writeFile(FILE_PATH, todos)
        res.status(201).json(newTodo)

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création" })
    }
})

router.put("/api/todos/:id", async (req, res) => {
    try {
        const schema = Joi.object({
            task: todoSchema.task.optional(),
            isCompleted: todoSchema.isCompleted.optional(),
            priority: todoSchema.priority.optional()
        }).min(1)

        const {error, value} = schema.validate(req.body)
        if (error) return res.status(400).json({ error: "Données invalides", details: error.details[0].message })

        const { id } = req.params
        const todos = await readFile(FILE_PATH)
        const index = todos.findIndex(t => t.id === id)

        if (index === -1) {
            return res.status(404).json({ message: "Tache introuvable" })
        }
        
        todos[index] = { 
            ...todos[index], 
            ...value, 
            updatedAt: new Date().toISOString() }
        
        await writeFile(FILE_PATH, todos)
        res.json(todos[index])
        
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour" })
    }
})

router.delete("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todos = await readFile(FILE_PATH)
        const filteredTodos = todos.filter(t => t.id !== id)

        if (todos.length === filteredTodos.length) {
            return res.status(404).json({ message: "Tache non trouvée" })
        }

        await writeFile(FILE_PATH, filteredTodos);
        res.status(204).send()
        
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression" })
    }
})

module.exports = router