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
    <main className=" min-h-[41.25rem] text-black flex flex-col gap-0 p-0">
      <Marquees />
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="flex flex-col gap-4">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className='w-[66.5625rem] h-[35.875rem] flex gap-[3.4375rem] relative z-[2] mt-[2.5625rem]'>
          <div className='w-[30.3125rem] flex flex-col font-passionOne font-bold self-end text-white'>
            <span className='text-[3.125rem]'>Back for more?</span>
            <span className='text-[5rem]'>Sign in to tskr<span className='text-[#FF8731]'>!</span></span>
          </div>
          <div
            className='w-[32.8125rem] h-[35.875rem] text-white rounded-[2rem] backdrop-blur-md flex flex-col justify-center items-center'
            style={{ backgroundColor: 'rgba(0, 0, 0, .2)' }}
          >
            <div className='w-[26.15625rem] h-[25.4375rem] flex flex-col items-center gap-[3.375rem]'>
              <span className='font-roboto font-bold text-[1.75rem]'>LOGIN</span>
              <div className='w-full h-[2.5625rem] border-solid border-b-[1px] border-white flex'>
                <div className='flex items-center gap-[.875rem] pl-[.4375rem]'>
                  <EmailIcon />
                  <input
                    type='email'
                    name='email'
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-[22.5rem] bg-transparent outline-none'
                  />
                </div>
              </div>
              <div className='w-full h-[2.5625rem] border-solid border-b-[1px] border-white flex items-center'>
                <div className='flex items-center gap-[.875rem] pl-[.4375rem]'>
                  <KeyIcon />
                  <input
                    id="password"
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className='w-[22.5rem] bg-transparent outline-none'
                  />
                </div>
              </div>
              <button
                type="submit"
                className='w-[16.75rem] h-[3.25rem] text-[#FF8731] border-solid border-[2px] border-[#FF8731] rounded-full'
              >
                Sign In
              </button>
              <span className='font-roboto'>Don't have an account?
                <NavLink to="/signup" className="text-blue-600 hover:underline pl-1">
                  Sign up
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
