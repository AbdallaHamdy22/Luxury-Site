import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/RDXUser';
import axiosInstance from '../../axiosConfig/instance';
import './Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({ Email: '', Password: '' });
  const [signupData, setSignupData] = useState({
    fName: '', lName: '', Email: '', Password: '', conf_Password: '', number: '', birthdate: '', gender: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false); // New state for managing fade-out
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        navigate('/');
        window.location.reload();
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      showError('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      showError('An error occurred. Please try again later.');
      setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-form-container">
      {isLogin ? (
        <div className={`form-card ${isFadingOut ? 'fade-out' : ''}`}>
          <form onSubmit={handleLoginSubmit} className="login-form">
            <h2>Sign In</h2>
            <input
              placeholder="Email address"
              type="text"
              name="Email"
              required
              value={loginData.Email}
              onChange={handleLoginChange}
            />
            <input
              placeholder="Password"
              type="password"
              name="Password"
              required
              value={loginData.Password}
              onChange={handleLoginChange}
            />
            <button type="submit">Log In</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p onClick={toggleForm}>Don't have an account? Sign up</p>
          </form>
        </div>
      ) : (
        <div className={`form-card ${isFadingOut ? 'fade-out' : ''}`}>
          <form onSubmit={handleSignupSubmit} className="signup-form">
            <h2>Create a New Account</h2>
            <input
              type="text"
              placeholder="First name"
              name="fName"
              required
              value={signupData.fName}
              onChange={handleSignupChange}
            />
            <input
              type="text"
              placeholder="Last name"
              name="lName"
              required
              value={signupData.lName}
              onChange={handleSignupChange}
            />
            <input
              type="number"
              placeholder="Phone number"
              name="number"
              required
              value={signupData.number}
              onChange={handleSignupChange}
            />
            <input
              type="email"
              placeholder="Email address"
              name="Email"
              required
              value={signupData.Email}
              onChange={handleSignupChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="Password"
              required
              value={signupData.Password}
              onChange={handleSignupChange}
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="conf_Password"
              required
              value={signupData.conf_Password}
              onChange={handleSignupChange}
            />
            <label htmlFor="birthdate">Date of Birth</label>
            <input
              type="date"
              name="birthdate"
              id="birthdate"
              value={signupData.birthdate}
              onChange={handleSignupChange}
            />
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
            <p onClick={toggleForm}>Already have an account? Sign in</p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
