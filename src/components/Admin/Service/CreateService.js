import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateService = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => createService(data);
    const { categories, setServices } = useAuth()

    const createService = async (data) => {
        let btn = document.getElementById('service_btn_admin');
        btn.innerText = 'Creating Service ... ';
        btn.disabled = true

        const imageURL = await handleImageUpload(data.image[0])

        if (imageURL) {
            const formData = {
                name: data.name,
                category: data.category,
                details: data.details,
                image: imageURL
            };

            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/service`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.status) {
                    toast.success(`${result.message}`);

                    const fetchData = async () => {
                        try {
                            const response = await fetch(`https://sheba-xyz-backend.onrender.com/services`);
                            const result = await response.json();

                            if (result.status) {
                                setServices(result.services);
                            } else {
                                toast.error(`${result.message}`);
                            }
                        } catch (error) {
                            fetchData();
                        }
                    };

                    fetchData();
                } else {
                    toast.error(`${result.message}`);
                }

                document.getElementById('service_form').reset();
                btn.innerText = 'Create';
                btn.disabled = false
            } catch (error) {
                console.error(error);
            }
        }
        else {
            toast.error(`Image upload failed. Please try again later!`);
        }
    };

    const handleImageUpload = async (imageFile) => {
        try {
            const imageData = new FormData();
            imageData.set('key', '12cc5ab8b62ccf79263f7fdd51e640c5');
            imageData.append('image', imageFile);

            const response = await axios.post('https://api.imgbb.com/1/upload', imageData)
            return response.data.data.display_url;
        } catch (error) {
            toast.error(error.message);
            return null;
        }
    };


    return (
        <form id='service_form' onSubmit={handleSubmit(onSubmit)} className='md:w-full lg:w-2/3 mx-auto flex content-center items-center px-5'>
            <div className="w-full">

                <select {...register("category", { required: true })} defaultValue={``} className='p-2 border border-orange-800 rounded mt-2 w-full'>
                    <option value="" disabled>Select Category</option>
                    {
                        categories.map(category => <option key={category._id} value={category.name}>{category.name}</option>)
                    }
                </select>
                {errors.category && <span className='text-rose-500'>*Category required</span>}

                <div className="my-2">
                    <input placeholder='Enter Service Name' autoComplete={`name`} className='w-full p-2 border-2 border-orange-600 focus:outline-orange-800 rounded' type='text' {...register("name", { required: true })} />
                    <br />
                    {errors.name && <span className='text-rose-500'>*Service Name required</span>}
                </div>

                <div className="my-2">
                    <textarea placeholder='Enter Details' autoComplete={`details`} className='w-full p-2 border-2 border-orange-600 focus:outline-orange-800 rounded' type='text' {...register("details", { required: true })} />
                    <br />
                    {errors.details && <span className='text-rose-500'>*Service details required</span>}
                </div>

                <div className="my-2">
                    <input placeholder='Enter Service Name' className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-violet-100' type='file' accept="image/*" {...register("image", { required: true })} />
                    <br />
                    {errors.image && <span className='text-rose-500'>*Image required</span>}
                </div>

                <button id='service_btn_admin' type="submit" className='bg-orange-700 hover:bg-orange-800 text-white w-[100%] py-2 rounded-md my-2'>Create</button>
            </div>
        </form>
    );
};

export default CreateService;