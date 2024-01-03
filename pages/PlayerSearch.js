import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import PlayerInput from '@/components/PlayerInput';

const PlayerSearch = () => {
	const router = useRouter();
	const [p1Name, setp1Name] = useState()
	const [p2Name, setp2Name] = useState()
	const [name, setName] = useState();


	const handleSubmit = () => {
		router.push(`/PlayerDetails/?first=${name.split(" ")[0]}&last=${name.split(" ")[1]}${name.split(" ")[2]? "%20"+ name.split(" ")[2] : ''}`);
	};

	const comparePlayers = () => {
		router.push(
			`/PlayerDetails?p1Name=${p1Name.split(" ")[0]}_${p1Name.split(" ")[1]}${p1Name.split(" ")[2]? "%20"+ p1Name.split(" ")[2] : ''}&p2Name=${p2Name.split(" ")[0]}_${p2Name.split(" ")[1]}${p2Name.split(" ")[2]? "%20"+ p2Name.split(" ")[2] : ''}`
		);
	};

	return (
		<div className='playerPage'>
			<ToastContainer />
			<div>
				<div className='searchPlayer'>
					<h3>Search Player Stats:</h3>
					<PlayerInput state={name} setState={setName}/>
					<button onClick={() => handleSubmit()}>Search</button>
				</div>
				<div className='comparePlayers'>
					<h3>Compare Player&apos;s Stats</h3>
					<h4>Player One:</h4>
					<PlayerInput state={p1Name} setState={setp1Name}/>
					<h4>Player Two:</h4>
					<PlayerInput state={p2Name} setState={setp2Name}/>
					<button onClick={()=> comparePlayers()}>Compare Players</button>
				</div>
			</div>
		</div>
	);
};

export default PlayerSearch;
