const express = require("express")
const Joi = require('joi')
const router = express.Router()
const { readFile, writeFile } = require("../utils/fileHandler")
const { v4: uuidv4 } = require("uuid")

const FILE_PATH = "todos.json"

// Routes To-do
router.get("/api/todos", async (req, res) => {
    try {
        const data = await readFile(FILE_PATH)
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: "Erreur de lecture" })
    }
})

router.post("/api/todos", async (req, res) => {
    try {
        const todos = await readFile(FILE_PATH)
        
        const newTodo = {
            id: uuidv4(),
            ...req.body,
            "isCompleted": false,
            "priority": req.body.priority || "medium",
            "createdAt": new Date().toISOString()
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
        const { id } = req.params
        const todos = await readFile(FILE_PATH)
        const index = todos.findIndex(t => t.id === id)

        if (index === -1) {
            return res.status(404).json({ message: "Tache introuvable" })
        }
        
        todos[index] = { 
            ...todos[index], 
            ...req.body, 
            "isCompleted": req.body.isCompleted,
            "priority": req.body.priority,
            "createdAt": new Date().toISOString() }
        
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
        res.status(200).json({ message: "Suppression effectuée" })

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression" })
    }
})

module.exports = router