import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom'
import StaffEarnings from '../../components/Staffs/StaffEarnings';
import StaffAppointments from '../../components/Staffs/StaffAppointments';

const StaffDashboard = () => {
    const navigate = useNavigate()
    const { user, logOut } = useAuth()

    useEffect(() => {
        user.role === 'user' && navigate('/dashboard')
        user.role === 'admin' && navigate('/admin')
        user.role === 'staff' && navigate('/staff')
    }, [user.role, navigate])

    return (
        <div className=''>
            <Navbar />
            <div className="container mx-auto p-2">

                <div className="flex justify-between items-center mt-10">
                    <h1>Welcome <span className='text-sky-500 capitalize'>{user.name}</span></h1>
                    <button onClick={logOut} className='border p-2 rounded-md text-white bg-rose-500 hover:bg-rose-600'>Log Out</button>
                </div>

                {/* md:grid-cols-2 */}
                <div className="w-full grid grid-cols-1 gap-10 mt-5">

                    <div className="shadow p-2 rounded border border-purple-600">
                        <h2>Earnings</h2>
                        <StaffEarnings />
                    </div>

                    {/* md:col-span-2 col-span-1  */}
                    <div className="shadow p-2 rounded border border-lime-400">
                        <h2>Appointments History</h2>
                        <StaffAppointments />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;