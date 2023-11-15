import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const PlayerSearch = () => {
    const router = useRouter()
    const {error} = router.query
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [p1FirstName, setP1FirstName] = useState('')
	const [p1LastName, setP1LastName] = useState('')
	const [p2FirstName, setP2FirstName] = useState('')
	const [p2LastName, setP2LastName] = useState('')

    useEffect(()=>{
        if(error){
            if(error === "PlayerNotFound"){
                toast.error('Player Not Found, try again!')
            }else{
                toast.error('One of the players was not found, try again!')
            }
        }
    },[error])


	const handleSubmit = () => {
		router.push(`/PlayerDetails/?first=${firstName}&last=${lastName}`)
	};

	const comparePlayers = () =>{
		router.push(`/PlayerDetails?p1Name=${p1FirstName}_${p1LastName}&p2Name=${p2FirstName}_${p2LastName}`)
	}

	return (
		<div className='playerPage'>
            <ToastContainer/>
				<div>
				<div className='searchPlayer'>
					<h3>Search Player Stats:</h3>
                    {/* <p>Note: Some Rookies have not been added yet :(</p> */}
					<p>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</p>
					<p>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							onChange={(e) => setLastName(e.target.value)}
						/>
					</p>
					<p>
						<button onClick={() => handleSubmit()}>Search</button>
					</p>
				</div>
				<div className='comparePlayers'>
					<h3>Compare Player Stats</h3>
					<div>
						<h5>Player One:</h5>
					<p>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							onChange={(e) => setP1FirstName(e.target.value)}
						/>
					</p>
					<p>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							onChange={(e) => setP1LastName(e.target.value)}
						/>
					</p>
					</div>
					<div>
						<h5>Player Two:</h5>
					<p>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							onChange={(e) => setP2FirstName(e.target.value)}
						/>
					</p>
					<p>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							onChange={(e) => setP2LastName(e.target.value)}
						/>
					</p>
					</div>
					<button onClick={()=>comparePlayers()}>Compare Players</button>
				</div>
				</div>
		</div>
	);
}

export default PlayerSearch