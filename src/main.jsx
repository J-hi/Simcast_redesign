import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import jQuery for Bootstrap
import 'jquery/dist/jquery.min.js'

// Import our theme CSS first (for variable definitions)
import './styles/theme.css' // Added import for theme CSS

// Import our custom CSS
import './styles/globals.css'
import './styles/components.css'
import './styles/mobile-fixes.css' // Import the new mobile-fixes.css file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
