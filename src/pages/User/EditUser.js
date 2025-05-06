import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const EditUser = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setUsers } = useAuth()
    const onSubmit = data => processEdit(data);

    const [userByID, setUserById] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/user/${id}`)
                const result = await response.json()

                if (result.status) {
                    setUserById(result.user)
                }
                else {

                }
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [id])

    const processEdit = (data) => {

        const formData = {
            role: data.role
        }

        let btn = document.getElementById('userinfo_edit_btn')
        btn.innerText = 'Updating Information ... '
        btn.disabled = true

        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/user/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                const result = await response.json()

                if (result.status) {
                    const fetchData = async () => {
                        try {
                            const response = await fetch(`https://sheba-xyz-backend.onrender.com/users`)
                            const result = await response.json()

                            if (result.status) {
                                setUsers(result.users)
                                navigate('/dashboard')
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

                }
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-10 mx-auto">
                <h1 className='text-xl text-center my-2'>Edit Role of User {userByID?.name}</h1>
                <form id='userinfo_edit_form' onSubmit={handleSubmit(onSubmit)} className='md:w-full lg:w-2/3 mx-auto flex content-center items-center px-5'>
                    {
                        userByID.email ?
                            <div className="w-full">
                                {/* <div className="my-2">
                                    <input defaultValue={userByID.name} placeholder='Enter Full Name' autoComplete={`name`} className='w-full p-2 border-2 border-sky-600 focus:outline-sky-800 rounded' type='text' {...register("name", { required: true })} />
                                    <br />
                                    {errors.name && <span className='text-rose-500'>*Name required</span>}
                                </div>

                                <div className="my-2">
                                    <input defaultValue={userByID.email} placeholder='Enter Email' autoComplete={`email`} className='w-full p-2 border-2 border-sky-600 focus:outline-sky-800 rounded' type='email' {...register("email", { required: true })} />
                                    <br />
                                    {errors.email && <span className='text-rose-500'>*Email required</span>}
                                </div>

                                <div className="my-2">
                                    <input defaultValue={userByID.password} placeholder='Enter Password' autoComplete={`current-password`} className='w-full p-2 border-2 border-sky-600 focus:outline-sky-800 rounded' type='password' {...register("password", { required: true })} />
                                    <br />
                                    {errors.password && <span className='text-rose-500'>*Password required</span>}
                                </div> */}

                                <select {...register("role", { required: true })} defaultValue={userByID.role} className='capitalize p-2 border border-sky-800 rounded my-2 w-full'>
                                    <option value="" disabled>Select User Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="staff">Staff</option>
                                </select>
                                {errors.role && <span className='text-rose-500'>*Role required</span>}

                                <button id='userinfo_edit_btn' type="submit" className='bg-sky-700 hover:bg-sky-800 text-white w-[100%] py-2 rounded-md'>Update</button>
                            </div>
                            :
                            <p>Loading User Data. Please wait!</p>
                    }
                </form>
            </div>
        </div>
    );
};

export default EditUser;