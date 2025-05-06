import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react'
import Navbar from '../../components/Navbar';

const Login = () => {

      let navigate = useNavigate();
      let location = useLocation();
      let from = location.state?.from?.pathname || "/";
      const { user, setUser } = useAuth();

      useEffect(() => {
            user?.email && navigate(from, { replace: true })
      }, [from, navigate, user?.email])

      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = data => processLogin(data);
      const [loginError, setLoginError] = useState('');

      const processLogin = (formData) => {
            let btn = document.getElementById('login_btn')
            btn.innerText = 'Processing Login ... '
            btn.disabled = true

            const fetchData = async () => {
                  try {
                        const response = await fetch(`https://sheba-xyz-backend.onrender.com/login`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(formData)
                        })
                        const result = await response.json()

                        if (result.status) {
                              setUser(result.user)
                              setLoginError('')
                              localStorage.setItem('uId', result.user._id)
                              result.user.role === 'user' && navigate('/services')
                              result.user.role === 'admin' && navigate('/admin')
                        }
                        else {
                              setLoginError(result.message)
                              document.getElementById('login_form').reset()
                              btn.innerText = 'Login'
                              btn.disabled = false
                        }
                  } catch (error) {
                        fetchData();
                  }
            };
            fetchData();
      }

      return (
            <div className=''>
                  <Navbar />
                  <form id='login_form' onSubmit={handleSubmit(onSubmit)} className='lg:w-1/3 xl:1/2 w-full mx-auto flex content-center items-center h-96 px-5'>
                        <div className="w-full">
                              <h1 className='text-center text-xl my-5'>Sign In</h1>
                              <div className="my-2">
                                    <input placeholder='Enter Email' autoComplete={`email`} className='w-full p-2 border-2 border-sky-600 focus:outline-sky-800 rounded' type='email' {...register("email", { required: true })} />
                                    <br />
                                    {errors.email && <span className='text-rose-500'>*Email required</span>}
                              </div>

                              <div className="my-2">
                                    <input placeholder='Enter Password' autoComplete={`current-password`} className='w-full p-2 border-2 border-sky-600 focus:outline-sky-800 rounded' type='password' {...register("password", { required: true })} />
                                    <br />
                                    {errors.password && <span className='text-rose-500'>*Password required</span>}
                              </div>

                              <p className='my-2 text-rose-900 font-bold'>{loginError}</p>
                              <p className='my-5 text-sky-950'>Don't have an account? <Link className='underline' to='/sign-up'>Register as user</Link></p>
                              <button id='login_btn' type="submit" className='bg-sky-700 hover:bg-sky-800 text-white w-[100%] py-2 rounded-md'>Login</button>
                        </div>
                  </form>

            </div>
      );
};

export default Login;