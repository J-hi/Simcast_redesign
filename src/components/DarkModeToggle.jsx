import React from 'react';
import useDarkMode from '../hooks/useDarkMode';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      className="dark-mode-toggle "
      onClick={() => toggleDarkMode()}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <i className={isDarkMode ? "bi bi-sun-fill" : "bi bi-moon-fill"}></i>
    </button>
  );
};

export default DarkModeToggle;
