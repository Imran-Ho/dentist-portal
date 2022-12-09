
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../../shared/Loading';
import AppointmentOption from '../AppointmentOption/AppointmentOption';

import ModalSection from './ModalSection';

const AvailableAppointment = ({ selectedDate }) => {
    // const [appointmentOption, setAppointmentOption] = useState([])
    const [modal, setModal] = useState(null)
    const date = format(selectedDate, 'PP');
    const {data:appointmentOption = [], refetch, isLoading} = useQuery({
        queryKey: ['slots', date],
        queryFn: () => fetch(`https://doctor-site-server.vercel.app/slots?date=${date}`)
        .then(res => res.json())
    })

    if(isLoading){
        return <Loading></Loading>
    }
// we use react query instead of useEffect

    // useEffect(() => {
    //     fetch('https://doctor-site-server.vercel.app/slots')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOption(data))
    // }, [])
    return (
        <section className='mt-10'>
            <div>
                <p className='text-center text-xl font-bold text-secondary'>picked date: {format(selectedDate, 'PP')}</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6'>
                {
                    appointmentOption.map(option => <AppointmentOption
                        key={option._id}
                        appointments={option}
                        setModal={setModal}
                    ></AppointmentOption>)
                }
            </div>
            {modal && <ModalSection
                selectedDate={selectedDate}
                modal={modal}
                refetch={refetch}
                setModal={setModal}
            ></ModalSection>}
        </section>
    );
};

export default AvailableAppointment;