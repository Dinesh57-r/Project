import { Link } from 'react-router-dom';
import { FaMusic } from 'react-icons/fa';
import './Navbar.css'; // Import the custom CSS file

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false); // Log the user out
    // Optionally, clear the user details from state or local storage
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-link">
          <FaMusic className="logo-icon" />
          <span className="logo-text">TuneSphere</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>

          {/* Conditionally render navigation links based on authentication */}
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/about" className="nav-link">About</Link>
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/about" className="nav-link">About</Link>
            </>
          )}

          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
