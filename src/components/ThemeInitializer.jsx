import { useEffect } from 'react';

// This component doesn't render anything, it just initializes the theme
const ThemeInitializer = () => {
  useEffect(() => {
    // Check for saved theme preference or use the browser preference
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme) {
      // If we have a saved preference, use it
      document.documentElement.setAttribute(
        'data-theme',
        JSON.parse(savedTheme) ? 'dark' : 'light'
      );
    } else {
      // Check for browser preference
      const prefersDarkMode = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      document.documentElement.setAttribute(
        'data-theme',
        prefersDarkMode ? 'dark' : 'light'
      );

      // Save the preference
      localStorage.setItem('darkMode', prefersDarkMode ? 'true' : 'false');
    }
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ThemeInitializer;
