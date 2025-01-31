import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMusic } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Register.css';

const MySwal = withReactContent(Swal);

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post('https://tunesphere-backend-1.onrender.com/api/signup', formData);

      if (response.status === 201) {
        MySwal.fire({
          title: '<strong>🎉 Welcome to TuneSphere! 🎉</strong>',
          html: `
            <p style="font-size: 16px; color: #333;">Your account has been created successfully.</p>
            <p style="font-size: 14px; color: #555;">You will be redirected to the login page shortly.</p>
          `,
          icon: 'success',
          background: '#fef5e6',
          color: '#333',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          customClass: {
            popup: 'sweetalert-custom-popup',
          },
        });

        setTimeout(() => {
          navigate('/login');
        }, 4000);
      }
    } catch (err) {
      // Check for specific error responses
      if (err.response) {
        const errorMessage = err.response.data.message || err.response.data.error;
        
        if (err.response.status === 409) {  // Conflict status code
          MySwal.fire({
            title: '<strong>User Already Exists</strong>',
            html: `
              <p style="font-size: 16px; color: #333;">${errorMessage || 'A user with this username or email already exists.'}</p>
              <p style="font-size: 14px; color: #555;">Please try using different credentials or login to your existing account.</p>
            `,
            icon: 'warning',
            background: '#fff3cd',
            color: '#333',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#ffc107',
            footer: '<a href="/login">Login to existing account</a>',
            customClass: {
              popup: 'sweetalert-custom-popup',
            },
          });
        } else {
          // Generic error alert for other errors
          MySwal.fire({
            title: '<strong>Registration Failed</strong>',
            html: `
              <p style="font-size: 16px; color: #333;">${errorMessage || 'We couldn\'t complete your registration.'}</p>
              <p style="font-size: 14px; color: #555;">Please try again later or contact support.</p>
            `,
            icon: 'error',
            background: '#ffe6e6',
            color: '#333',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#d33',
            customClass: {
              popup: 'sweetalert-custom-popup',
            },
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <div className="header">
          <FaMusic className="icon" />
          <h2>Create your account</h2>
          <p>Join TuneSphere and start your musical journey</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              required
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="link">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;