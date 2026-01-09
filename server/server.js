const express = require("express")
const cors = require("cors")

// Création du serveur 
const app = express()
const PORT = 5000

// Middlewares
app.use(cors())
app.use(express.json())

// Route de test
app.get("/api/health", (req, res) => {
    res.json({ status: "Server is running" });
})

// APIs et Utilisation
const contacts = require("./routes/contacts")
const notes = require("./routes/notes")
const todos = require("./routes/todos")

app.use(contacts)
app.use(notes)
app.use(todos)

// Lancement du serveur
app.listen(PORT, () => {console.log(`Serveur lancé sur http://localhost:${PORT}`)})