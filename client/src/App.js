import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import ToDoList from "./ToDoComponents/ToDoList";
import ContactList from "./ContactComponents/ContactList";
import NoteList from "./NoteComponents/NoteList";
import AddContactForm from "./utils/Forms/AddContactForm/AddContactForm";
import AddNoteForm from "./utils/Forms/AddNoteForm/AddNoteForm";

// Import de tes services Ky
import { todoService } from "./services/todoService";
import { contactService } from "./services/contactService";
import { noteService } from "./services/noteService";

function App() {
  // 1. États pour stocker les données JSON
  const [todos, setTodos] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fonction de chargement globale
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // On lance les 3 appels en parallèle pour plus de performance
      const [todosData, contactsData, notesData] = await Promise.all([
        todoService.getAll(),
        contactService.getAll(),
        noteService.getAll()
      ]);

      setTodos(todosData);
      setContacts(contactsData);
      setNotes(notesData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setIsLoading(false);
    }
  };

  // États de visibilité pour les modales 
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  // --- LOGIQUE CONTACTS ---
  const handleCreateContact = async (newContact) => {
    try {
      const created = await contactService.create(newContact);
      setContacts([...contacts, created]); // Mise à jour "Optimiste" du State
      setIsContactModalOpen(false); // On ferme la fenêtre après succès 
    } catch (error) {
      alert(error); // À remplacer par un message Joi plus tard
    }
  };

  // --- LOGIQUE NOTES ---
  const handleCreateNote = async (newNote) => {
    try {
      const created = await noteService.create(newNote);
      setNotes([...notes, created]);
      setIsNoteModalOpen(false);
    } catch (error) {
      alert(error);
    }
  };

  // 3. Appel au démarrage
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="App">
      <NavBar />
      
      {isLoading ? (
        <div className="loading-screen">Chargement de OmniHub...</div>
      ) : (
        <main className="dashboard-grid">
          {/* On passe les données aux composants via les Props */}
          <section className="todo-column">
            <ToDoList 
              items={todos} 
              onAdd={(newTask) => {/* Logique POST à venir */}}
            />
          </section>

          <section className="contact-column">
            <ContactList 
              items={contacts} 
              onAddClick={() => setIsContactModalOpen(true)} 
            />
          </section>

          <section className="note-column">
            <NoteList 
              items={notes} 
              onAddClick={() => setIsNoteModalOpen(true)} 
            />
          </section>

          {/* Rendu Conditionnel des Modales avec effet Flou [cite: 13, 19] */}
          {isContactModalOpen && (
            <div className="modal-overlay">
              <AddContactForm 
                onAdd={handleCreateContact} 
                onCancel={() => setIsContactModalOpen(false)} 
              />
            </div>
          )}

          {isNoteModalOpen && (
            <div className="modal-overlay">
              <AddNoteForm 
                onAdd={handleCreateNote} 
                onCancel={() => setIsNoteModalOpen(false)} 
              />
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;