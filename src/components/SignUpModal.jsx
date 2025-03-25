import React, { useState, useEffect } from 'react';

const SignUpModal = ({ isOpen, onClose, onSignUpSuccess, onSwitchToSignIn }) => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    form: ''
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

  // Handle input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (formErrors.name || formErrors.form) {
      setFormErrors({
        ...formErrors,
        name: '',
        form: ''
      });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (formErrors.email || formErrors.form) {
      setFormErrors({
        ...formErrors,
        email: '',
        form: ''
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (formErrors.password || formErrors.form) {
      setFormErrors({
        ...formErrors,
        password: '',
        form: ''
      });
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (formErrors.confirmPassword || formErrors.form) {
      setFormErrors({
        ...formErrors,
        confirmPassword: '',
        form: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      form: ''
    };

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

        // Check if user already exists
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            if (user.email === email) {
              setFormErrors({
                ...formErrors,
                form: 'An account with this email already exists. Please sign in.'
              });
              return;
            }
          } catch (error) {
            // Ignore parsing errors
            console.error('Error parsing stored user:', error);
          }
        }

        // Create new user and store in localStorage
        const newUser = {
          name: name,
          email: email,
          createdAt: new Date().toISOString()
        };

        localStorage.setItem('user', JSON.stringify(newUser));
        setSubmitSuccess(true);

        // Close modal after success
        setTimeout(() => {
          onClose();

          // Pass credentials to parent component for auto sign-in
          if (onSignUpSuccess) {
            onSignUpSuccess({
              email: email,
              password: password
            });
          }

          // Reset form
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setSubmitSuccess(false);
        }, 1500);
      }, 1000);
    }
  };

  // Switch to sign in modal
  const handleSwitchToSignIn = (e) => {
    if (e) {
      e.preventDefault();
    }
    onClose();
    if (onSwitchToSignIn) {
      onSwitchToSignIn();
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
        aria-labelledby="signUpModalLabel"
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
              backgroundColor: 'var(--color-bg-header)',  // changed
              borderRadius: '0.5rem',
              outline: 0,
              overflow: 'hidden'
            }}
          >
            <div className="modal-header" style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #dee2e6' }}>
              <h5 className="modal-title" id="signUpModalLabel">Create Account</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
                style={{ background: 'transparent', border: '0', fontSize: '1.5rem', fontWeight: 700 }}
              >
                <img src="https://img.icons8.com/?size=100&id=13176&format=png&color=000000" alt="Close" style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
            <div className="modal-body" style={{ padding: '1.5rem 1.25rem' }}>
              {submitSuccess ? (
                <div className="alert alert-success" role="alert">
                  Account created successfully! Please sign in.
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="signup-form">
                  {formErrors.form && (
                    <div className="alert alert-danger" role="alert" style={{ display: 'block', width: '100%' }}>
                      {formErrors.form}
                    </div>
                  )}

                  <div className="mb-3" style={{ marginBottom: '1rem' }}>
                    <label
                      htmlFor="mobile-signup-name"
                      className="form-label"
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                      id="mobile-signup-name"
                      name="name"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                      autoComplete="name"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'var(--gray-900)',  // updated
                        backgroundColor: 'var(--gray-100)',  // updated
                        backgroundClip: 'padding-box',
                        border: '0.5px solid var(--primary-800)',  // updated
                        appearance: 'none',
                        borderRadius: '0.375rem',
                        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                      }}
                    />
                    {formErrors.name && (
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
                        {formErrors.name}
                      </div>
                    )}
                  </div>

                  <div className="mb-3" style={{ marginBottom: '1rem' }}>
                    <label
                      htmlFor="mobile-signup-email"
                      className="form-label"
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      id="mobile-signup-email"
                      name="email"
                      value={email}
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
                        color: 'var(--gray-900)',  // updated
                        backgroundColor: 'var(--gray-100)',  // updated
                        backgroundClip: 'padding-box',
                        border: '0.5px solid var(--primary-800)',  // updated
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

                  <div className="mb-3" style={{ marginBottom: '1rem' }}>
                    <label
                      htmlFor="mobile-signup-password"
                      className="form-label"
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                      id="mobile-signup-password"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Create a password"
                      disabled={isSubmitting}
                      autoComplete="new-password"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'var(--gray-900)',
                        backgroundColor: '#fff',
                        backgroundClip: 'padding-box',
                        border: '1px solid #ced4da',
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

                  <div className="mb-4" style={{ marginBottom: '1.5rem' }}>
                    <label
                      htmlFor="mobile-signup-confirm-password"
                      className="form-label"
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                      id="mobile-signup-confirm-password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="Confirm your password"
                      disabled={isSubmitting}
                      autoComplete="new-password"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'var(--gray-900)',
                        backgroundColor: '#fff',
                        backgroundClip: 'padding-box',
                        border: '1px solid #ced4da',
                        appearance: 'none',
                        borderRadius: '0.375rem',
                        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                      }}
                    />
                    {formErrors.confirmPassword && (
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
                        {formErrors.confirmPassword}
                      </div>
                    )}
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
                          Creating account...
                        </>
                      ) : 'Create Account'}
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer" style={{ padding: '1rem 1.25rem', borderTop: '1px solid #dee2e6' }}>
              <div className="w-100 text-center">
                Already have an account?{' '}
                <a
                  href="#"
                  className="text-decoration-none"
                  onClick={handleSwitchToSignIn}
                  style={{ color: '#0d6efd', textDecoration: 'none' }}
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
