import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../api/api';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import Marquees from './Marquees';

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
    <main className=" min-h-[41.25rem] text-white font-roboto p-0">
      <Marquees />
    </main>
  );
};

export default SignIn;
