# OmniHub - Dashboard d'Organisation Personnelle (Fullstack)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Joi](https://img.shields.io/badge/Joi-BF360C?style=for-the-badge&logo=joi&logoColor=white)

---

## 1. Objectif du Projet
**OmniHub** est une application web centralisée conçue pour optimiser la gestion quotidienne. Elle regroupe trois piliers de la productivité : la gestion des tâches (**To-Do**), un répertoire de **Contacts** et une prise de **Notes** rapide. L'interface utilise les principes du **Glassmorphism** pour un rendu moderne et professionnel.

---

## 2. Architecture Technique
L'application repose sur une architecture découplée (Frontend/Backend) garantissant une séparation claire des responsabilités :

### **Frontend**
* **React JS** : Gestion d'état complexe et interface réactive.
* **CSS3 (Custom)** : Design responsive propriétaire, Grid Layout (1.2fr/1fr) et Glassmorphism.
* **Ky** : Client HTTP moderne pour des appels API simplifiés.
* **Lucide-React** : Bibliothèque d'icônes vectorielles.

### **Backend**
* **Node.js & Express** : Serveur d'API REST.
* **Joi** : Schémas de validation de données robustes pour sécuriser les entrées.
* **JSON Storage** : Persistance des données via des fichiers locaux pour une légèreté maximale.

---

## 3. Fonctionnalités Avancées

### 🚀 Logique métier "Senior"
* **Tri Intelligent (Priority Sorting)** : Les tâches sont classées par poids de priorité (High > Medium > Low) et par statut (les tâches complétées descendent automatiquement).
* **Moteur de Recherche** : Filtrage dynamique en temps réel sur les trois modules via le "Computed State".
* **UX Premium** : Implémentation de **Skeleton Screens** pour masquer le temps de chargement des données.

### 📱 Responsive Design
* Adaptation dynamique pour mobiles et tablettes (breakpoints à 1024px et 600px).
* Optimisation des zones de saisie et des boutons pour une utilisation tactile fluide.

---

## 4. Documentation de l'API (CRUD Intégral)

Toutes les routes sont préfixées par `/api`. La validation **Joi** est appliquée sur chaque requête `POST` et `PUT`.

| Ressource | Méthode | Route | Description |
| :--- | :--- | :--- | :--- |
| **Todos** | GET | `/api/todos` | Liste triée par priorité et statut |
| | POST | `/api/todos` | Création d'une tâche (Validation Joi) |
| | PUT | `/api/todos/:id` | Modification (Task, Priority, isCompleted) |
| | DELETE | `/api/todos/:id` | Suppression unitaire ou en masse |
| **Contacts** | GET | `/api/contacts` | Récupération de l'ensemble du répertoire |
| | POST | `/api/contacts` | Ajout d'un nouveau contact |
| | PUT | `/api/contacts/:id` | Mise à jour complète du contact (Edit mode) |
| | DELETE | `/api/contacts/:id` | Suppression définitive d'un contact |
| **Notes** | GET | `/api/notes` | Récupération des notes personnelles |
| | POST | `/api/notes` | Création d'une note (Titre et Contenu) |
| | PUT | `/api/notes/:id` | Modification d'une note existante |
| | DELETE | `/api/notes/:id` | Suppression d'une note ou de la totalité |

---

## 5. Structure du Projet
```text
src/
├── ToDoComponents/       # Logique de gestion des tâches
├── NavBar/               # Barre de navigation
├── ContactComponents/    # Gestion du répertoire
├── NoteComponents/       # Gestion des notes
├── services/             # Abstraction des appels API (Ky services)
├── utils/
|   ├── Button/           # Butttons génériques
│   ├── Forms/            # Formulaires génériques (AddTodo, AddContact...)
│   ├── ItemCard/         # Composant d'affichage partagé
|   ├── SearchBar/        # Barre de recherche partagée
│   └── Skeleton/         # Placeholders de chargement animé
└── App.js                # Contrôleur principal et gestion d'état
```

## 6. Installation et Lancement
Prérequis
Node.js installé (v14+) : npm ou yarn

### Installation  
Cloner le repository :
```
git clone https://github.com/RashOps/OmniHub.git
cd omnihub
```
Installer les dépendances du Serveur :
```
cd server
npm install
```
Installer les dépendances du Client :
```
cd ../client
npm install
```
### Lancement  
Lancer le serveur backend (depuis le dossier server) :
```
npx nodemon
```
Lancer le frontend (depuis le dossier client) :
```
npm start
```

L'application est disponible sur http://localhost:3000