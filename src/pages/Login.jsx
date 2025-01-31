import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaMusic } from 'react-icons/fa';
import './Login.css';

function Login({ setIsAuthenticated, setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Track loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // Start loading when form is submitted
    setError('');  // Clear previous errors

    try {
      const response = await axios.post('https://tunesphere-backend-1.onrender.com/api/login', formData);
      console.log(response.data);
      setIsAuthenticated(true);
      setUser(response.data); // Store user details
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(response.data)); // Store user in localStorage
      navigate('/profile'); // Redirect to profile page
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in');
    } finally {
      setIsLoading(false);  // Stop loading when request finishes
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <FaMusic className="login-icon" />
          <h2 className="login-title">Welcome back!</h2>
          <p className="login-subtitle">Sign in to continue to TuneSphere</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              required
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              required
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
          <div className="form-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="form-link">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
