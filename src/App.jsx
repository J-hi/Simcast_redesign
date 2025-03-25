import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ThemeInitializer from './components/ThemeInitializer';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import WeatherCarousel from './components/WeatherCarousel';
import Footer from './components/Footer';

// Import pages
import ForYou from './pages/ForYou';
import Headlines from './pages/Headlines';
import Technology from './pages/Technology';
import Business from './pages/Business';
import World from './pages/World';

// Sample weather data for multiple cities
const weatherData = [
  {
    location: 'New Delhi, IN',
    temperature: '35°C',
    condition: 'Sunny',
    high: '38°C',
    low: '27°C'
  },
  {
    location: 'Ujjain, IN',
    temperature: '32°C',
    condition: 'Partly Cloudy',
    high: '34°C',
    low: '26°C'
  },
  {
    location: 'Indore, IN',
    temperature: '33°C',
    condition: 'Clear',
    high: '35°C',
    low: '25°C'
  },
  {
    location: 'Ahmedabad, IN',
    temperature: '36°C',
    condition: 'Sunny',
    high: '39°C',
    low: '28°C'
  },
  {
    location: 'Bhopal, IN',
    temperature: '31°C',
    condition: 'Cloudy',
    high: '33°C',
    low: '24°C'
  }
];

function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [signInCredentials, setSignInCredentials] = useState(null);

  // Check localStorage for user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Open Sign In Modal
  const openSignInModal = () => {
    setIsSignInModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  // Close Sign In Modal
  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
    setSignInCredentials(null);
  };

  // Open Sign Up Modal
  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsSignInModalOpen(false);
  };

  // Close Sign Up Modal
  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  // Handle successful sign in
  const handleSignInSuccess = (userData) => {
    setUser(userData);
  };

  // Handle sign out
  const handleSignOut = () => {
    setUser(null);
    // In a real app, we would also call an API to invalidate the session
    // For this demo, we'll just remove the user from localStorage
    localStorage.removeItem('user');
  };

  // Handle sign up success and auto sign-in
  const handleSignUpSuccess = (credentials) => {
    setSignInCredentials(credentials);
    // Open sign in modal with credentials
    setTimeout(() => {
      openSignInModal();
    }, 500);
  };

  return (
    <>
      <ThemeInitializer />
      <Router>
        <div className="app d-flex flex-column min-vh-100">
          <Header
            user={user}
            onSignInClick={openSignInModal}
            onSignOut={handleSignOut}
          />

          <div className="container py-4 flex-grow-1">
            {/* Mobile Weather Section at the top - Make sure it's visible on mobile */}
            <div className="row d-block d-md-none mb-3">
              <div className="col-12">
                <h6 className="fw-bold mb-2 text-weather small">Weather Updates</h6>
                <WeatherCarousel cities={weatherData} />
              </div>
            </div>

            <div className="row justify-content-center">
              {/* Main Content - centered and with more width */}
              <div className="col-lg-8 col-md-7">
                <Routes>
                  <Route path="/" element={<ForYou />} />
                  <Route path="/headlines" element={<Headlines />} />
                  <Route path="/technology" element={<Technology />} />
                  <Route path="/business" element={<Business />} />
                  <Route path="/world" element={<World />} />
                  {/* Add paths for other categories as they are created */}
                  <Route path="*" element={<ForYou />} />
                </Routes>
              </div>

              {/* Sidebar - smaller width */}
              <div className="col-lg-4 col-md-5 d-none d-md-block">
                <Sidebar />
              </div>
            </div>
          </div>

          <Footer />

          {/* Authentication Modals */}
          <SignInModal
            isOpen={isSignInModalOpen}
            onClose={closeSignInModal}
            onSignInSuccess={handleSignInSuccess}
            onSwitchToSignUp={openSignUpModal}
            prefilledCredentials={signInCredentials}
          />

          <SignUpModal
            isOpen={isSignUpModalOpen}
            onClose={closeSignUpModal}
            onSignUpSuccess={handleSignUpSuccess}
            onSwitchToSignIn={openSignInModal}
          />
        </div>
      </Router>
    </>
  );
}

export default App;
