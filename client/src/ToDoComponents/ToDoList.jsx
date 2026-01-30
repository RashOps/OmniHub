import SearchBar from "../utils/SearchBar/SearchBar"
import AddTodoQuick from "./AddTodoQuick/AddTodoQuick"
import ItemCard from "../utils/ItemCard/ItemCard"

const ToDoList = ({ items, onSearch, onAdd, onDeleteAll, onToggle, onEdit, onDelete }) => {
    return (
        <div className="todo-list-container">
            <h2>To - Do</h2>
            {/* Barre de recherche spécifique aux tâches [cite: 4, 20] */}
            <SearchBar placeholder="Rechercher une tâche..." onSearchChange={onSearch} />
            
            {/* Bloc de saisie rapide [cite: 5, 6] */}
            <AddTodoQuick onAdd={onAdd} onDeleteAll={onDeleteAll} />

            {/* Boucle de rendu des éléments  */}
            <div className="list-items-container">
                {items.map((todo) => (
                    <ItemCard 
                        key={todo.id} 
                        title={todo.task}
                        priority={todo.priority} 
                        isTodo={true}
                        isCompleted={todo.isCompleted}
                        onToggle={() => onToggle(todo.id)}
                        onEdit={() => onEdit(todo)}
                        onDelete={() => onDelete(todo.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ToDoList