import React from 'react';
import useAuth from '../../hooks/useAuth';

const AppointmentsHistory = () => {

    const { paymentsByEmail } = useAuth()

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(":");
        const formattedHours = (hours % 12) || 12; // Convert to 12-hour format
        const period = hours < 12 ? "AM" : "PM";
        return `${formattedHours}:${minutes} ${period}`;
    }

    return (
        <div className="overflow-auto my-5 md:max-h-[525px] max-h-80 p-2">
            <table className="min-w-full border relative">
                <thead className="bg-white border-b sticky -top-3">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">#</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Order Id</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Date</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Service</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Slot</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Time</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Staff</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        paymentsByEmail.length > 0 &&
                        paymentsByEmail.map((payment, index) =>
                            <tr key={payment._id} className="odd:bg-gray-100 even:bg-white border-b">
                                <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{payment.trx_id}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{payment.date}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{payment.service.name}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{payment.slot.label}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{formatTime(payment.slot.start_time)} - {formatTime(payment.slot.end_time)}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{payment.staff.name}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentsHistory;