import React from 'react';
import useAuth from '../../../hooks/useAuth';

const ViewPayments = () => {

    const { payments } = useAuth()

    return (
        <div className="overflow-auto my-5 md:max-h-[525px] max-h-80 p-2">
            <table className="min-w-full border relative">
                <thead className="bg-white border-b sticky -top-3">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">#</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Trx ID</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Amount</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Customer</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Status</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Date</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Service</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 p-3 text-left">Staff</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.length > 0 &&
                        payments.map((payment, index) =>
                            <tr key={payment._id} className="odd:bg-gray-100 even:bg-white border-b">
                                <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{payment.trx_id}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">৳ {Number(payment.staff.rate).toLocaleString()}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{payment.name}</td>
                                <td className={`text-sm ${payment.status === 'success' && 'text-green-700'} ${payment.status === 'fail' && 'text-rose-700'} ${payment.status === 'pending' && 'text-yellow-500'} p-3 capitalize`}>{payment.status}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap capitalize">{payment.date}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{payment.service.name}</td>
                                <td className="text-sm text-gray-900 font-light p-3 whitespace-nowrap">{payment.staff.name}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ViewPayments;