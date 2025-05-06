import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import BookingModal from '../Booking/BookingModal';

const StaffMiniCard = ({ staff }) => {

      const { setStaff, setSlot } = useAuth()
      const navigate = useNavigate()

      const [isModalOpen, setIsModalOpen] = useState(false);

      const openModal = () => {
            setIsModalOpen(true);
            setStaff(staff)
      };

      const closeModal = () => {
            setIsModalOpen(false);
            setStaff({})
            setSlot({})
      };

      return (
            <div className='bg-gray-50 border hover:border-sky-800 rounded-md shadow-md p-2'>
                  <div className="items-center">
                        <img src={staff.image} className='w-16 mx-auto rounded-full' alt={staff.name} />

                        <div className="mt-3">
                              <h2 className='text-center font-bold'>{staff.name}</h2>
                              <h2 className='text-center text-xs py-1 line-clamp-1'>{staff.bio}</h2>
                              <h4 className='text-center text-sm text-gray-800'>৳ {Number(staff.rate).toLocaleString()}</h4>
                        </div>

                        <div className="flex lg:block xl:flex items-center justify-between mt-3">
                              <button
                                    onClick={openModal}
                                    className='bg-green-800 hover:bg-green-900 text-white py-2 px-3 rounded-full text-xs flex items-center my-2 mx-auto'>Book Now
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>

                              </button>
                              <button onClick={() => {
                                    setStaff(staff)
                                    navigate(`/staff-details/${staff._id}`)
                              }} className='bg-sky-800 hover:bg-sky-900 text-white py-2 px-3 rounded-full text-xs flex items-center my-2 mx-auto'>View Full Profile <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                    </svg></button>
                        </div>
                  </div>

                  <BookingModal isOpen={isModalOpen} onClose={closeModal}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                              {/* dark:text-white */}
                              <h3 className="text-lg font-semibold text-gray-900">
                                    Available Service Slots
                              </h3>

                              <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                              </button>
                        </div>
                  </BookingModal>
            </div>
      );
};

export default StaffMiniCard;