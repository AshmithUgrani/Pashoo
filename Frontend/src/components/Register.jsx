import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Used for navigation after successful registration

  const [ registerUser,{isLoading}]=useRegisterUserMutation();
  

  const handleRegister = async (e) => {
    e.preventDefault();

    // Clear previous message before submitting
    setMessage('');

    // Basic form validation
    if (!username || !email || !password) {
      setMessage('All fields are required!');
      return;
    }

   

    // Optional: Password length validation
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long!');
      return;
    }

    // Simulating a registration API call
    const data = {
      username,
      email,
      password,
    };
    try{
         await registerUser(data).unwrap();
         alert("registration sucessfull");
    }catch(error){
      setMessage("Registration failed");
    }
    

    
    // Replace this with actual API call logic in the real-world application
    setTimeout(() => {
      setMessage('Registration successful!');
      navigate('/login'); // Redirect to login page after successful registration
    }, 1000);
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto" style={{ padding: '1rem' }}>
        <h2 className="text-2xl font-semibold" style={{ paddingTop: '0.5rem' }}>
          Please Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto" style={{ paddingTop: '0.5rem' }}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            required
            className="w-full bg-gray-100 focus:outline-none"
            style={{ padding: '0.5rem', marginTop: '2rem' }}
            onChange={(e) => {
              setUsername(e.target.value);
              setMessage(''); // Clear the message when user starts typing
            }}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            className="w-full bg-gray-100 focus:outline-none"
            style={{ padding: '0.5rem', marginTop: '2rem' }}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(''); // Clear the message when user starts typing
            }}
          />

          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage(''); // Clear the message when user starts typing
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            className="w-full bg-gray-100 focus:outline-none"
            style={{ padding: '0.5rem', marginTop: '2rem' }}
          />
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full bg-red-700 text-white hover:bg-indigo-500 font-medium rounded-md"
            style={{ padding: '0.8rem', marginTop: '2rem' }}
          >
            Register
          </button>
        </form>
        <p className="my-5 italic text-sm text-center" style={{ marginTop: '1rem' }}>
          Already have an account? Please{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>{' '}
          here.
        </p>
      </div>
    </section>
  );
};

export default Register;
