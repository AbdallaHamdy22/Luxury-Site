import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBirthdayCake, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/RDXUser';
import axiosInstance from '../../axiosConfig/instance';
import './Login.css';

const LoginModal = ({ setIsModalOpen }) => {
  const [loginData, setLoginData] = useState({ Email: '', Password: '' });
  const [signupData, setSignupData] = useState({
    fName: '', lName: '', Email: '', Password: '', conf_Password: '', number: '', birthdate: '', gender: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    showError(''); // Reset error message
    try {
      const response = await axiosInstance.post('User/UserLogin.php', loginData);
      const data = response.data;

      if (data.status === 'error') {
        showError(data.message);
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        const userData = {
          Email: data.Email,
          ProfileImage: data.ProfileImage,
          RoleID: data.Role.ID,
          RoleName: data.Role.RoleName,
          UserID: data.ID,
          UserName: data.UserName,
        };
        dispatch(setUser(userData));
        setIsModalOpen(false); // Close modal on successful login
        navigate(location.pathname); // Stay on the same page
      }
    } catch (error) {
      console.error('Error:', error);
      showError('An error occurred. Please try again later.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    showError(''); // Reset error message
    try {
      const response = await axiosInstance.post('User/signup.php', signupData);
      const data = response.data;

      if (data.status === 'error') {
        showError(data.message);
      } else {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsLogin(true);
          setIsFadingOut(false);
        }, 500);
      }
    } catch (error) {
      console.error('Error:', error);
      showError('An error occurred. Please try again later.');
    }
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 4000);
  };

  const toggleForm = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsFadingOut(false);
    }, 500);
  };

  return (
    <div>
      <div className="login-modal-overlay">
        <div className={`form-content ${isFadingOut ? 'fade-out' : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className="login-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
          <div className="luxurious-sidebar">
            {/* <img src="/Images/Logo.png" alt="Website Logo" className="website-logo" /> */}
            {isLogin? <h1>Welcome Back</h1>:<h1>Join us!</h1>}
            <p>{isLogin ? "Sign in to your account" : "Create a new account to get started"}</p>
            <div className="social-login-buttons">
              {/* <button onClick={() => handleSocialLogin('Google')} className="social-login google"> */}
              {/* <button className="social-login google">
                <FaGoogle className="social-icon" />
                {isLogin ? "Sign in with Google" : "Sign up with Google"}
              </button> */}
              {/* <button onClick={() => handleSocialLogin('Facebook')} className="social-login facebook"> */}
              {/* <button className="social-login facebook">
                <FaFacebook className="social-icon" />
                {isLogin ? "Sign in with Facebook" : "Sign up with Facebook"}
              </button> */}
            <button onClick={toggleForm}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
            </div>
          </div>
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="luxurious-form">
              <h2>Sign In</h2>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  placeholder="Email address"
                  type="text"
                  name="Email"
                  required
                  value={loginData.Email}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  placeholder="Password"
                  type="password"
                  name="Password"
                  required
                  value={loginData.Password}
                  onChange={handleLoginChange}
                />
              </div>
              <button type="submit">Log In</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="luxurious-form">
              <h2>Create a New Account</h2>
              <div className="form-row">
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="First name"
                    name="fName"
                    required
                    value={signupData.fName}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lName"
                    required
                    value={signupData.lName}
                    onChange={handleSignupChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email address"
                    name="Email"
                    required
                    value={signupData.Email}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="input-group">
                  <FaPhone className="input-icon" />
                  <input
                    type="number"
                    placeholder="Phone number"
                    name="number"
                    required
                    value={signupData.number}
                    onChange={handleSignupChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    name="Password"
                    required
                    value={signupData.Password}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    name="conf_Password"
                    required
                    value={signupData.conf_Password}
                    onChange={handleSignupChange}
                  />
                </div>
              </div>
              <div className="input-group">
                <FaBirthdayCake className="input-icon" />
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  value={signupData.birthdate}
                  onChange={handleSignupChange}
                />
              </div>
              <div className="gender-selection">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={signupData.gender === 'Male'}
                    onChange={handleSignupChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={signupData.gender === 'Female'}
                    onChange={handleSignupChange}
                  />
                  Female
                </label>
              </div>
              <button type="submit">Sign Up</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
