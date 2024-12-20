import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/api';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import Marquees from './Marquees';
import EmailIcon from '../assets/Icons/EmailIcon';
import KeyIcon from '../assets/Icons/KeyIcon';

const userRole = Number(import.meta.env.VITE_YT_ROLE_USER);
const adminRole = Number(import.meta.env.VITE_YT_ROLE_ADMIN);

const SignIn = () => {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessToken) {
      if (user.roles.includes(adminRole)) {
        navigate('/admin/movie');
      } else if (user.roles.includes(userRole)) {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axiosPrivate.post(
        '/auth',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const accessToken = response.data.accessToken;
      const decodedToken = jwtDecode(accessToken);
      const { roles } = decodedToken;

      localStorage.setItem("jwt", response.data.refreshToken);
      setUser({ email, accessToken, roles });

      if (roles.includes(adminRole)) {
        navigate('/admin/movie');
      } else if (roles.includes(userRole)) {
        navigate('/');
      } else {
        setError('Unknown role.');
      }
    } catch (error) {
      console.log(error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <main className='signin--container'>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-container">
          <div className="welcome-message">
            <span className="headline">Back for more?</span>
            <span className="title">
              Sign in to tskr<span className="highlight">!</span>
            </span>
          </div>
          <div className="login-form">
            <div className="form-content">
              <span className="form-title">LOGIN</span>
              <div className="input-group">
                <div className="input-container">
                  <EmailIcon />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-container">
                  <KeyIcon />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
              </div>
              <button type="submit" className="submit-button">Sign In</button>
              <span className="signup-message">
                Don't have an account?
                <NavLink to="/signup" className="signup-link">Sign up</NavLink>
              </span>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
