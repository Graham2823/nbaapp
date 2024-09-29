import React, { useState, useContext } from 'react';
import { UserContext } from '@/context/userContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import "../../app/app.css"
import Link from 'next/link';


function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { handleSignin, setUsername, setFavoriteTeams, setFavoritePlayers, favoriteTeams, favoritePlayers } = useContext(UserContext);
    const router = useRouter();
    

	const handleSignInClick = async () => {
        try {
            const userCredential = await handleSignin(email, password);

            if (userCredential && userCredential.user) {
                const userID = userCredential.user.uid;

                axios
                    .get(`https://nbaapp.vercel.app/api/auth/signin?uid=${userID}`)
                    .then((response) => {
                        const username = response.data.username;
                        setUsername(username);

                        // Synchronous form of setFavoriteTeams
                        setFavoriteTeams(response.data.favoriteTeams);

                        setFavoritePlayers(response.data.favoritePlayers);
                        localStorage.setItem('username', JSON.stringify(username));
                        localStorage.setItem('favoriteTeams', JSON.stringify(response.data.favoriteTeams))
                        localStorage.setItem('favoritePlayers', JSON.stringify(response.data.favoritePlayers))
                        router.push('/');
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                        console.error('Complete error object:', error.response ? error.response.data : error);
                    });
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
            <p>Dont have an account?Sign up <Link href="/auth/Signup">Here</Link></p>
		</div>
	);
}
export default SignIn;
