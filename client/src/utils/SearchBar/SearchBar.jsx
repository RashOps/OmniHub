import "./SearchBar.css"
import { Search } from "lucide-react"

const SearchBar = ({ name, placeholder, onSearchChange }) => {
    return (
        <div className="searchbar-wrapper">
            <Search size={18} className="search-icon" />
            <input 
                type="text" 
                name={name} 
                onChange={(e) => onSearchChange(e.target.value)} 
                placeholder={placeholder || "Rechercher..."}
                className="search-input"
            />
        </div>
    )
}

export default SearchBar