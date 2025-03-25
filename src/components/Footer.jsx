import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-footer py-4 border-top">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-3">
            <div className="d-flex flex-wrap justify-content-center gap-3 small">
              <a href="#" className="text-decoration-none">About</a>
              <a href="#" className="text-decoration-none">Help</a>
              <a href="#" className="text-decoration-none">Privacy</a>
              <a href="#" className="text-decoration-none">Terms</a>
              <a href="#" className="text-decoration-none">Contact</a>
            </div>
          </div>
          <div className="col-12 text-center">
            <p className="small mb-0">© 2024 - Simcast News Redesign | Not affiliated with Simcast.</p>
          </div>
          <div className="col-12 text-center mt-3">
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
