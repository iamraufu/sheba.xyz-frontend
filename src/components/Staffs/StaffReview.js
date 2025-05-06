import React from 'react';
import AddStaffReview from './AddStaffReview';
import useAuth from '../../hooks/useAuth';
import ViewStaffReview from './ViewStaffReview';

const StaffReview = ({ staff, reviews }) => {

      const { paymentsByEmail } = useAuth()

      return (
            <div className='py-10 bg-[#f9f8f8]'>
                  <div className="container mx-auto p-2">
                        {
                              paymentsByEmail.filter(service => service.staff.name === staff.name).length !== reviews.filter(review => review.name === staff.name).length && <AddStaffReview />
                        }
                        {
                              reviews.length > 0 ?
                                    reviews.map(review => <ViewStaffReview key={review._id} review={review} />)
                                    :
                                    <div className="border rounded-md bg-white p-5 w-full my-10">
                                          <h1 className='text-2xl text-center'>No Review Found!</h1>
                                    </div>
                        }
                  </div>
            </div>
      );
};

export default StaffReview;