import React from 'react';

export function PageNotFound() {
  const handleGoHome = () => {
    window.location.href = '/'; // Change to your home route
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <button className="btn btn-primary" onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
