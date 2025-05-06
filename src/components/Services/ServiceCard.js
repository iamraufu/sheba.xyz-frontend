import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom'

const ServiceCard = ({ service }) => {

    const { setService } = useAuth()

    return (
        <Link to={`/service-details/${service._id}`} onClick={() => setService(service)}>
            <img src={service.image} className='w-60 rounded shadow mx-auto' alt={service.name} />
            <h2 className='text-center w-3/4 mx-auto font-bold text-base mt-3'>{service.name}</h2>
        </Link>
    );
};

export default ServiceCard;