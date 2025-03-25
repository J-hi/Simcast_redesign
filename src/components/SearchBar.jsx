import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, autoFocus = false, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus the search input when requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      if (onClose) onClose();
      return;
    }

    setIsSearching(true);

    // Call the onSearch prop with the search term
    if (onSearch) {
      onSearch(searchTerm);
    }

    // Clear search term after search
    setSearchTerm('');
    setIsSearching(false);
  };

  // Handle escape key to close search
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  };

  // Determine if this is likely a mobile search (simplified design)
  const isMobileStyle = !!onClose; // If onClose is provided, we assume it's the mobile overlay

  return (
    <div className="search-container flex-grow-1 position-relative">
      <form onSubmit={handleSearch}>
        <div className={`input-group ${isMobileStyle ? 'mobile-style' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Search for topics, locations & sources"
            aria-label="Search"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn"
            type="submit"
            disabled={isSearching}
          >
            {isSearching ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-search"></i>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
