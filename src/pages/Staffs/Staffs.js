import React from 'react';
import Navbar from '../../components/Navbar';
import useAuth from '../../hooks/useAuth';
import StaffCard from '../../components/Staffs/StaffCard';
import StaffCardSkeleton from '../../components/Skeleton/StaffCardSkeleton';

const Staffs = () => {

    const { staffs } = useAuth()

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    {
                        staffs.length > 0 ?
                            staffs.map(staff => <StaffCard key={staff._id} staff={staff} />)
                            :
                            <>
                                <StaffCardSkeleton />
                                <StaffCardSkeleton />
                                <StaffCardSkeleton />
                                <StaffCardSkeleton />
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Staffs;