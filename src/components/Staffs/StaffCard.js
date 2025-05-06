import React from 'react';
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const StaffCard = ({ staff }) => {

      const navigate = useNavigate()
      const { setStaff } = useAuth()

      return (
            <div className='bg-gray-50 border hover:border-sky-800 rounded-md shadow-md p-5'>
                  <div className="md:flex items-center">
                        <div className="">
                              <img src={staff.image} className='w-24 mx-auto rounded-full' alt={staff.name} />
                        </div>

                        <div className="md:pl-5 md:m-0 mt-5">
                              <h2 className='text-xl font-bold'>{staff.name}</h2>
                              <h3 className='text-sm font-bold'>{staff.bio}</h3>
                              <h3 className='text-xs text-gray-600'>{staff.location}</h3>
                              <h4 className='text-sm text-gray-800'>৳ {Number(staff.rate).toLocaleString()}</h4>
                        </div>
                  </div>
                  <p className="mt-5 text-justify text-sm text-gray-600 line-clamp-2">{staff.details}</p>
                  <div className='text-xs my-2 text-gray-600 flex start gap-1 flex-wrap items-center h-32 lg:h-20'>
                        {staff.services.length > 3 ?
                              <>
                                    {
                                          staff.services.slice(0, 3).map(service => <p key={service} className='mr-2 p-2 rounded-full border border-gray-700'>{service}</p>)
                                    }
                                    <p className='pl-2'>and {staff.services.length - 3} more . . .</p>
                              </>
                              :
                              staff.services.map(service => <p key={service} className='mr-2 p-2 rounded-full border border-gray-700'>{service}</p>)
                        }
                  </div>
                  <button onClick={() => {
                        setStaff(staff)
                        navigate(`/staff-details/${staff._id}`)
                  }} className='bg-sky-800 hover:bg-sky-900 text-white py-2 px-5 mt-2 rounded-full text-sm flex'>See Profile <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
                </button>
            </div>
      );
};

export default StaffCard;