import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const CategoryAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const accordionRef = useRef(null);

  // Define categories
  const categories = [
    { name: 'For You', path: '/' },
    { name: 'Headlines', path: '/headlines' },
    { name: 'India', path: '/india' },
    { name: 'World', path: '/world' },
    { name: 'Business', path: '/business' },
    { name: 'Technology', path: '/technology' },
    { name: 'Entertainment', path: '/entertainment' },
    { name: 'Sports', path: '/sports' },
    { name: 'Science', path: '/science' },
    { name: 'Health', path: '/health' }
  ];

  // Toggle the accordion
  const toggleAccordion = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsOpen(!isOpen);
  };

  
  const handleClickOutside = useCallback((e) => {
    if (accordionRef.current && !accordionRef.current.contains(e.target) && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  // Close on Escape key
  const handleEscKey = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  // Add event listeners
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    // Add a touchstart event listener for mobile devices
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside, handleEscKey]);

  return (
    <div className="category-accordion position-relative" ref={accordionRef}>
      <button
        className={`btn d-flex align-items-center ${isOpen ? 'active' : ''}`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls="categoriesCollapse"
      >
        <span className="me-1">Categories</span>
        <i
          className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}
          aria-hidden="true"
        ></i>
      </button>

      <div
        id="categoriesCollapse"
        className={`category-menu position-absolute mt-1 shadow ${isOpen ? 'show' : ''}`}
        style={{
          display: isOpen ? 'block' : 'none',
          minWidth: '200px',
          zIndex: 1000
        }}
      >
        <div className="list-group">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="list-group-item list-group-item-action border-0 py-2 px-3"
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryAccordion;
