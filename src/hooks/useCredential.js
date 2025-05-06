import { useEffect, useState } from "react";

const useCredential = () => {

    const id = localStorage.getItem('uId')
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [service, setService] = useState({});
    const [staffs, setStaffs] = useState([]);
    const [staff, setStaff] = useState({})
    const [slots, setSlots] = useState([]);
    const [slot, setSlot] = useState({});
    const [payments, setPayments] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [paymentsByEmail, setPaymentsByEmail] = useState([]);
    const [staffPayments, setStaffPayments] = useState([])
    const [selectedServices, setSelectedServices] = useState([])

    // getting userInfo from localStorage id and backend API
    const userData = () => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/user/${id}`)
                const result = await response.json()
                setUser(result.user);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    // persist login
    useEffect(() => {
        if (id) {
            userData()
        } else {
            setUser({})
        }
        //eslint-disable-next-line
    }, [])

    // Fetch Categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/categories`)
                const result = await response.json()

                if (result.status) {
                    setCategories(result.categories)
                }
                else {
                    console.log(result);
                }
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [])

    // Fetch Services
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/services`)
                const result = await response.json()

                if (result.status) {
                    setServices(result.services)
                }
                else {
                    console.log(result);
                }
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [])

    //   Fetch Staffs
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/staffs`)
                const result = await response.json()

                if (result.status) {
                    setStaffs(result.staffs)
                }
                else {
                    console.log(result);
                }
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [])

    //   Fetch Slots
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
    }, [])

    //   Fetch Payments (For Admin Dashboard)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/payments`)
                const result = await response.json()

                if (result.status) {
                    setPayments(result.payments)
                }
                else {
                    console.log(result);
                }
            } catch (error) {
                fetchData();
            }
        };
        user.role === 'admin' && fetchData();
    }, [user.role])

    // Fetch Payments by email (For User Dashboard)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/payments-email/${user.email}`)
                const result = await response.json()

                if (result.status) {
                    setPaymentsByEmail(result.payments)
                }
                else {
                    console.log(result);
                }
            } catch (error) {
                fetchData();
            }
        };
        user.role === 'user' && fetchData();
    }, [user.role, user.email])

    // Fetch Payments by staff (For Staff Dashboard)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sheba-xyz-backend.onrender.com/staff-payments/${user.name}`)
                const result = await response.json()

                if (result.status) {
                    setStaffPayments(result.payments)
                }
                else {
                    console.log(result);
                }
            } catch (error) {
                fetchData();
            }
        };
        user.role === 'staff' && fetchData();
    }, [user.role, user.name])

    // email
    const logOut = () => {
        localStorage.removeItem('uId')
        setUser({})
    }

    return {
        user,
        setUser,
        users,
        setUsers,
        categories,
        setCategories,
        services,
        setServices,
        service,
        setService,
        staffs,
        setStaffs,
        slots,
        setSlots,
        selectedServices,
        setSelectedServices,
        slot,
        setSlot,
        staff,
        setStaff,
        payments,
        reviews, 
        setReviews,
        setPayments,
        paymentsByEmail,
        staffPayments,
        logOut
    }
};

export default useCredential;