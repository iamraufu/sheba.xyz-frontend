import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateSlot = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => processSignUp(data);
    const { setSlots } = useAuth()

    const processSignUp = (data) => {

        const formData = {
            label: data.label,
            start_time: data.start_time,
            end_time: data.end_time
        }

        let btn = document.getElementById('slot_btn_admin')
        btn.innerText = 'Creating Slot ... '
        btn.disabled = true

        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/slot`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                const result = await response.json()

                if (result.status) {
                    toast.success(`${result.message}`)
                    const fetchData = async () => {
                        try {
                            const response = await fetch(`https://sheba-xyz-backend.onrender.com/slots`)
                            const result = await response.json()

                            if (result.status) {
                                setSlots(result.slots)
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
                document.getElementById('slot_form_admin').reset()
                btn.innerText = 'Create'
                btn.disabled = false
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    return (
        <form id='slot_form_admin' onSubmit={handleSubmit(onSubmit)} className='md:w-full lg:w-2/3 mx-auto flex content-center items-center px-5'>
            <div className="w-full">
                <div className="my-2">
                    <input placeholder='Enter Slot Label' autoComplete={`name`} className='w-full p-2 border-2 border-zinc-400 focus:outline-zinc-800 rounded' type='text' {...register("label", { required: true })} />
                    <br />
                    {errors.label && <span className='text-rose-500'>*Label required</span>}
                </div>

                <div className="my-2">
                    <label>Start Time:</label>
                    <input className='w-full p-2 border-2 border-zinc-400 focus:outline-zinc-800 rounded' type='time' {...register("start_time", { required: true })} />
                    <br />
                    {errors.start_time && <span className='text-rose-500'>*Start Time required</span>}
                </div>

                <div className="my-2">
                    <label>End Time:</label>
                    <input className='w-full p-2 border-2 border-zinc-400 focus:outline-zinc-800 rounded' type='time' {...register("end_time", { required: true })} />
                    <br />
                    {errors.end_time && <span className='text-rose-500'>*End Time required</span>}
                </div>

                <button id='slot_btn_admin' type="submit" className='bg-zinc-700 hover:bg-zinc-800 text-white w-[100%] py-2 rounded-md my-2'>Create</button>
            </div>
        </form>
    );
};

export default CreateSlot;