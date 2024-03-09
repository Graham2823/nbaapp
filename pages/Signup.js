import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/fireBase.config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import "../app/app.css"





function CreateUser() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
    const router = useRouter();
  
	const handleSignup = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			const requestData = {
				username: username,
				uid: user.uid,
			};
			const response = await axios.post(
				`https://nbaapp.vercel.app/api/createUser`,
				requestData
			);
            router.push('/Signin')
			toast.success("User Successfully Created, Sign in to Continue!")
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				toast.error("Email already in use");
			} else if (error.code === "auth/weak-password"){
				toast.error("Password should be at least 6 characters");
			}
			else {
				console.error('Error signing up:', error.code);
			}
		}
	};

	return (
		<div className='signup'>
		  <ToastContainer />
		  <h2>Sign Up</h2>
		  <div>
			<input
			  type="username"
			  placeholder="Username"
			  value={username}
			  onChange={(e) => setUsername(e.target.value)}
			/>
			<input
			  type="email"
			  placeholder="Email"
			  value={email}
			  onChange={(e) => setEmail(e.target.value)}
			/>
			<input
			  type="password"
			  placeholder="Password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			/>
		  </div>
		  <button onClick={handleSignup}>Sign Up</button>
          <p>Already have an account? Sign in Here</p>
		</div>
	  );			  
}

export default CreateUser;
