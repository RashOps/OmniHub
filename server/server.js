const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

// Création du serveur 
const app = express()
const PORT = 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Route de test
app.get("/api/health", (req, res) => {
    res.json({ status: "Server is running" });
})

// APIs et Utilisation
const contacts = require("./routes/contacts")
const notes = require("./routes/notes")
const todos = require("./routes/todos")

app.use("/api/contacts", contacts)
app.use("/api/notes", notes)
app.use("/api/todos", todos)

// Lancement du serveur
app.listen(PORT, () => {console.log(`Serveur lancé sur http://localhost:${PORT}`)})