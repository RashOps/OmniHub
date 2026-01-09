const fs = require("fs/promises");
const paths = require("path");

async function readFile(fileName) {
    const fullPath = paths.join(__dirname, "..", "data", fileName);

    try {
        const content = await fs.readFile(fullPath, "utf-8");
        
        return JSON.parse(content);
    } catch (error) {
        console.error("Erreur de lecture :", error.message);
        return []; 
    }
}

async function writeFile(fileName, data) {
    const fullPath = paths.join(__dirname, "..", "data", fileName);

    try {
        const jsonString = JSON.stringify(data, null, 2);
        
        await fs.writeFile(fullPath, jsonString, "utf-8");
        
        return true;
    } catch (error) {
        console.error("Erreur d'écriture :", error.message);
        return false; 
    }
}

module.exports = { readFile, writeFile };