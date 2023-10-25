import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/app.css';
import 'react-toastify/dist/ReactToastify.css';

import { Image } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const PlayerDetails = () => {
	const router = useRouter();
	const { first, last } = router.query;
	console.log(first);
	console.log(last);
	const [playerDetails, setPlayerDetails] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [showGamelog, setShowGamelog] = useState(false);

	const handleSubmit = () => {
		axios
			.get(
				`https://nbaapp.vercel.app/api/getPlayer?firstName=${firstName}&lastName=${lastName}`
			)
			.then((response) => {
				setPlayerDetails(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
                toast.error('Player Not Found!')
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
					`https://nbaapp.vercel.app/api/getPlayer?firstName=${first}&lastName=${last}`
				)
				.then((response) => {
					setPlayerDetails(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
                    toast.error('Player Not Found!');
				});
		}
	}, [first, last]);
	console.log(playerDetails);
	return (
		<div className='playerPage'>
            <ToastContainer/>
			{playerDetails.length === 0 || !playerDetails.details.player ? (
				<div>
					<h3>Search Player Stats:</h3>
                    <p>Note: Some Rookies have not been added yet :(</p>
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
						<Table striped='columns'>
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
										<td class='season'>{playerDetails.stats[0].season}</td>
										<td class='gamesPlayed'>
											{playerDetails.stats[0].games_played}
										</td>
										<td>{playerDetails.stats[0].min}</td>
										<td>{playerDetails.stats[0].pts}</td>
										<td>{playerDetails.stats[0].reb}</td>
										<td>{playerDetails.stats[0].ast}</td>
										<td>{playerDetails.stats[0].stl}</td>
										<td>{playerDetails.stats[0].blk}</td>
										<td>{playerDetails.stats[0].turnover}</td>
									</tr>
								)}
							</tbody>
						</Table>
					</div>
					<div className='sortButtons'>
						<button onClick={() => setShowGamelog(false)}>
							Player Details
						</button>
						<button onClick={() => setShowGamelog(true)}>Player Gamelog</button>
					</div>
					{!showGamelog ? (
						<div className='description'>
							<p>{playerDetails.details.player[0].strDescriptionEN}</p>
						</div>
					) : playerDetails.gamelog.length > 0 ? (
						<div className='gamelog'>
							<Table className='gamelogTable'>
								<thead>
									<tr>
										<th>Date</th>
										<th>Minutes</th>
										<th>FG</th>
										<th>FT</th>
										<th>3PT</th>
										<th>Points</th>
										<th>Rebounds</th>
										<th>Assists</th>
										<th>Steals</th>
										<th>Blocks</th>
										<th>Turnovers</th>
									</tr>
								</thead>
								<tbody>
									{playerDetails.gamelog.map((game) => (
										<tr key={game.id}>
											{' '}
											{/* Add a unique key for each row */}
											<td>{game.game.date.slice(0, 10)}</td>
											<td>{game.min}</td>
											<td>{`${game.fgm}/${game.fga}`}</td>
											<td>{`${game.ftm}/${game.fta}`}</td>
											<td>{`${game.fg3m}/${game.fg3a}`}</td>
											<td>{game.pts}</td>
											<td>{game.reb}</td>
											<td>{game.ast}</td>
											<td>{game.stl}</td>
											<td>{game.blk}</td>
											<td>{game.turnover}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					) : (
						<h2>No Games Played Yet</h2>
					)}
				</div>
			)}
		</div>
	);
};

export default PlayerDetails;
