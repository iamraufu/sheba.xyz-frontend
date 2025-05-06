import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'

const BookingModal = ({ isOpen, onClose, children }) => {

    const { user, slots, service, staff, slot, setSlot } = useAuth()
    const [bookingError, setBookingError] = useState("")
    const navigate = useNavigate()

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(":");
        const formattedHours = (hours % 12) || 12; // Convert to 12-hour format
        const period = hours < 12 ? "AM" : "PM";
        return `${formattedHours}:${minutes} ${period}`;
    }

    const bookNow = async () => {

        if (user.email) {
            if (slot.label) {
                let btn = document.getElementById('pay_now')
                btn.innerText = 'Processing Payment ... '
                btn.disabled = true

                const trx_id = await generateTransactionId()

                const formData = {
                    date: new Date().toISOString().split('T')[0],
                    email: user.email,
                    name: user.name,
                    service,
                    staff,
                    slot,
                    trx_id,
                    status: "pending"
                }

                const fetchData = async () => {
                    try {
                        const response = await fetch(`https://sheba-xyz-backend.onrender.com/order`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData)
                        })
                        const result = await response.json()

                        if (result.status) {
                            payNow(staff.rate, trx_id)
                        }
                        else {
                            setBookingError(result.message);
                            btn.innerText = 'Pay Now'
                            btn.disabled = false
                        }
                    } catch (error) {
                        fetchData();
                    }
                };
                fetchData();
            }
            else {
                setBookingError('Please Select any of your desired slot')
            }
        }
        else {
            navigate('/login')
        }
    }

    const payNow = (amount, trx_id) => {

        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/pay/${amount}/${trx_id}`)
                const result = await response.json()
                console.log(result);
                if (result.status) {
                    window.location.replace(`${result.payment_link}`);
                }
                else {
                    console.log(result);
                }
            } catch (error) {
                fetchData();
            }
        };

        fetchData();
    }

    async function generateTransactionId(prefix = 'TX') {

        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        const transactionId = `${prefix}-${timestamp}-${randomNumber}`;

        return transactionId;
    }

    return (
        <div
            className={`fixed inset-0 z-10 
            ${isOpen ? 'flex' : 'hidden'} items-center justify-center overflow-x-hidden overflow-y-auto transition-opacity duration-300 ease-in-out`}
        >
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative bg-white rounded-lg w-96">
                {children}

                {/* Modal Body */}
                <div className="p-4 md:p-5">
                    {/* dark:text-gray-400 */}
                    <p className="text-gray-500">Select your desired slot:</p>
                    {/* dark:text-rose-400 */}
                    <p className="text-rose-500 mb-4 text-sm">{bookingError}</p>
                    <ul className="space-y-4 mb-4 max-h-80 overflow-auto px-2">
                        {
                            slots.length > 0 &&
                            slots.map(slot =>
                                <li key={slot._id}>
                                    <input
                                        onChangeCapture={() => {
                                            setBookingError("")
                                            setSlot(slot)
                                        }}
                                        type="radio" id={`slot-${slot._id}`} name="slot" value={`${slot.label}`} className="hidden peer" required />
                                        {/* dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500*/}
                                    <label htmlFor={`slot-${slot._id}`} className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">{slot.label}</div>
                                            <div className="w-full text-gray-500 dark:text-gray-400">{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</div>
                                        </div>
                                        <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>
                                    </label>
                                </li>
                            )
                        }
                    </ul>

                    <button id='pay_now' onClick={bookNow} className={`text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;