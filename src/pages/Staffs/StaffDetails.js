import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import StaffAbout from '../../components/Staffs/StaffAbout';
import StaffReview from '../../components/Staffs/StaffReview';
import { ToastContainer } from 'react-toastify';

const StaffDetails = () => {

      const { staff, setStaff, reviews, setReviews } = useAuth()
      const { id } = useParams()

      useEffect(() => {
            if (!staff.name) {
                  const fetchData = async () => {
                        try {
                              const response = await fetch(`https://sheba-xyz-backend.onrender.com/staff/${id}`)
                              const result = await response.json()

                              if (result.status) {
                                    setStaff(result.staff)
                              }
                              else {
                                    console.log(result);
                              }
                        } catch (error) {
                              fetchData();
                        }
                  };
                  fetchData();
            }
      }, [staff.name, id, setStaff])

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const response = await fetch(`https://sheba-xyz-backend.onrender.com/staff-reviews/${staff.name}`)
                        const result = await response.json()

                        if (result.status) {
                              setReviews(result.reviews)
                        }
                        else {
                              console.log(result);
                        }
                  } catch (error) {
                        fetchData();
                  }
            };
            fetchData();
      }, [staff.name, setReviews])

      const [toggle, setToggle] = useState(false)
      const [tab, setTab] = useState('About')

      const handleTabChange = (tabName) => {
            if (tab !== tabName) {
                  setToggle(curr => !curr)
                  setTab(tabName)
            }
      }

      return (
            <div>
                  <Navbar />
                  <div className="container mx-auto p-2">
                        <div className="md:flex items-center mt-5 h-44">
                              <div className="">
                                    <img src={staff.image} className='w-24 mx-auto rounded-full shadow' alt={staff.name} />
                              </div>

                              <div className="md:pl-5 md:m-0 mt-10">
                                    <h2 className='text-xl font-bold'>{staff.name}</h2>
                                    <h3 className='text-sm text-gray-600'>{staff.bio}</h3>
                                    <h4 className='text-sm text-gray-800'>৳ {Number(staff.rate || 0).toLocaleString()}</h4>
                              </div>
                        </div>

                        <div className="mt-5 pt-5 md:pt-0">
                              <button
                                    onClick={() => handleTabChange('About')}
                                    className={`text-lg font-bold tracking-wide ${toggle ? 'text-sky-950' : 'text-sky-800'} border-b-2 ${toggle ? 'hover:border-sky-800' : 'border-sky-800'} p-2`}>About</button>

                              <button
                                    onClick={() => handleTabChange('Review')}
                                    className={`text-lg font-bold tracking-wide ${toggle ? 'text-sky-800' : 'text-sky-950'} border-b-2 ${toggle ? 'border-sky-800' : 'hover:border-sky-800'} p-2 ms-5`}>Ratings and Reviews</button>
                        </div>
                  </div>
                  {
                        staff.name && tab === 'About' && <StaffAbout staff={staff} />
                  }

                  {
                        staff.name && tab === 'Review' && <StaffReview staff={staff} reviews={reviews} />
                  }
                  <ToastContainer autoClose='2000' />
            </div>
      );
};

export default StaffDetails;