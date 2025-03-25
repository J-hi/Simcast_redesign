import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import CategoryAccordion from './CategoryAccordion';
import UserAccountMenu from './UserAccountMenu';
import SearchBar from './SearchBar';

const Header = ({ user, onSignInClick, onSignOut }) => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchOverlayRef = useRef(null);
  const searchIconRef = useRef(null);
  const navigate = useNavigate();

  // Get user's display name
  const getDisplayName = () => {
    if (!user) return '';
    return user.name || user.email.split('@')[0];
  };

  // Get user's initials for the avatar
  const getInitials = () => {
    if (!user) return '?';

    const displayName = getDisplayName();
    const names = displayName.split(' ');

    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return displayName[0].toUpperCase();
  };

  const handleMobileSignIn = () => {
    const offcanvasElement = document.getElementById('sideMenu');
    const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (bsOffcanvas) bsOffcanvas.hide();
  
    // Delay the modal open until offcanvas closes
    setTimeout(() => {
      if (onSignInClick) onSignInClick();
    }, 300);
  };
  
  
  // Handle mobile sign out
  const handleMobileSignOut = () => {
    setIsSigningOut(true);

    // Close offcanvas menu
    const offcanvasElement = document.getElementById('sideMenu');
    const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (bsOffcanvas) {
      bsOffcanvas.hide();
    }

    // Show loading for 1 second then sign out
    setTimeout(() => {
      setIsSigningOut(false);
      if (onSignOut) {
        onSignOut();
      }
    }, 1000);
  };

  // Handle search
  const handleSearch = (term) => {
    console.log(`Searching for: ${term}`);
    // In a real app, we would perform search or redirect to results page
    setIsSearchOpen(false);
  };

  // Toggle search overlay
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Handle clicks outside the search overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen &&
        searchOverlayRef.current &&
        !searchOverlayRef.current.contains(event.target) &&
        searchIconRef.current &&
        !searchIconRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // Handle category selection in mobile mode - close the menu
  const handleCategoryClick = (path) => {
    try {
      // Get the offcanvas element
      const offcanvasElement = document.getElementById('sideMenu');

      // First, try to directly access the Bootstrap instance
      if (offcanvasElement && typeof window !== 'undefined') {
        // Method 1: Try using Bootstrap's API
        if (window.bootstrap && window.bootstrap.Offcanvas) {
          const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
          if (bsOffcanvas) {
            bsOffcanvas.hide();
            // Navigate after menu is closed
            setTimeout(() => navigate(path), 300);
            return;
          }
        }

        // Method 2: Use the data-bs-dismiss attribute programmatically
        const closeButton = offcanvasElement.querySelector('.btn-close');
        if (closeButton) {
          closeButton.click();
          // Navigate after menu is closed
          setTimeout(() => navigate(path), 300);
          return;
        }

        // Method 3: Manual DOM manipulation
        offcanvasElement.classList.remove('show');
        document.body.classList.remove('overflow-hidden');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.classList.remove('show');
          setTimeout(() => {
            backdrop.remove();
          }, 300);
        }
      }
    } catch (error) {
      console.error('Error closing mobile menu:', error);
    }

    // Navigate to the selected category
    navigate(path);
  };

  return (
    <>
      {/* Sign-out loading overlay */}
      {isSigningOut && (
        <div className="signout-overlay">
          <div className="signout-content">
            <div className="signout-spinner"></div>
            <p className="mb-0">Signing out...</p>
          </div>
        </div>
      )}

      <header className="border-bottom sticky-top bg-header">
        <div className="container-fluid">
          {/* Main Header Row */}
          <div className="row py-2 align-items-center">
            {/* Logo and Menu Button */}
            <div className="col-md-3 col-6 d-flex align-items-center">
              <button className="btn btn-sm me-2 d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sideMenu" aria-controls="sideMenu">
                <i className="bi bi-list fs-4"></i>
                <span className="d-none">Menu</span>
              </button>
              <Link to="/" className="d-flex align-items-center text-decoration-none">
              <img src="https://img.icons8.com/?size=100&id=yjkzJadsK3kX&format=png&color=000000" alt="Logo" className="custom-svg" width="50" height="50" />
                <span className="ms-2 h3 fw-bold ">Simcast</span>
              </Link>
            </div>

            {/* Desktop Middle: Categories + Search */}
            <div className="col-md-6 d-none d-md-flex align-items-center">
              {/* Desktop Categories Dropdown */}
              <div className="me-3">
                <CategoryAccordion />
              </div>

              {/* Desktop Search Bar */}
              <div className="flex-grow-1">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>

            {/* User Menu and Dark Mode */}
            <div className="col-md-3 col-6 d-flex justify-content-end align-items-center">
              {/* Mobile Search Icon */}
              <button
                ref={searchIconRef}
                className="btn btn-sm me-2 d-md-none"
                onClick={toggleSearch}
                type="button"
                aria-label="Search"
              >
                <i className="bi bi-search fs-5"></i>
              </button>

              {/* Dark Mode Toggle */}
              <DarkModeToggle />

              {/* Show Sign In button or User Account Menu based on auth state */}
              {user ? (
                <UserAccountMenu user={user} onSignOut={onSignOut} />
              ) : (
                <button
                  className="btnsn  btn-sm rounded ms-2 py-2 px-3 d-none d-md-inline-block"
                  onClick={onSignInClick}
                  type="button"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>

          {/* Mobile Search Overlay */}
          {isSearchOpen && (
            <div
              ref={searchOverlayRef}
              className="mobile-search-overlay d-md-none position-absolute start-0 end-0 p-3"
            >
              <SearchBar
                onSearch={handleSearch}
                autoFocus={true}
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Mobile Side Menu */}
        <div className="offcanvas offcanvas-start " tabIndex="-1" id="sideMenu" aria-labelledby="sideMenuLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sideMenuLabel">
              <Link to="/" className="d-flex align-items-center text-decoration-none">
              <img src="src/assets/icons8-news-48.png" alt="Logo" className="custom-svg" />
              <span className="ms-2 h3 fw-bold ">Simcast</span>
              </Link>
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>Display mode:</div>
              <DarkModeToggle />
            </div>
            <hr />
            <div className="list-group list-group-flush">
              <div onClick={() => handleCategoryClick('/')} className="list-group-item list-group-item-action">For you</div>
              <div onClick={() => handleCategoryClick('/headlines')} className="list-group-item list-group-item-action">Headlines</div>
              <div onClick={() => handleCategoryClick('/india')} className="list-group-item list-group-item-action">India</div>
              <div onClick={() => handleCategoryClick('/world')} className="list-group-item list-group-item-action">World</div>
              <div onClick={() => handleCategoryClick('/business')} className="list-group-item list-group-item-action">Business</div>
              <div onClick={() => handleCategoryClick('/technology')} className="list-group-item list-group-item-action">Technology</div>
              <div onClick={() => handleCategoryClick('/entertainment')} className="list-group-item list-group-item-action">Entertainment</div>
              <div onClick={() => handleCategoryClick('/sports')} className="list-group-item list-group-item-action">Sports</div>
              <div onClick={() => handleCategoryClick('/science')} className="list-group-item list-group-item-action">Science</div>
              <div onClick={() => handleCategoryClick('/health')} className="list-group-item list-group-item-action">Health</div>
            </div>
            <hr />
            <div className="d-grid gap-2">
              {/* Show sign in button or user info based on auth state */}
              {user ? (
                <>
                  <div className="d-flex align-items-center mb-3">
                    <div className="user-avatar rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '36px', height: '36px' }}>
                      {getInitials()}
                    </div>
                    <div>
                      <div className="fw-bold">{getDisplayName()}</div>
                      <small className="text-secondary">{user.email}</small>
                    </div>
                  </div>
                  <button className="btn btn-outline-secondary" onClick={handleMobileSignOut} type="button">Sign out</button>
                </>
              ) : (
                <button className="btnsn btn-sm rounded ms-2 py-2 px-3" onClick={handleMobileSignIn} type="button">Sign in</button>

              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
