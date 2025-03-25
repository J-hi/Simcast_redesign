import React, { useState, useEffect } from 'react';

const SignInModal = ({ isOpen, onClose, onSignInSuccess, onSwitchToSignUp, prefilledCredentials = null }) => {
  // Form state
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    auth: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Update form data if prefilled credentials are provided (from sign up)
  useEffect(() => {
    if (prefilledCredentials) {
      setEmailValue(prefilledCredentials.email || '');
      setPasswordValue(prefilledCredentials.password || '');
    }
  }, [prefilledCredentials]);

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);

    // Clear errors when typing
    if (formErrors.email) {
      setFormErrors({
        ...formErrors,
        email: ''
      });
    }

    // Clear auth error on any change
    if (formErrors.auth) {
      setFormErrors({
        ...formErrors,
        auth: ''
      });
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);

    // Clear errors when typing
    if (formErrors.password) {
      setFormErrors({
        ...formErrors,
        password: ''
      });
    }

    // Clear auth error on any change
    if (formErrors.auth) {
      setFormErrors({
        ...formErrors,
        auth: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', auth: '' };

    // Email validation
    if (!emailValue) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!passwordValue) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (passwordValue.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);

        // Check if user exists in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);

            // In a real app, we'd check against a backend
            // For demo purposes, we're checking if email matches and assuming password is correct if it comes from signup
            if (user.email === emailValue && (prefilledCredentials?.password === passwordValue)) {
              setSubmitSuccess(true);

              // Close modal after success
              setTimeout(() => {
                onClose();

                // Notify parent component of successful sign in
                if (onSignInSuccess) {
                  onSignInSuccess(user);
                }

                // Reset form
                setEmailValue('');
                setPasswordValue('');
                setSubmitSuccess(false);
              }, 1500);
            } else {
              // Show authentication error
              setFormErrors({
                ...formErrors,
                auth: 'Invalid email or password'
              });
            }
          } catch (error) {
            console.error('Error parsing stored user:', error);
            localStorage.removeItem('user');
          }
        } else {
          // No user found
          setFormErrors({
            ...formErrors,
            auth: 'No account found with this email. Please sign up.'
          });
        }
      }, 1000);
    }
  };

  // Switch to sign up modal
  const handleSwitchToSignUp = (e) => {
    if (e) {
      e.preventDefault();
    }
    onClose();
    if (onSwitchToSignUp) {
      onSwitchToSignUp();
    }
  };

  // Handle modal click to prevent closing when clicking inside
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1040,
          backgroundColor: '#000',
          opacity: 0.5
        }}
      ></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="signInModalLabel"
        onClick={onClose}
        style={{
          display: 'block',
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 2000,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={handleModalClick}
          style={{
            margin: '1.75rem auto',
            width: '92%',
            maxWidth: '92%',
            position: 'relative'
          }}
        >
          <div
            className="modal-content"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              backgroundColor: 'var(--color-bg-header)',
              borderRadius: '0.5rem',
              outline: 0,
              overflow: 'hidden'
            }}
          >
            <div className="modal-header" style={{ padding: '1rem 1.25rem', borderBottom: '0.5px solid var(--color-search-bg)' }}>
              <h5 className="modal-title " id="signInModalLabel">Sign In</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
                style={{ background: 'transparent', border: '0', fontSize: '1.5rem', fontWeight: 700, }}
                
              > <img src="https://img.icons8.com/?size=100&id=13176&format=png&color=000000" alt="Close" style={{ width: '16px', height: '16px' }} /></button>
            </div>
            <div className="modal-body" style={{ padding: '1.5rem 1.25rem' }}>
              {submitSuccess ? (
                <div className="alert alert-success" role="alert">
                  Sign in successful! Redirecting...
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="signin-form">
                  {formErrors.auth && (
                    <div className="alert alert-danger" role="alert" style={{ display: 'block', width: '100%' }}>
                      {formErrors.auth}
                    </div>
                  )}

                  <div className="mb-3" style={{ marginBottom: '1rem' }}>
                    <label
                      htmlFor="mobile-signin-email"
                      className="form-label"
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      id="mobile-signin-email"
                      name="email"
                      value={emailValue}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      disabled={isSubmitting}
                      autoComplete="email"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'var(--gray-900)',
                        backgroundColor: 'var(--gray-100)',
                        backgroundClip: 'padding-box',
                        border: '0.5px solid var(--primary-800)',
                        appearance: 'none',
                        borderRadius: '0.375rem',
                        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                      }}
                    />
                    {formErrors.email && (
                      <div
                        className="invalid-feedback"
                        style={{
                          display: 'block',
                          width: '100%',
                          marginTop: '0.25rem',
                          fontSize: '0.875em',
                          color: '#dc3545'
                        }}
                      >
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  <div className="mb-4" style={{ marginBottom: '1.5rem' }}>
                    <label
                      htmlFor="mobile-signin-password"
                      className="form-label"
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                      id="mobile-signin-password"
                      name="password"
                      value={passwordValue}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      disabled={isSubmitting}
                      autoComplete="current-password"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'var(--gray-900)',
                        backgroundColor: 'var(--gray-100)',
                        backgroundClip: 'padding-box',
                        border: '0.5px solid var(--primary-800)',
                        appearance: 'none',
                        borderRadius: '0.375rem',
                        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                      }}
                    />
                    {formErrors.password && (
                      <div
                        className="invalid-feedback"
                        style={{
                          display: 'block',
                          width: '100%',
                          marginTop: '0.25rem',
                          fontSize: '0.875em',
                          color: '#dc3545'
                        }}
                      >
                        {formErrors.password}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 form-check" style={{ marginBottom: '1rem' }}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="mobile-remember-me"
                      style={{
                        width: '1.2em',
                        height: '1.2em',
                        marginRight: '0.5rem',
                        verticalAlign: 'top',
                        backgroundColor: '#fff',
                        borderColor: '#adb5bd',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderRadius: '0.25em'
                      }}
                    />
                    <label className="form-check-label" htmlFor="mobile-remember-me">
                      Remember me
                    </label>
                  </div>

                  <div className="d-grid gap-2" style={{ display: 'grid', gap: '0.5rem' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                      style={{
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#fff',
                        backgroundColor: '#0d6efd',
                        borderColor: '#0d6efd',
                        textAlign: 'center',
                        textDecoration: 'none',
                        verticalAlign: 'middle',
                        borderRadius: '0.375rem',
                        border: '1px solid transparent'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : 'Sign In'}
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer" style={{ padding: '1rem 1.25rem', borderTop: '1px solid #dee2e6' }}>
              <div className="w-100 text-center">
                <a
                  href="#"
                  className="text-decoration-none me-3"
                  style={{ marginRight: '1rem', color: '#0d6efd', textDecoration: 'none' }}
                >
                  Forgot password?
                </a>
                <span className="mx-2">•</span>
                <a
                  href="#"
                  className="text-decoration-none"
                  onClick={handleSwitchToSignUp}
                  style={{ color: '#0d6efd', textDecoration: 'none' }}
                >
                  Create account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInModal;
