import React from 'react';
import Navbar from '../../components/Navbar';
import useAuth from '../../hooks/useAuth';
import ServiceCard from '../../components/Services/ServiceCard';
import ServiceSkeleton from '../../components/Skeleton/ServiceSkeleton';
import CategorySkeleton from '../../components/Skeleton/CategorySkeleton';

const Services = () => {

    const { categories, services } = useAuth()

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-2">
                <h1 className='text-3xl mt-5 font-bold'>All Services</h1>

                {
                    categories.length > 0 && services.length > 0 ?
                        categories.map(category =>
                            <div key={category._id} className="my-20">
                                <div className="w-full">
                                    <h2 className='my-5 text-2xl font-bold'>{category.name}</h2>
                                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                        {
                                            services.filter(service => service.category === category.name).map(service =>
                                                <ServiceCard key={service._id} service={service} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        <div>
                            <div className="mt-20">
                                <CategorySkeleton />
                                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    <ServiceSkeleton />
                                    <ServiceSkeleton />
                                    <ServiceSkeleton />
                                    <ServiceSkeleton />
                                </div>
                            </div>
                            <div className="mt-20">
                                <CategorySkeleton />
                                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    <ServiceSkeleton />
                                    <ServiceSkeleton />
                                    <ServiceSkeleton />
                                    <ServiceSkeleton />
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Services;