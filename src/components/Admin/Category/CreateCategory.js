import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const CreateCategory = () => {

      const { setCategories } = useAuth()
      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = data => processCreateCategory(data);

      const processCreateCategory = data => {

            let btn = document.getElementById('create_category_btn')
            btn.innerText = 'Creating Category ... '
            btn.disabled = true

            const fetchData = async () => {
                  try {
                        const response = await fetch(`https://sheba-xyz-backend.onrender.com/category`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(data)
                        })
                        const result = await response.json()

                        if (result.status) {

                              toast.success(`${result.message}`)
                              const fetchData = async () => {
                                    try {
                                          const response = await fetch(`https://sheba-xyz-backend.onrender.com/categories`)
                                          const result = await response.json()

                                          if (result.status) {
                                                setCategories(result.categories)
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
                              toString.error(`${result.message}`)
                        }
                        document.getElementById('category_form').reset()
                        btn.innerText = 'Create'
                        btn.disabled = false
                  } catch (error) {
                        fetchData();
                  }
            };
            fetchData();
      }

      return (
            <form id='category_form' onSubmit={handleSubmit(onSubmit)} className='md:w-full lg:w-2/3 mx-auto flex content-center items-center px-5'>
                  <div className="w-full">
                        <div className="my-2">
                              <input placeholder='Enter Category Name' autoComplete={`name`} className='w-full p-2 border-2 border-blue-600 focus:outline-blue-800 rounded' type='text' {...register("name", { required: true })} />
                              <br />
                              {errors.name && <span className='text-rose-500'>*Name required</span>}
                        </div>

                        <button id='create_category_btn' type="submit" className='bg-blue-700 hover:bg-blue-800 text-white w-[100%] py-2 rounded-md my-2'>Create</button>
                  </div>
            </form>
      );
};

export default CreateCategory;