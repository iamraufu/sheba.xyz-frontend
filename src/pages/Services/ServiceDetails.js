import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom'
import StaffMiniCard from '../../components/Staffs/StaffMiniCard';

const ServiceDetails = () => {

    const { user, staffs, service, setService } = useAuth()
    const { id } = useParams()

    useEffect(() => {
        if (!service.name) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://sheba-xyz-backend.onrender.com/service/${id}`)
                    const result = await response.json()

                    if (result.status) {
                        setService(result.service)
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
    }, [service.name, id, setService])

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-2">
                <h1 className='text-xl lg:text-3xl my-5 lg:my-10 font-bold'>{service.name}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="w-full p-5 order-last lg:order-first">
                        <img src={service.image} className='max-w-full mx-auto rounded-xl shadow' alt={service.name} />
                        <h2 className='font-bold text-xl mt-10 py-2'>Service Overview</h2>
                        <p className='text-justify'>{service.details}</p>
                    </div>

                    {
                        user.role !== 'admin' && user.role !== 'staff' &&
                        <div className="">
                            <h2 className='font-bold'>Service Providers:</h2>
                            {
                                staffs.length > 0 ?
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                                        {
                                            staffs.filter(staff => staff.services.includes(service.name)).map(staff => <StaffMiniCard key={staff._id} staff={staff} />)
                                        }
                                    </div>
                                    :
                                    <p className='text-center mt-5'>No Staff found for this service</p>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;