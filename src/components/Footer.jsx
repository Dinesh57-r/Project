import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Import the custom CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-heading">TuneSphere</h3>
            <p className="footer-description">Your personal music companion that understands your mood.</p>
          </div>
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Features</a></li>
              <li><a href="#" className="footer-link">Premium</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Help</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Support</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Connect</h3>
            <div className="footer-social-icons">
              <a href="https://x.com/?lang=en-in" className="footer-social-icon"><FaTwitter size={25} /></a>
              <a href="https://www.instagram.com/" className="footer-social-icon"><FaInstagram size={25} /></a>
              <a href="https://github.com/" className="footer-social-icon"><FaGithub size={25} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TuneSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
