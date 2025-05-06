import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const EditCategory = () => {

      const { user } = useAuth()
      const { id } = useParams()
      const navigate = useNavigate()
      const [categoryByID, setCategoryByID] = useState({})

      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = data => processEdit(data);

      useEffect(() => {
            user.role === 'user' && navigate('/dashboard')
            user.role === 'staff' && navigate('/staff')
      }, [user.role, navigate])

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const response = await fetch(`https://sheba-xyz-backend.onrender.com/category/${id}`)
                        const result = await response.json()

                        if (result.status) {
                              setCategoryByID(result.category)
                        }
                        else {
                              toast.error(result.message)
                        }
                  } catch (error) {
                        fetchData();
                  }
            };
            fetchData();
      }, [id])

      const processEdit = (data) => {

            let btn = document.getElementById('categoryInfo_edit_btn')
            btn.innerText = 'Updating Information ... '
            btn.disabled = true

            const fetchData = async () => {
                  try {
                        const response = await fetch(`https://sheba-xyz-backend.onrender.com/category/${id}`, {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(data)
                        })
                        const result = await response.json()

                        if (result.status) {
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

      return (
            <div>
                  <Navbar />
                  <div className="container mt-10 mx-auto">
                        <h1 className='text-xl text-center my-2'>Edit Category</h1>
                        <form id='categoryInfo_edit_form' onSubmit={handleSubmit(onSubmit)} className='md:w-full lg:w-2/3 mx-auto flex content-center items-center px-5'>
                              {
                                    categoryByID._id ?
                                          <div className="w-full">
                                                <div className="my-2">
                                                      <input defaultValue={categoryByID.name} placeholder='Enter Full Name' autoComplete={`name`} className='w-full p-2 border-2 border-sky-600 focus:outline-sky-800 rounded' type='text' {...register("name", { required: true })} />
                                                      <br />
                                                      {errors.name && <span className='text-rose-500'>*Name required</span>}
                                                </div>

                                                <button id='categoryInfo_edit_btn' type="submit" className='bg-sky-700 hover:bg-sky-800 text-white w-[100%] py-2 rounded-md'>Update</button>
                                          </div>
                                          :
                                          <p>Loading Category Data. Please wait!</p>
                              }
                        </form>
                  </div>
            </div>
      );
};

export default EditCategory;