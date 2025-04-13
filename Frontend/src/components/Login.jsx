import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const navigate=useNavigate();

    

    // handle login
    const handleLogin = async (e) => {
      e.preventDefault();
      const data = {
        email,
        password
      };
    
      try {
        const response = await loginUser(data).unwrap(); // trying to send a login request with the data (most likely containing credentials like email and password).
        alert("Login Successful");
        console.log(response);
        const {token,user}=response;      //destructures the response object to extract the token and user properties.
        dispatch(setUser({user}));             //dispatches an action to update the global state with the user data (likely via Redux).
        navigate('/');
      } catch (error) {
        console.log(error); // Log error for debugging
        setMessage(error?.data?.message || "Please provide valid email and Password");
      }
    };
    

  return (
    <section className='h-screen flex items-center justify-center ' >
        <div className='max-w-sm border shadow bg-white mx-auto' style={{padding:'1rem'}}>
        <h2 className='text-2xl font-semibold' style={{paddingTop:'0.5rem'}}>Please Login</h2>
        <form 
        onSubmit={handleLogin}
        className='space-y-5 max-w-sm mx-auto ' style={{paddingTop:'0.5rem'}}>
            <input 
            type='email' name='email' id='email' placeholder='Enter your email' required
             className='w-full bg-gray-100 focus:outline-none' style={{padding:'0.5rem',marginTop:'2rem'}}
              onChange={(e)=>setEmail(e.target.value)}/>
            {/* Added margin to separate the fields */}
            <input 
            onChange={(e)=>setPassword(e.target.value)}
            type='password' name='password' id='password' placeholder='Enter your password' required
             className='w-full bg-gray-100 focus:outline-none' style={{padding:'0.5rem', marginTop: '2rem'}}/>
             {
                  message&& <p className='text-red-500'>{message}</p>
             }
             <button type='submit' className='w-full bg-red-700 text-white hover:bg-indigo-500 font-medium rounded-md '
             style={{padding:'0.8rem',marginTop:'2rem'}}>Login</button>
        </form>
        <p className='my-5 italic text-sm text-center' style={{ marginTop: '1rem' }}>
  Don't have an account? <Link to='/register' className='text-blue-500 hover:underline'>Register</Link> here.
</p>

        </div>
    </section>
  )
}

export default Login
