const express = require("express")
const cors = require("cors")

// Création du serveur 
const app = express()
const PORT = 5000

// Middlewares
app.use(cors())
app.use(express.json())

// --- ROUTES API ---

// Route de test
app.get("/api/health", (req, res) => {
    res.json({ status: "Server is running" });
})

// Route Contact
app.get("/api/contact", (req, res) => {
    res.json({ test:"contact" });
})

app.post("/api/contacts", (req, res) => {

})

app.put("/api/contacts", (req, res) => {

})

app.delete("/api/contacts/:id", (req, res) => {

})

// Route Notes
app.get("/api/notes", (req, res) => {
    res.json({ test:"notes" })
})

app.post("/api/notes", (req, res) => {
    
})

app.put("/api/notes/:id", (req, res) => {
    
})

app.delete("/api/notes/:id", (req, res) => {
    
})

// Routes To-do
app.get("/api/todo", (req, res) => {
    res.json({ test:"todo" });
})

app.post("/api/todo", (req, res) => {
    
})

app.put("/api/todo/:id", (req, res) => {
    
})

app.delete("/api/todo/:id", (req, res) => {
    
})

// Lancement du serveur
app.listen(PORT, () => {console.log(`Serveur lancé sur http://localhost:${PORT}`)})