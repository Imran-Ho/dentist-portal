import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../shared/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();

// imgbb key from env.local
    const imageBBHostingKey = process.env.REACT_APP_imagebb_key;
    

// find only doctors specialty from database
    const {data: specialties, isLoading} = useQuery({
        queryKey: ['specialty'],
        queryFn: async () =>{
            const res = await fetch('https://doctor-site-server.vercel.app/appointmentSpecialty')
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image );
        const url = `https://api.imgbb.com/1/upload?key=${imageBBHostingKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url)

            // to send imageUrl and doctor info to Backend

                const doctor ={
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }

            // save doctor data to database
                fetch('https://doctor-site-server.vercel.app/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result)
                    toast.success(`${data.name} is added successfully`)
                    navigate('/dashboard/manage-doctor')
                })
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h3 className='text-3xl'>add doctor</h3>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", {
                        required: "Name is required."
                    })} className="input input-bordered w-full" />
                    {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", {
                        required: "Email is required."
                    })} className="input input-bordered w-full" />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register('specialty')} className="select input-bordered w-full max-w-xs">
                        <option disabled selected>please select a specialty</option>
                        {
                            specialties.map(specialty => <option
                            key={specialty._id}
                            value={specialty.name}
                            >{specialty.name}</option>)
                        }    
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Keep your photo here</span>
                    </label>
                    <input type="file" {...register("photo", {
                        required: "photo is required."
                    })} className="input input-bordered w-full" />
                    {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}
                </div>

                <input className='btn btn-accent w-full mt-6' value='Add Doctor' type="submit" />

            </form>
        </div>
    );
};

export default AddDoctor;