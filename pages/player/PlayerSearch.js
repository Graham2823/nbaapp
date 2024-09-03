import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import PlayerInput from '@/components/PlayerInput';
import {Button} from "react-bootstrap"

const PlayerSearch = () => {
	const router = useRouter();
	const [p1Name, setp1Name] = useState()
	const [p2Name, setp2Name] = useState()
	const [name, setName] = useState();


	const handleSubmit = () => {
		router.push(`/player/PlayerDetails/?first=${name.split(" ")[0]}&last=${name.split(" ")[1]}${name.split(" ")[2]? "%20"+ name.split(" ")[2] : ''}`);
	};

	const comparePlayers = () => {
		router.push(
			`/player/PlayerDetails?p1Name=${p1Name.split(" ")[0]}_${p1Name.split(" ")[1]}${p1Name.split(" ")[2]? "%20"+ p1Name.split(" ")[2] : ''}&p2Name=${p2Name.split(" ")[0]}_${p2Name.split(" ")[1]}${p2Name.split(" ")[2]? "%20"+ p2Name.split(" ")[2] : ''}`
		);
	};

	return (
		<div className='playerPage'>
			<ToastContainer />
			<div>
				<div className='searchPlayer'>
					<h3>Search Player Stats:</h3>
					<PlayerInput state={name} setState={setName}/>
					<Button onClick={() => handleSubmit()} className='button searchButton'>Search</Button>
				</div>
				<div className='comparePlayers'>
					<h3>Compare Player&apos;s Stats</h3>
					<h4>Player One:</h4>
					<PlayerInput state={p1Name} setState={setp1Name}/>
					<h4>Player Two:</h4>
					<PlayerInput state={p2Name} setState={setp2Name}/>
					<Button onClick={()=> comparePlayers()} className='button searchButton'>Compare Players</Button>
				</div>
			</div>
		</div>
	);
};

export default PlayerSearch;
