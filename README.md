# Gestionnaire de Vie (Contacts, Notes, Todos) - Projet Fullstack

## 1. Objectif du Projet
Développer une application web permettant de gérer ses contacts, ses notes personnelles et ses listes de tâches au même endroit.

## 2. Architecture Technique
- **Frontend :** React JS (Interface utilisateur, gestion d'état)
- **Backend :** Node.js avec Express (API REST)
- **Stockage :** Fichiers JSON (pour la simplicité).

## 3. Liste des Routes API (Backend)
Chaque ressource (Contacts, Notes, Todos) suit le schéma CRUD :

| Fonctionnalité | Méthode | Route | Description |
| :--- | :--- | :--- | :--- |
| **Contacts** | GET | `/api/contacts` | Récupérer tous les contacts |
| | POST | `/api/contacts` | Ajouter un contact |
| | DELETE | `/api/contacts/:id` | Supprimer un contact |
| **Notes** | GET | `/api/notes` | Récupérer toutes les notes |
| | POST | `/api/notes` | Créer une note |
| **Todos** | GET | `/api/todos` | Récupérer la liste |
| | PUT | `/api/todos/:id` | Modifier le statut (fait/à faire) |