import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUser }) => {
  const [loginData, setLoginData] = useState({ Email: '', Password: '' });
  const [signupData, setSignupData] = useState({
    fName: '', lName: '', Email: '', Password: '', conf_Password: '', number: '', birthdate: '', gender: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('User/UserLogin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (data.status === 'error') {
        setErrorMessage(data.message);
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });
      const data = await response.json();
      if (data.status === 'error') {
        setErrorMessage(data.message);
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="main_container1">
        <div className="Login_form">
          <form onSubmit={handleLoginSubmit}>
            <h2>Sign in</h2>
            <input
              placeholder="Email address"
              type="text"
              name="Email"
              className="inputs"
              required
              value={loginData.Email}
              onChange={handleLoginChange}
            />
            <br />
            <input
              placeholder="Password"
              type="Password"
              name="Password"
              className="inputs"
              required
              value={loginData.Password}
              onChange={handleLoginChange}
            />
            <br />
            <button className="lgn-btn" type="submit">Log in</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br />
          <div className="register">
            <p>
              You don't have an account? <span className="reg">Create new account</span>
            </p>
          </div>
        </div>
      </div>
      <div className="main_container2">
        <div className="signup_form">
          <form onSubmit={handleSignupSubmit}>
            <p>Create a new account</p>
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
            /><br />
            <input
              type="number"
              placeholder="Phone number"
              className="box"
              name="number"
              required
              value={signupData.number}
              onChange={handleSignupChange}
            /><br />
            <input
              type="email"
              placeholder="Email Address"
              className="box"
              name="Email"
              required
              value={signupData.Email}
              onChange={handleSignupChange}
            /><br />
            <input
              type="Password"
              placeholder="Password"
              className="box"
              required
              name="Password"
              value={signupData.Password}
              onChange={handleSignupChange}
            /><br />
            <input
              type="Password"
              placeholder="Confirm Password"
              className="box"
              required
              name="conf_Password"
              value={signupData.conf_Password}
              onChange={handleSignupChange}
            /><br />
            <label htmlFor="brth">Date of birth</label><br />
            <input type="date" name="birthdate" id="brth" value={signupData.birthdate} onChange={handleSignupChange} /><br />
            <label htmlFor="gndrM">Male</label>
            <input type="radio" id="gndrM" name="gender" value="Male" checked={signupData.gender === 'Male'} onChange={handleSignupChange} />
            <label htmlFor="gndrF">Female</label>
            <input type="radio" id="gndrF" name="gender" value="Female" checked={signupData.gender === 'Female'} onChange={handleSignupChange} /><br />
            <button className="reg-btn" type="submit">
              Sign up
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
