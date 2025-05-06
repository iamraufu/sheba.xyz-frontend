import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateUser = () => {

    const [signUpError, setSignUpError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => processSignUp(data);
    const { setUsers } = useAuth()

    const processSignUp = (data) => {

        const formData = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        }

        let btn = document.getElementById('sign_up_btn_admin')
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
                    setSignUpError('')
                    toast.success(`${result.message}`)
                    const fetchData = async () => {
                        try {
                            const response = await fetch(`https://sheba-xyz-backend.onrender.com/users`)
                            const result = await response.json()

                            if (result.status) {
                                setUsers(result.users)
                            }
                            else {
                            }
                        } catch (error) {
                            fetchData();
                        }
                    };
                    fetchData();
                }
                else {
                    setSignUpError(result.message)
                }
                document.getElementById('sign_up_form_admin').reset()
                btn.innerText = 'Register'
                btn.disabled = false
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    return (
        <form id='sign_up_form_admin' onSubmit={handleSubmit(onSubmit)} className='w-full xl:w-2/3 mx-auto px-5 my-5'>
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

            <select {...register("role", { required: true })} defaultValue={``} className='p-2 border border-sky-800 rounded mt-2 w-full'>
                <option value="" disabled>Select User Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
            </select>
            {errors.role && <span className='text-rose-500'>*User Role required</span>}

            <p className='my-2 text-sm text-rose-900 font-bold'>{signUpError}</p>

            <button id='sign_up_btn_admin' type="submit" className='bg-sky-700 hover:bg-sky-800 text-white w-[100%] py-2 rounded-md my-2'>Register</button>
        </form>
    );
};

export default CreateUser;