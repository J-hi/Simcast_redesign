import { useState, useEffect } from 'react';

const useDarkMode = () => {
  // Check if we're in the browser and if user had a preference already stored
  const getStoredDarkMode = () => {
    return typeof window !== 'undefined' && localStorage.getItem('darkMode');
  };

  // Default to light mode if not stored, or use the stored preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = getStoredDarkMode();
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  // Effect to update body when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // Check for user's system preference on initial render
  useEffect(() => {
    // Check for initial system preference only if no stored preference
    const storedDarkMode = getStoredDarkMode();

    if (storedDarkMode === null) {
      const prefersDarkMode = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      setIsDarkMode(prefersDarkMode);
    }

    // Set up listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only update if user hasn't set explicit preference
      if (localStorage.getItem('userSetPreference') !== 'true') {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle function with ability to explicitly set dark mode
  const toggleDarkMode = (value) => {
    const newValue = value !== undefined ? value : !isDarkMode;
    setIsDarkMode(newValue);
    localStorage.setItem('userSetPreference', 'true');
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
