import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import CreateUser from '../../components/Admin/User/CreateUser';
import ViewUsers from '../../components/Admin/User/ViewUsers';
import { ToastContainer } from 'react-toastify';
import CreateCategory from '../../components/Admin/Category/CreateCategory';
import ViewCategories from '../../components/Admin/Category/ViewCategories';
import CreateService from '../../components/Admin/Service/CreateService';
import ViewServices from '../../components/Admin/Service/ViewServices';
import ViewAppointments from '../../components/Admin/Appointment/ViewAppointments';
import CreateStaff from '../../components/Admin/Staff/CreateStaff';
import CreateSlot from '../../components/Admin/Slot/CreateSlot';
import ViewSlots from '../../components/Admin/Slot/ViewSlots';
import SelectedForStaff from '../../components/Admin/Staff/SelectedForStaff';
import ViewStaffs from '../../components/Admin/Staff/ViewStaffs';
import ViewPayments from '../../components/Admin/Payment/ViewPayments';

const AdminDashboard = () => {

    const navigate = useNavigate()
    const { user, selectedServices, logOut } = useAuth()

    useEffect(() => {
        user.role === 'user' && navigate('/dashboard')
        user.role === 'admin' && navigate('/admin')
        user.role === 'staff' && navigate('/staff')
    }, [user.role, navigate])

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-2">

                <div className="flex justify-between items-center mt-5">
                    <h1>Welcome <span className='text-sky-500 capitalize'>{user.name}</span></h1>
                    <button onClick={logOut} className='border p-2 rounded-md text-white bg-rose-500 hover:bg-rose-600'>Log Out</button>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 my-10">
                    <div className="min-w-full shadow rounded border border-gray-300">
                        <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'><span>User Profile</span></h2>
                        <CreateUser />
                        <ViewUsers />
                    </div>

                    <div className="shadow rounded border border-gray-300 w-full">
                        <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'><span>Staff Profile</span></h2>
                        {
                            selectedServices.length > 0 && <SelectedForStaff />
                        }
                        <CreateStaff />
                        <ViewStaffs />
                    </div>

                    <div className="shadow rounded border border-blue-200 w-full">
                        <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'><span>Service Slots</span></h2>
                        <CreateSlot />
                        <ViewSlots />
                    </div>

                    <div className="shadow rounded border border-blue-200 w-full">
                        <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'><span>Categories</span></h2>
                        <CreateCategory />
                        <ViewCategories />
                    </div>

                    <div className="shadow rounded border border-orange-100 w-full md:col-span-2 col-span-1">
                        <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'><span>Services</span></h2>
                        <CreateService />
                        <ViewServices />
                    </div>

                    <div className="shadow rounded border border-lime-600 w-full md:col-span-2 col-span-1">
                        <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'><span>Payments History</span></h2>
                        <ViewPayments />
                    </div>

                    <div className="shadow rounded border border-purple-400 w-full md:col-span-2 col-span-1">
                        <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'><span>Appointments History</span></h2>
                        <ViewAppointments />
                    </div>

                </div>
            </div>

            <ToastContainer autoClose={2000} />
        </div>
    );
};

export default AdminDashboard;