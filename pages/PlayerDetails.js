import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../app/app.css';

const PlayerDetails = () => {
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
	}, []);
	console.log(playerDetails);
	return (
		<div>
			{playerDetails.length === 0 ? (
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
						<img
							src={playerDetails.details.player[0].strThumb}
							className='playerPic'
						/>
						<div>
							<h3>{playerDetails.details.player[0].strPlayer}</h3>
							<h3>{playerDetails.details.player[0].strPosition}</h3>
							<h3>{playerDetails.details.player[0].strHeight}</h3>
							<h3>{playerDetails.details.player[0].strTeam}</h3>
						</div>
					</div>
					<div className='playerStats'>
						<table>
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
										<td class='season'>0</td>
										<td class='gamesPlayed'>0</td>
										<td class='minutesPerGame'>0</td>
										<td class='pointsPerGame'>0</td>
										<td class='reboundsPerGame'>0</td>
										<td class='assistsPerGame'>0</td>
										<td class='stealsPerGame'>0</td>
										<td class='blocksPerGame'>0</td>
										<td class='turnoversPerGame'>0</td>
									</tr>
								) : (
									<tr>
										<td class='season'>{playerDetails.stats.season}</td>
										<td class='gamesPlayed'>
											{playerDetails.stats.games_played}
										</td>
										<td class='minutesPerGame'>{playerDetails.stats.min}</td>
										<td class='pointsPerGame'>{playerDetails.stats.pts}</td>
										<td class='reboundsPerGame'>{playerDetails.stats.reb}</td>
										<td class='assistsPerGame'>{playerDetails.stats.ast}</td>
										<td class='stealsPerGame'>{playerDetails.stats.stl}</td>
										<td class='blocksPerGame'>{playerDetails.stats.blk}</td>
										<td class='turnoversPerGame'>
											{playerDetails.stats.turnover}
										</td>
									</tr>
								)}
							</tbody>
						</table>
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
