const express = require("express")
const router = express.Router()

// Route Notes
router.get("/api/notes", (req, res) => {
    res.json({ test:"notes" })
})

router.post("/api/notes", (req, res) => {
    
})

router.put("/api/notes/:id", (req, res) => {
    
})

router.delete("/api/notes/:id", (req, res) => {
    
})

module.exports = router