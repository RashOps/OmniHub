const express = require("express")
const router = express.Router()

// Routes To-do
router.get("/api/todos", (req, res) => {
    res.json({ test:"todo" });
})

router.post("/api/todos", (req, res) => {
    
})

router.put("/api/todos/:id", (req, res) => {
    
})

router.delete("/api/todos/:id", (req, res) => {
    
})

module.exports = router