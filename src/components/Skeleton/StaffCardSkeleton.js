import React from 'react';

const StaffCardSkeleton = () => {
      return (
            <div className='animate-pulse bg-gray-50 border rounded-md shadow-md p-5'>
                  <div className="md:flex items-center">
                        <div className="">
                              <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
                        </div>

                        <div className="md:pl-5 md:m-0 mt-5">
                              <div className="h-5 w-72 bg-gray-200 rounded my-2"></div>
                              <div className="h-4 w-72 bg-gray-200 rounded my-2"></div>
                              <div className="h-3 w-72 bg-gray-200 rounded my-2"></div>
                              <div className="h-3 w-72 bg-gray-200 rounded my-2"></div>
                        </div>
                  </div>

                  <div className="h-3 w-full bg-gray-200 rounded mt-5"></div>
                  <div className="h-3 w-full bg-gray-200 rounded mt-3"></div>

                  <div className='my-2 flex start gap-1 flex-wrap items-center h-32 lg:h-20'>
                        <div className="h-8 w-60 bg-gray-200 mr-2 p-2 rounded-full border"></div>
                        <div className="h-8 w-60 bg-gray-200 mr-2 p-2 rounded-full border"></div>
                  </div>

                  <div className="h-10 w-40 bg-gray-200 mr-2 p-2 rounded-full border"></div>
            </div>
      );
};

export default StaffCardSkeleton;