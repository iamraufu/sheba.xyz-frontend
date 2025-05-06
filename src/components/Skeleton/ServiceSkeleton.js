import React from 'react';

const ServiceSkeleton = () => {
      return (
            <div className="animate-pulse w-60 h-56 mx-auto">
                  <div className="flex-1 space-y-6 py-1">
                        <div className="h-36 bg-slate-200 rounded shadow"></div>
                        <div className="h-6 bg-slate-200 rounded"></div>
                  </div>
            </div>
      );
};

export default ServiceSkeleton;