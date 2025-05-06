import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

const AddStaffReview = () => {

    const { user, staff, paymentsByEmail, setReviews } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => processReview(data);

    const processReview = data => {

        let btn = document.getElementById('create_review_btn')
        btn.innerText = 'Posting Review ... '
        btn.disabled = true

        const formData = {
            name: staff.name,
            user: user.name,
            service: data.service,
            review: data.review
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/review`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                const result = await response.json()
                
                if (result.status) {

                    toast.success(`${result.message}`)
                    const fetchData = async () => {
                        try {
                            const response = await fetch(`https://sheba-xyz-backend.onrender.com/staff-reviews/${staff.name}`)
                            const result = await response.json()
                            console.log(result);
                            if (result.status) {
                                setReviews(result.reviews)
                            }
                            else {
                                console.log(result);
                                toast.error(`${result.message}`)
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
                document.getElementById('review_form').reset()
                btn.innerText = 'Create'
                btn.disabled = false
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    return (
        <form id='review_form' onSubmit={handleSubmit(onSubmit)} className='md:w-full lg:w-2/3 mx-auto flex content-center items-center px-5'>
            <div className="w-full">

                <select {...register("service", { required: true })} defaultValue={``} className='p-2 border border-sky-800 rounded mt-2 w-full'>
                    <option value="" disabled>Select Service</option>
                    {
                        paymentsByEmail.filter(service => service.staff.name === staff.name).map(service => <option key={service._id} value={service.service.name}>{service.service.name}</option>)
                    }
                </select>
                {errors.service && <span className='text-rose-500'>*Service required</span>}

                <div className="my-2">
                    <textarea placeholder="What's on your mind?" className='w-full p-2 border-2 border-sky-600 focus:outline-sky-800 rounded' type='text' {...register("review", { required: true })} />
                    <br />
                    {errors.review && <span className='text-rose-500'>*Review required</span>}
                </div>

                <button id='create_review_btn' type="submit" className='bg-sky-700 hover:bg-sky-800 text-white w-[100%] py-2 rounded-md my-2'>Add Review</button>
            </div>
        </form>
    );
};

export default AddStaffReview;