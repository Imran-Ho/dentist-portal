import React from 'react';
import background from '../../assets/images/appointment.png'

const Contact = () => {

    return (
        <div className=''
        style={{background:`url(${background})`}}
        >
            <div>
                <h2 className='text-primary font-bold text-xl pt-16 text-center'>Contact Us</h2>
                <h2 className='text-white text-3xl text-center'>Stay connected with us</h2>
            </div>
            <div>
                <div className="hero">
                    <div className="">
                        <div className="card flex-shrink-0 w-full max-w-sm">
                            <div className="card-body">
                                <div className="form-control">
                                    <input type="text" placeholder="email address" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <input type="text" placeholder="subject" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <textarea name="text" placeholder='your message' id="" cols="40" rows="3" className="textarea textarea-bordered"></textarea>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;