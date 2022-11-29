import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../ContextAPI/ContextProvider';

const DisplayError = () => {
    const error = useRouteError()
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate()

    const signOut = ()=>{
        logOut()
        .then(()=>{
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='border rounded my-10'>
            <div className="text-red-500 text-center text-3xl mt-10">Something went wrong!!!</div>
            <p className='text-red-400 text-2xl text-center my-6'>{error.statusText || error.message}</p>
            <h4 className='text-center text-3xl my-6'>Please <button className='text-blue-800' onClick={signOut}>Sign Out</button> and log back in.</h4>
        </div>
    );
};

export default DisplayError;