import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const ViewUsers = () => {

    const { users, setUsers } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/users`)
                const result = await response.json()

                if (result.status) {
                    setUsers(result.users)
                }
                else {
                    console.log(result);
                }
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [setUsers])

    const handleDelete = async (id) => {

        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/user/${id}`, {
                    method: 'DELETE'
                })
                const result = await response.json()

                if (result.status) {
                    toast.error(`${result.message}`)
                    const fetchData = async () => {
                        try {
                            const response = await fetch(`https://sheba-xyz-backend.onrender.com/users`)
                            const result = await response.json()

                            if (result.status) {
                                setUsers(result.users)
                            }
                            else {
                            }
                        } catch (error) {
                            fetchData();
                        }
                    };
                    fetchData();
                }
                else {
                }
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    return (
        <div className="overflow-auto my-5 max-h-80 p-2">
            <table className="min-w-full border relative">
                <thead className="bg-white border-b sticky -top-3">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">#</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Name</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Email</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Role</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 &&
                        users.map((user, index) =>
                            <tr key={user._id} className="odd:bg-gray-100 even:bg-white border-b">
                                <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{user.name}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{user.email}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap capitalize">{user.role}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap capitalize flex items-center">
                                    <svg onClick={() => navigate(`/edit-user/${user._id}`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-500 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>

                                    <svg onClick={() => handleDelete(user._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-rose-500 ml-2 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>
                                    {/* <button onClick={() => navigate(`/edit-user/${user._id}`)} className='px-3 py-1 rounded bg-slate-300'>Edit</button> */}
                                    {/* <button className='px-3 py-1 rounded bg-rose-300 mx-1'>Delete</button> */}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ViewUsers;