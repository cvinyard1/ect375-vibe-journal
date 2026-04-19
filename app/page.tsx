export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Material Management System</h1>
            <p className="hero-subtitle">Construction material tracking for Union Hospital</p>
            <div className="hero-buttons">
              <a href="/auth/login" className="btn btn-primary" data-tooltip="Access your account">Login</a>
              <a href="/auth/signup" className="btn btn-secondary" data-tooltip="Create a new account">Sign Up</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <i className="fas fa-chart-line"></i>
              <h3>Track Progress</h3>
              <p>Monitor your project materials in real-time</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
