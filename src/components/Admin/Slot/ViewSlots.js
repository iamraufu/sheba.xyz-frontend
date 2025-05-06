import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const ViewSlots = () => {

    const { slots, setSlots } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/slots`)
                const result = await response.json()

                if (result.status) {
                    setSlots(result.slots)
                }
                else {
                    console.log(result);
                }
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [setSlots])

    const handleDelete = async (id) => {

        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/slot/${id}`, {
                    method: 'DELETE'
                })
                const result = await response.json()

                if (result.status) {
                    toast.error(`${result.message}`)
                    const fetchData = async () => {
                        try {
                            const response = await fetch(`https://sheba-xyz-backend.onrender.com/slots`)
                            const result = await response.json()

                            if (result.status) {
                                setSlots(result.slots)
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

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(":");
        const formattedHours = (hours % 12) || 12; // Convert to 12-hour format
        const period = hours < 12 ? "AM" : "PM";
        return `${formattedHours}:${minutes} ${period}`;
    }

    return (
        <div className="overflow-auto my-5 max-h-80">
            <table className="min-w-full border relative">
                <thead className="bg-white border-b sticky -top-3">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">#</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Slot Label</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Slot Duration</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slots.length > 0 &&
                        slots.map((slot, index) =>
                            <tr key={slot._id} className="odd:bg-gray-100 even:bg-white border-b">
                                <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{slot.label}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap capitalize">
                                    <button onClick={() => navigate(`/edit-slot/${slot._id}`)} className='px-3 py-1 rounded bg-slate-300'>Edit</button>
                                    <button onClick={() => handleDelete(slot._id)} className='px-3 py-1 rounded bg-rose-300 mx-1'>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ViewSlots;