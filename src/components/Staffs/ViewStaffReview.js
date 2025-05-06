import React from 'react';

const ViewStaffReview = ({ review }) => {

    return (
        <div className='border rounded-md bg-white p-5 w-full my-10'>
            <div className="ms-3">
                <p className='text-sm text-gray-500'>{review.name}</p>
                <p className='text-xs mt-1'>{review.service}</p>
                <p className='mt-5 text-justify'>{review.review}</p>
            </div>
        </div>
    );
};

export default ViewStaffReview;