import React, { useState, useContext } from 'react';
import { UserContext } from '@/context/userContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import "../app/app.css"
import Link from 'next/link';


function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { handleSignin, setUsername } = useContext(UserContext);
    const router = useRouter();

	const handleSignInClick = async () => {
        try {
            const userCredential = await handleSignin(email, password);
            console.log("userCredential", userCredential)

            if (userCredential && userCredential.user) {
                const userID = userCredential.user.uid;
    
                axios
                    .get(`http://localhost:3000/api/signin?uid=${userID}`)
                    .then((response) => {
                        console.log("response", response);
                        const username = response.data.username;
                        setUsername(username);
                        localStorage.setItem('username', JSON.stringify(username));
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                        // Log the complete error object
                        console.error('Complete error object:', error.response ? error.response.data : error);
                    });
    
                router.push('/');
                console.log('Successfully signed in');
            } else {
                console.error('Error signing in: userCredential or user is undefined');
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };
    

	return (
		<div className='signin'>
			<ToastContainer />
			<h2>Sign In</h2>
			<div>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			</div>
			<button onClick={handleSignInClick}>Sign In</button>
            <p>Dont have an account?Sign up <Link href="/Signup">Here</Link></p>
		</div>
	);
}
export default SignIn;
