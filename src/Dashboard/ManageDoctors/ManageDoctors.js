import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../shared/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

// if you do not want to delete
    const handleCancel = () =>{
        setDeletingDoctor(null)
    }


    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error)
            }
        }
    })

// deleting action 
    const deletingAction = doctor =>{
        fetch(`http://localhost:5000/doctors/${doctor._id}`,{
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                refetch()
                toast.success(`Doctor ${doctor.name} deleted successfully`)
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="text-2xl">Manage Doctors:{doctors.length}</div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors?.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={doctor.image} alt='' />
                                        </div>
                                    </div>
                                </th>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={()=>setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                    
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
{/* deleting modal */}
            {
                deletingDoctor && <ConfirmationModal
                title={`are you going to delete?`}
                message={`${deletingDoctor.name} is being deleted.`}
                handleCancel={handleCancel}
                directActionToDelete={deletingAction}
                buttonName="Delete"
                modalData={deletingDoctor}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;