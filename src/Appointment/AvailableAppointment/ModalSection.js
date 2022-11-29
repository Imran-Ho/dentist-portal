import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../ContextAPI/ContextProvider';

const ModalSection = ({ modal, setModal, selectedDate, refetch }) => {
    const {user} = useContext(AuthContext);
    const { name, slots, price } = modal
    const date = format(selectedDate, 'PP')

    const handleBooking = event =>{
        event.preventDefault()
        const form = event.target;
        const slot = form.slot.value;
        const patientName = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking ={
            appointmentDate: date,
            treatmentName: name,
            patientName: patientName,
            slot,
            email,
            phone,
            price
        }

        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                setModal(null)
                toast.success('booking confirmed')
                refetch();
            }
            else{
                // it comes from server-end
                toast.error(data.message)
            }
        })

    }
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-6'>
                        <input type="text" disabled value={date} className="input w-full input-bordered" />
                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots.map((slot, idx) => <option
                                key={idx}
                                 value={slot}>{slot}</option>)
                            }
                           
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="your name" className="input w-full input-bordered" />
                        <input name='email' type="text" defaultValue={user?.email} disabled placeholder="your email" className="input w-full input-bordered" />
                        <input name='phone' type="text" placeholder="your phone" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalSection;