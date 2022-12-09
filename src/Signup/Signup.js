import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextAPI/ContextProvider';
import useToken from '../hooks/useToken';

const Signup = () => {
    const {newUserCreate, updateUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [data, setData] = useState("")
    const [signupError, setSignupError] = useState("")

// for used custom hook for jwt verification
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);

    if(token){
        navigate('/');
    }

    const handleSignIn = data =>{
        setSignupError("")
        console.log(data)
        newUserCreate(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user)
            // update user
            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
            .then(()=>{
                saveUserInfo(data.name, data.email,)

            })
            .catch(err => console.log(err));
            toast('user created successfully')
        })
        .catch(err =>{
            console.error(err)
            setSignupError(err.message)
        })


    }
    // user info save to database
        const saveUserInfo = (name, email) =>{
            const user = {name, email};
            fetch('https://doctor-site-server.vercel.app/users', {
                method: 'POST',
                headers:{
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                setCreatedUserEmail(email)
            })

        }

// jwt token call
        // const getUserToken = email =>{
        //     fetch(`https://doctor-site-server.vercel.app/jwt?email=${email}`)
        //     .then(res => res.json())
        //     .then(data =>{
        //         if(data.accessToken){
        //             localStorage.setItem('accessToken', data.accessToken);
        //             navigate('/')
        //         }
        //     })
        // }

        
    return (
        <div className='h-[500px] flex justify-center items-center border'>
        <div className='w-96 p-6'>
            <h2 className='text-3xl text-center'>Sign Up</h2>
            <form onSubmit={handleSubmit(handleSignIn)}>
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
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", {
                        required: "Password is required.",
                        minLength: {value: 6, message: "at least 6 digits."},
                        pattern:{value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password must be strong"}
                    })} className="input input-bordered w-full" />
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    <label className="label">
                        <span className="label-text">forget Password ?</span>
                    </label>  
                </div>
                <div>
                    {signupError && <p className='text-red-600'>{signupError}</p>}
                </div>
                
                <p>{data}</p>
                <input className='btn btn-accent w-full' value='Sign Up' type="submit" />
                <p>already have an account <Link className='text-secondary' to='/login'>Log in</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>Sign with google</button>
            </form>
        </div>
    </div>
    );
};

export default Signup;