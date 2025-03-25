import React, { useState, useRef, useEffect } from 'react';

const UserAccountMenu = ({ user, onSignOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef(null);

  // Toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle clicks outside the menu to close it
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // Add event listener for clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Handle sign out with animation
  const handleSignOut = () => {
    setIsSigningOut(true);
    setMenuOpen(false);

    // Show loading for 1 second then sign out
    setTimeout(() => {
      setIsSigningOut(false);
      if (onSignOut) {
        onSignOut();
      }
    }, 1000);
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

      <div className="user-account position-relative" ref={menuRef}>
        {/* User avatar/button */}
        <button
          className="btn user-avatar-button p-0"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-haspopup="true"
        >
          {/* You can replace this with an actual profile image if available */}
          <div className="user-avatar rounded-circle d-flex align-items-center justify-content-center">
            {getInitials()}
          </div>
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="user-menu position-absolute mt-2 end-0 shadow" style={{ minWidth: '280px' }}>
            <div className="card border-0">
              <div className="card-header bg-transparent d-flex align-items-center border-bottom">
                <div className="user-avatar rounded-circle d-flex align-items-center justify-content-center me-3">
                  {getInitials()}
                </div>
                <div>
                  <h6 className="mb-0">{getDisplayName()}</h6>
                  <span className="text-secondary small">{user.email}</span>
                </div>
              </div>
              <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item border-0">
                    <a href="#" className="d-flex align-items-center text-decoration-none">
                      <i className="bi bi-person-circle me-3"></i>
                      Manage your Account
                    </a>
                  </li>
                  <li className="list-group-item border-0">
                    <a href="#" className="d-flex align-items-center text-decoration-none">
                      <i className="bi bi-gear me-3"></i>
                      Settings
                    </a>
                  </li>
                  <li className="list-group-item border-0">
                    <a href="#" className="d-flex align-items-center text-decoration-none">
                      <i className="bi bi-stars me-3"></i>
                      Your Interests
                    </a>
                  </li>
                  <li className="list-group-item border-0">
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-footer bg-transparent text-center small text-secondary">
                <p className="mb-0">Privacy Policy • Terms of Service</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserAccountMenu;
