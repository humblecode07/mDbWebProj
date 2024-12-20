import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { NavLink, useNavigate } from 'react-router-dom';
import Marquees from './Marquees';
import KeyIcon from '../assets/Icons/KeyIcon';
import EmailIcon from '../assets/Icons/EmailIcon';
import UserIcon from '../assets/Icons/UserIcon';

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    full_name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(userDetails);
      alert('Account created!');
      navigate('/signin');
    } catch (error) {
      console.log(error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <main className="register--container">
      {/* <Marquees /> */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-container">
          <div className="text-section">
            <span className="text-title">Discover movies.</span>
            <span className="text-highlight">
              Join tskr<span className="highlight">!</span>
            </span>
          </div>
          <div
            className="form-section"
            style={{ backgroundColor: 'rgba(0, 0, 0, .2)' }}
          >
            <div className="form-inner">
              <span className="title">CREATE ACCOUNT</span>
              <div className="input-group">
                <div className="input-wrapper">
                  <UserIcon />
                  <input
                    id="full_name"
                    type="text"
                    name="full_name"
                    value={userDetails.full_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="input"
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-wrapper">
                  <EmailIcon />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userDetails.email}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-wrapper">
                  <KeyIcon />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="input"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="submit-button"
              >
                Register
              </button>
              <span className="login-prompt">
                Already have an account?
                <NavLink to="/signin" className="login-link">
                  Login
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Register;
