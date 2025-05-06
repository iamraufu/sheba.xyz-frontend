import React from 'react';
import useAuth from '../../hooks/useAuth';

const StaffAbout = ({ staff }) => {

    const { services, slots } = useAuth()

    const staffCategories = staff.services.map(serviceName => (services.find(service => service.name === serviceName) || {}).category || "No Category Found!");
    const uniqueCategories = [...new Set(staffCategories)]

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(":");
        const formattedHours = (hours % 12) || 12; // Convert to 12-hour format
        const period = hours < 12 ? "AM" : "PM";
        return `${formattedHours}:${minutes} ${period}`;
    }

    return (
        <div className='py-10 bg-[#f9f8f8]'>
            <div className="container mx-auto p-2">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="">
                        <div className="border rounded-md bg-white p-5 w-full md:w-11/12">
                            <h2 className='text-xl font-bold'>Policies</h2>

                            <div className="flex items-center mt-5">
                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataslot="icon" className="w-5 h-5 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <div className="ms-3">
                                    <p className='text-xs text-gray-500'>From</p>
                                    <p className='text-xs mt-1'>{staff.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center mt-5">
                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataslot="icon" className="w-5 h-5  text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                </div>
                                <div className="ms-3">
                                    <p className='text-xs text-gray-500'>Service Rate</p>
                                    <p className='text-xs mt-1'>৳ {Number(staff.rate).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-md bg-white mt-5 p-5 w-full md:w-11/12">
                            <h2 className='text-xl font-bold'>Service Slots</h2>

                            <div className="divide-y divide-slate-200 mt-5">
                                {
                                    slots.length > 0 &&
                                    slots.map(slot =>
                                        <div key={slot._id} className='grid grid-cols-2 items-center content-between'>
                                            <div className="text-sm py-2 text-gray-500">{slot.label}</div>
                                            <div className="text-sm py-2 text-gray-500 text-end">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="pt-5 md:pt-0">
                        <h2 className='text-xl font-bold'>Staff Information</h2>
                        <p className="text-justify text-sm leading-6 text-gray-500 mt-3">{staff.details}</p>

                        <div className="border rounded-md bg-white mt-5 p-5">
                            <h2 className='text-xl font-bold'>Categories</h2>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {
                                    uniqueCategories.map(category => <p key={category} className='text-sm mr-2 p-2 rounded-full border border-gray-300'>{category}</p>)
                                }
                            </div>
                        </div>

                        <div className="border rounded-md bg-white mt-5 p-5">
                            <h2 className='text-xl font-bold'>Services</h2>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {
                                    staff.services.map(service => <p key={service} className='text-sm mr-2 p-2 rounded-full border border-gray-300'>{service}</p>)
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffAbout;