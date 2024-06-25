import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css'; // Asegúrate de crear este archivo CSS

const GlobalSearch = ({ routes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (path) => {
    navigate(path);
  };

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="global-search">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && filteredRoutes.length > 0 && (
        <ul className="search-results">
          {filteredRoutes.map((route) => (
            <li key={route.path} onMouseDown={() => handleSelect(route.path)}>
              {route.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GlobalSearch;
