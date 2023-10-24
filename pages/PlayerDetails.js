import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/app.css';
import { Image } from 'react-bootstrap';
import {Table} from 'react-bootstrap';

const PlayerDetails = () => {
	const router = useRouter();
	const { first, last } = router.query;
	console.log(first);
	console.log(last);
	const [playerDetails, setPlayerDetails] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const handleSubmit = () => {
		axios
			.get(
				`http://localhost:3000/api/getPlayer?firstName=${firstName}&lastName=${lastName}`
			)
			.then((response) => {
				setPlayerDetails(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// This code will only run on the client-side
			setPlayerDetails([]);
		}
		if (first && last) {
			axios
				.get(
					`http://localhost:3000/api/getPlayer?firstName=${first}&lastName=${last}`
				)
				.then((response) => {
					setPlayerDetails(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		}
	}, [first, last]);
	console.log(playerDetails);
	return (
		<div className='playerPage'>
			{playerDetails.length === 0 || !playerDetails.details.player ? (
				<div>
					<h3>Search Player Stats:</h3>
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
			) : (
				<div className='playerDetails'>
					<div className='playerBio'>
						<Image
							src={playerDetails.details.player[0].strThumb}
							className='playerPic'
                            alt='player Picture'
						/>
						<div>
							<h3>{playerDetails.details.player[0].strPlayer}</h3>
							<h3>{playerDetails.details.player[0].strPosition}</h3>
							<h3>{playerDetails.details.player[0].strHeight}</h3>
							<h3>{playerDetails.details.player[0].strTeam}</h3>
						</div>
					</div>
					<div className='playerStats'>
						<Table striped="columns">
							<thead>
								<th>Season</th>
								<th>Games Played</th>
								<th>Minutes Per Game</th>
								<th>Points Per Game</th>
								<th>Rebounds Per Game</th>
								<th>Assists Per Game</th>
								<th>Steals Per Game</th>
								<th>Blocks Per Game</th>
								<th>Turnovers Per Game</th>
							</thead>
							<tbody>
								{playerDetails.stats.length === 0 ? (
									<tr>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
									</tr>
								) : (
									<tr>
										<td class='season'>{playerDetails.stats.season}</td>
										<td class='gamesPlayed'>
											{playerDetails.stats.games_played}
										</td>
										<td>{playerDetails.stats.min}</td>
										<td>{playerDetails.stats.pts}</td>
										<td>{playerDetails.stats.reb}</td>
										<td>{playerDetails.stats.ast}</td>
										<td>{playerDetails.stats.stl}</td>
										<td>{playerDetails.stats.blk}</td>
										<td>{playerDetails.stats.turnover}</td>
									</tr>
								)}
							</tbody>
						</Table>
					</div>
					<div className='description'>
						<p>{playerDetails.details.player[0].strDescriptionEN}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlayerDetails;
