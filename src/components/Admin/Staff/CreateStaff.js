import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateStaff = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => createStaff(data);
    const { users, services, setStaffs, selectedServices, setSelectedServices } = useAuth()

    const createStaff = async (data) => {
        let btn = document.getElementById('staff_sign_up_btn_admin')
        btn.innerText = 'Processing ... '
        btn.disabled = true

        const imageURL = await handleImageUpload(data.image[0])

        if (imageURL) {
            const formData = {
                name: data.name,
                bio: data.bio,
                location: data.location,
                rate: data.rate,
                details: data.details,
                services: selectedServices,
                image: imageURL
            }

            const fetchData = async () => {
                try {
                    const response = await fetch(`https://sheba-xyz-backend.onrender.com/staff`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    })
                    const result = await response.json()

                    if (result.status) {
                        toast.success(`${result.message}`)
                        const fetchData = async () => {
                            try {
                                const response = await fetch(`https://sheba-xyz-backend.onrender.com/staffs`)
                                const result = await response.json()

                                if (result.status) {
                                    setStaffs(result.staffs)
                                }
                                else {
                                    toast.error(`${result.message}`)
                                }
                            } catch (error) {
                                fetchData();
                            }
                        };
                        fetchData();
                    }
                    else {
                        toast.error(`${result.message}`)
                    }
                    document.getElementById('staff_sign_up_form_admin').reset()
                    btn.innerText = 'Register'
                    btn.disabled = false
                    setSelectedServices([])
                } catch (error) {
                    fetchData();
                }
            };
            fetchData();
        }
        else {
            toast.error(`Image upload failed. Please try again later!`);
        }
    }

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

    const handleServiceAdd = value => {
        selectedServices.indexOf(value) === -1 ? setSelectedServices([...selectedServices, value]) : setSelectedServices(selectedServices)
    }

    return (
        <form id='staff_sign_up_form_admin' onSubmit={handleSubmit(onSubmit)} className='md:w-full lg:w-2/3 mx-auto flex content-center items-center px-5 my-5'>
            <div className="w-full">

                <select onChangeCapture={(e) => handleServiceAdd(e.target.value)} {...register("service", { required: true })} defaultValue={``} className='p-2 border border-gray-800 rounded w-full'>
                    <option value="" disabled>Select Service Name</option>
                    {
                        services.length > 0 &&
                        services.map(service => <option key={service._id} value={service.name}>{service.name}</option>)
                    }
                </select>

                {errors.service && <span className='text-rose-500'>*Service Name required</span>}

                <select {...register("name", { required: true })} defaultValue={``} className='p-2 border border-gray-800 rounded mt-2 w-full'>
                    <option value="" disabled>Select Staff Name</option>
                    {
                        users.length > 0 &&
                        users.filter(user => user.role === 'staff').map(staff => <option key={staff._id} value={staff.name}>{staff.name}</option>)
                    }
                </select>
                <br />
                {errors.name && <span className='text-rose-500'>*Name required</span>}

                <div className="my-2">
                    <input placeholder='Bio' className='w-full p-2 border-2 border-gray-600 focus:outline-gray-800 rounded' type='text' maxLength='40' {...register("bio", { required: true })} />
                    <br />
                    {errors.bio && <span className='text-rose-500'>*Bio required</span>}
                </div>

                <div className="my-2">
                    <input placeholder='Location' className='w-full p-2 border-2 border-gray-600 focus:outline-gray-800 rounded' type='text' maxLength='40' {...register("location", { required: true })} />
                    <br />
                    {errors.location && <span className='text-rose-500'>*Location required</span>}
                </div>

                <div className="my-2">
                    <input placeholder='Service Rate' className='w-full p-2 border-2 border-gray-600 focus:outline-gray-800 rounded' type='number' min='1' {...register("rate", { required: true })} />
                    <br />
                    {errors.rate && <span className='text-rose-500'>*Rate required</span>}
                </div>

                <div className="my-2">
                    <textarea placeholder='Staff Details' autoComplete={`details`} className='w-full p-2 border-2 border-gray-600 focus:outline-gray-800 rounded' type='text' {...register("details", { required: true })} />
                    <br />
                    {errors.details && <span className='text-rose-500'>*Service details required</span>}
                </div>

                {/* <select {...register("slot", { required: true })} defaultValue={``} className='p-2 border border-gray-800 rounded mt-2 w-full'>
                    <option value="" disabled>Select Service Slot</option>
                    {
                        slots.length > 0 &&
                        slots.map(slot => <option key={slot._id} value={slot.label}>{slot.label} {formatTime(slot.start_time)} - {formatTime(slot.end_time)}</option>)
                    }
                </select>
                {errors.slot && <span className='text-rose-500'>*Slot required</span>} */}

                <div className="my-2">
                    <input className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300' type='file' accept="image/*" {...register("image", { required: true })} />
                    <br />
                    {errors.image && <span className='text-rose-500'>*Image required</span>}
                </div>

                <button id='staff_sign_up_btn_admin' type="submit" className='bg-gray-700 hover:bg-gray-800 text-white w-[100%] py-2 rounded-md my-2'>Create</button>
            </div>
        </form>
    );
};

export default CreateStaff;