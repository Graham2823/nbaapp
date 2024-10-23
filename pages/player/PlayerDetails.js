import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {Spinner} from 'react-bootstrap';
import RenderPlayerDetails from '@/components/player/RenderPlayerDetails';
import RenderComparePlayers from '@/components/compare/RenderComparePlayers';

const PlayerDetails = () => {
	const router = useRouter();
	const { first, last, p1Name, p2Name } = router.query;
	const [playerDetails, setPlayerDetails] = useState([]);
	const [p1Data, setP1Data] = useState([]);
	const [p2Data, setP2Data] = useState([]);
	const [p1Stats, setP1Stats] = useState([]);
	const [p2Stats, setP2Stats] = useState([]);

	useEffect(() => {
		if (first && last) {
			axios
				.get(
					`https://nbaapp.vercel.app/api/players/getPlayer?firstName=${first}&lastName=${last}`
				)
				.then((response) => {
					setPlayerDetails(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
					toast.error('Player Not Found!');
					router.push('/player/PlayerSearch?error=PlayerNotFound');
				});
		}

		if (p1Name && p2Name) {
			axios
				.get(
					`http://localhost:3000/api/compare/comparePlayers?p1Name=${p1Name}&p2Name=${p2Name}`
				)
				.then((response) => {
					if (response.data === 'Could not find one of the players') {
						toast.error(
							'Could Not find one of the players. Please check spelling, and try again'
						);
						router.push('/player/PlayerSearch?error=PlayersNotFound');
					} else {
						setP1Data(response.data.p1Data);
						setP2Data(response.data.p2Data);
						setP1Stats(response.data.p1Stats);
						setP2Stats(response.data.p2Stats);
					}
				})
				.catch((error) => {
					console.log(error);
					toast.error('Players could not be found!');
				});
		}
	}, [first, last, p1Name, p2Name, router]);

console.log("pd",playerDetails)
	return (
		<div className='playerDetailsPage'>
			<ToastContainer />
			{playerDetails.playerData ? (
				<RenderPlayerDetails playerDetails={playerDetails} first={first} last={last}/>
			) : p1Data.length > 0 && p2Data.length > 0 ? (
				<RenderComparePlayers p1Data={p1Data} p1Stats={p1Stats} p2Data={p2Data} p2Stats={p2Stats}/>
			) : (
				<div>
					<h1 style={{ textAlign: 'center' }}>Loading Player Stats. Please wait a minute!</h1>
					<Spinner animation="border" variant="primary"/>
				</div>
			)}
		</div>
	);
};

export default PlayerDetails;
