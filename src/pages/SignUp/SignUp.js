import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {

    let navigate = useNavigate();
    const { setUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => processSignUp(data);
    const [loginError, setLoginError] = useState('');

    const processSignUp = (data) => {

        const formData = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: 'user'
        }

        let btn = document.getElementById('sign_up_btn')
        btn.innerText = 'Processing Registration ... '
        btn.disabled = true

        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/user`, {
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
                    result.user.role === 'admin' &&  navigate('/admin')
                }
                else {
                    setLoginError(result.message)
                    document.getElementById('sign_up_form').reset()
                    btn.innerText = 'Register'
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
            <form id='sign_up_form' onSubmit={handleSubmit(onSubmit)} className='lg:w-1/3 xl:1/2 w-full mx-auto flex content-center items-center h-96 px-5'>
                <div className="w-full">
                    <h1 className='text-center text-xl my-5'>Create an Account</h1>
                    <div className="my-2">
                        <input placeholder='Enter Full Name' autoComplete={`name`} className='w-full p-2 border-2 border-sky-600 focus:outline-sky-800 rounded' type='text' {...register("name", { required: true })} />
                        <br />
                        {errors.name && <span className='text-rose-500'>*Name required</span>}
                    </div>

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
                    <p className='my-5 text-sky-950'>Already have an account? <Link className='underline' to='/login'>Login</Link></p>
                    <button id='sign_up_btn' type="submit" className='bg-sky-700 hover:bg-sky-800 text-white w-[100%] py-2 rounded-md'>Register</button>
                </div>
            </form>

        </div>
    );
};

export default SignUp;