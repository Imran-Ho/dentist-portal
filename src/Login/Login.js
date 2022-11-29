import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextAPI/ContextProvider';
import useToken from '../hooks/useToken';

const Login = () => {
    const {logInWithEmail} = useContext(AuthContext);
    const [loginError, setLoginError] = useState("")
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

// for jwt verification
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)

    if(token){
        navigate(from, {replace: true});
    }


    const { register, formState: { errors }, handleSubmit } = useForm()
    const [data, setData] = useState("")

    const handleSignIn = data =>{
        setLoginError('')
        logInWithEmail(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user)
            setLoginUserEmail(data.email);
            
        })
        .catch(error =>{
            console.log(error.message)
            setLoginError(error.message)
        })
    }

    return (
        <div className='h-[500px] flex justify-center items-center border'>
        <div className='w-96 p-6'>
            <h2 className='text-3xl text-center'>Login</h2>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input 
                    type="email" 
                    {...register("email", { 
                        required: "Email Address is required" 
                    })} className="input input-bordered w-full" />  
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password"
                     {...register("password", {
                        required: "Password is required.",
                        minLength: {value: 6, message: 'Password should be more than 6 digits or longer.' }
                        })} className="input input-bordered w-full" />
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    <label className="label">
                        <span className="label-text">forget Password ?</span>
                    </label>  
                </div>
                
                <p>{data}</p>
                <input className='btn btn-accent w-full' value='Login' type="submit" />
                <div>
                    {loginError && <p>{loginError}</p>}
                </div>
                <p>new to Doctor portal <Link className='text-secondary' to='/signup'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>Sign with google</button>
            </form>
        </div>
    </div>
    );
};

export default Login;