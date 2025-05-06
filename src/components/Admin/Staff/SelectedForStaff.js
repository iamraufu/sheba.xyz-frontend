import React from 'react';
import useAuth from '../../../hooks/useAuth';

const SelectedForStaff = () => {

      const { selectedServices, setSelectedServices } = useAuth()

      const handleServiceRemove = elm => {
            setSelectedServices(selectedServices.filter((item) => item !== elm))
      }

      return (
            <div className='p-2'>
                  {
                        selectedServices.length > 0 &&
                        <div className="flex start gap-1 flex-wrap">
                              <span className='text-sm pt-1'>Selected Services:</span>
                              {
                                    selectedServices.map(service =>
                                          <p key={service} onClick={(e) => handleServiceRemove(service)} title={service} className='bg-gray-700 black text-white text-xs p-2 rounded truncate cursor-pointer flex items-center'>{service}
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 text-rose-500">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                          </p>)
                              }

                        </div>
                  }
            </div>
      );
};

export default SelectedForStaff;