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
    <main className="min-h-[41.25rem] text-black flex flex-col gap-0 p-0">
      {/* <Marquees /> */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className='w-[66.5625rem] h-[35.875rem] flex gap-[3.4375rem] relative z-[2] mt-[2.5625rem]'>
          <div className='w-[30.3125rem] flex flex-col font-passionOne font-bold self-end text-white'>
            <span className='text-[3.125rem]'>Discover movies.</span>
            <span className='text-[7.5rem]'>Join tskr<span className='text-[#FF8731]'>!</span></span>
          </div>
          <div
            className='w-[32.8125rem] h-[35.875rem] text-white rounded-[2rem] backdrop-blur-md flex flex-col justify-center items-center'
            style={{ backgroundColor: 'rgba(0, 0, 0, .2)' }}
          >
            <div className='w-[26.15625rem] h-[29.875rem] flex flex-col items-center gap-[3.375rem]'>
              <span className='font-roboto font-bold text-[1.75rem]'>CREATE ACCOUNT</span>
              <div className='w-full h-[2.5625rem] border-solid border-b-[1px] border-white flex items-center'>
                <div className='flex items-center gap-[.875rem] pl-[.4375rem]'>
                  <UserIcon />
                  <input
                    id="full_name"
                    type='text'
                    name='full_name'
                    value={userDetails.full_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className='w-[22.5rem] bg-transparent outline-none'
                  />
                </div>
              </div>
              <div className='w-full h-[2.5625rem] border-solid border-b-[1px] border-white flex'>
                <div className='flex items-center gap-[.875rem] pl-[.4375rem]'>
                  <EmailIcon />
                  <input
                    type='email'
                    name='email'
                    placeholder="Email"
                    value={userDetails.email}
                    onChange={handleChange}
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
                    value={userDetails.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className='w-[22.5rem] bg-transparent outline-none'
                  />
                </div>
              </div>
              <button
                type="submit"
                className='w-[16.75rem] h-[3.25rem] text-[#FF8731] border-solid border-[2px] border-[#FF8731] rounded-full'
              >
                Register
              </button>
              <span className='font-roboto'> Already have an account?
                <NavLink to="/signin" className="text-blue-600 hover:underline pl-1">
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
