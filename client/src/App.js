import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import ToDoList from "./ToDoComponents/ToDoList";
import ContactList from "./ContactComponents/ContactList";
import NoteList from "./NoteComponents/NoteList";
import AddContactForm from "./utils/Forms/AddContactForm/AddContactForm";
import AddNoteForm from "./utils/Forms/AddNoteForm/AddNoteForm";
import AddTodoForm from "./utils/Forms/AddTodoForm/AddTodoForm";
import Skeleton from "./utils/Skeleton/Skeleton";

import { todoService } from "./services/todoService";
import { contactService } from "./services/contactService";
import { noteService } from "./services/noteService";

function App() {
  const [todos, setTodos] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  // --- 1. ÉTATS DE RECHERCHE (MOTEUR DE FILTRAGE) ---
  const [todoSearch, setTodoSearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const [noteSearch, setNoteSearch] = useState("");

  // --- 2. ÉTATS POUR LA MODIFICATION ---
  const [editingContact, setEditingContact] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  // --- 3. CHARGEMENT INITIAL ---
  const fetchAllData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      const [todosData, contactsData, notesData] = await Promise.all([
        todoService.getAll(),
        contactService.getAll(),
        noteService.getAll()
      ]);
      setTodos(todosData);
      setContacts(contactsData);
      setNotes(notesData);
    } catch (error) {
      console.error("Erreur de récupération :", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  // --- 4. LOGIQUE TO-DO (CRUD + QUICK ADD) ---
  const handleAddTodo = async (taskData) => {
  try {
    const cleanData = {
      task: taskData.task,
      priority: taskData.priority || "medium"
    };
    
    const res = await todoService.create(cleanData);
    setTodos([...todos, res]);
  } catch (error) {
    console.error("Erreur création :", error);
    alert("Erreur Joi : Vérifiez que le texte fait entre 3 et 50 caractères.");
  }
  };

  const handleToggleTodo = async (id) => {
  const todo = todos.find(t => t.id === id);
  const updateData = {
    isCompleted: !todo.isCompleted,
    task: todo.task,
    priority: todo.priority
  };

  try {
    const updated = await todoService.update(id, updateData);
    setTodos(todos.map(t => t.id === id ? updated : t));
  } catch (error) {
    console.error("Erreur Toggle:", error);
  }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm("Supprimer cette tâche ?")) {
      await todoService.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  const handleDeleteAllTodos = async () => {
    if (window.confirm("Vider toute la liste de tâches ?")) {
      try {
            await todoService.deleteAll();
            setTodos([]);
        } catch (error) {
            console.error("Erreur Bulk Delete:", error);
        }
    }
  };

  const handleTodoAction = async (formData) => {
  try {
    if (editingTodo) {
      const updateData = { 
        task: formData.task, 
        priority: formData.priority,
        isCompleted: editingTodo.isCompleted 
      };
      const updated = await todoService.update(editingTodo.id, updateData);
      setTodos(todos.map(t => t.id === editingTodo.id ? updated : t));
    }
    setIsTodoModalOpen(false);
    setEditingTodo(null);
  } catch (error) {
    console.error(error);
  }
  }

  const [editingTodo, setEditingTodo] = useState(null);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  // --- 5. LOGIQUE CONTACTS (CRUD + MODALE) ---
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactAction = async (formData) => {
    try {
      const cleanData = {
      surname: formData.surname,
      firstname: formData.firstname,
      phonenumber: formData.phonenumber,
      email: formData.email || ""
    }

    if (editingContact) {
      const updated = await contactService.update(editingContact.id, cleanData);
      setContacts(contacts.map(c => c.id === editingContact.id ? updated : c));
    } else {
      const created = await contactService.create(cleanData);
      setContacts([...contacts, created]);
    }
    closeContactModal();
  } catch(error) {
    console.error("Erreur Contact:", error);
    alert(error)
  }}

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setEditingContact(null);
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm("Supprimer ce contact ?")) {
      await contactService.delete(id);
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  // --- 6. LOGIQUE NOTES (CRUD + MODALE) ---
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const handleNoteAction = async (noteData) => {
    try {
      const cleanData = {
      title: noteData.title,
      content: noteData.content
    }

    if (editingNote) {
      const updated = await noteService.update(editingNote.id, cleanData);
      setNotes(notes.map(n => n.id === editingNote.id ? updated : n));
    } else {
      const created = await noteService.create(cleanData);
      setNotes([...notes, created]);
    }
    closeNoteModal();
  } catch(error) {
    console.error("Erreur Note:", error);
    alert(error)
  }}

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
    setEditingNote(null);
  };

  const handleDeleteAllNotes = async () => {
    if (window.confirm("Vider toute la liste des notes ?")) {
      try {
            await noteService.deleteAll();
            setNotes([]);
        } catch (error) {
            console.error("Erreur Bulk Delete:", error);
        }
    }
  };

  // --- 7. FILTRAGE DYNAMIQUE ---
// Définition des poids pour le calcul du tri
  const priorityWeights = { high: 3, medium: 2, low: 1 };

  const filteredTodos = todos
    .filter(t => t.task.toLowerCase().includes(todoSearch.toLowerCase()))
    .sort((a, b) => {
      // Tri par status : les tâches non-terminées en haut
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      // 2. Trie par priorité (High > Medium > Low)
      return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
    });

  const filteredContacts = contacts.filter(c => 
    `${c.firstname} ${c.surname}`.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(noteSearch.toLowerCase())
  );

  return (
    <div className="App">
      <NavBar />
      {isLoading ? (
          <main className="dashboard-grid">
            <section className="todo-column">
              <Skeleton type="title" />
              {[...Array(5)].map((_, i) => <Skeleton key={i} type="card" />)}
            </section>
            <section className="contact-column">
              <Skeleton type="title" />
              {[...Array(3)].map((_, i) => <Skeleton key={i} type="card" />)}
            </section>
          </main>
        ) : (
        <main className="dashboard-grid">
          <section className="todo-column">
            <ToDoList 
              items={filteredTodos} 
              onSearch={setTodoSearch}
              onAdd={handleAddTodo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onDeleteAll={handleDeleteAllTodos}
              onEdit={(todo) => { setEditingTodo(todo); setIsTodoModalOpen(true); }}
            />
          </section>

          <section className="contact-column">
            <ContactList 
              items={filteredContacts} 
              onSearch={setContactSearch}
              onAddClick={() => setIsContactModalOpen(true)}
              onEdit={(contact) => { setEditingContact(contact); setIsContactModalOpen(true); }}
              onDelete={handleDeleteContact}
            />
          </section>

          <section className="note-column">
            <NoteList 
              items={filteredNotes} 
              onSearch={setNoteSearch}
              onAddClick={() => setIsNoteModalOpen(true)}
              onEdit={(note) => { setEditingNote(note); setIsNoteModalOpen(true); }}
              onDelete={async (id) => { if(window.confirm("Supprimer cette note ?")) {await noteService.delete(id); setNotes(notes.filter(n => n.id !== id))} }}
              onDeleteAll={handleDeleteAllNotes}
            />
          </section>

        </main>
      )}
      {/* MODALES AVEC PRE-REMPLISSAGE (Edit ou Create) */}
      {isContactModalOpen && (
        <div className="modal-overlay">
          <AddContactForm 
            onAdd={handleContactAction} 
            onCancel={closeContactModal}
            initialData={editingContact}
          />
        </div>
      )}

      {isNoteModalOpen && (
        <div className="modal-overlay">
          <AddNoteForm 
            onAdd={handleNoteAction} 
            onCancel={closeNoteModal}
            initialData={editingNote}
          />
        </div>
      )}

      {isTodoModalOpen && (
        <div className="modal-overlay">
          <AddTodoForm 
            onAdd={handleTodoAction} 
            onCancel={() => { setIsTodoModalOpen(false); setEditingTodo(null); }}
            initialData={editingTodo} 
          />
        </div>
      )}
    </div>
  );
}

export default App;