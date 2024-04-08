import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '@/context/userContext';
import {Spinner} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

const PlayerDetails = () => {
	const router = useRouter();
	const { first, last, p1Name, p2Name } = router.query;
	const [playerDetails, setPlayerDetails] = useState([]);
	const [showGamelog, setShowGamelog] = useState(false);
	const [p1Data, setP1Data] = useState([]);
	const [p2Data, setP2Data] = useState([]);
	const [p1Stats, setP1Stats] = useState([]);
	const [p2Stats, setP2Stats] = useState([]);
	const { favoritePlayers, setFavoritePlayers, user } = useContext(UserContext);
	const [selectedSeason, setSelectedSeason] = useState(2023);

	useEffect(() => {
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
					router.push('/PlayerSearch?error=PlayerNotFound');
				});
		}

		if (p1Name && p2Name) {
			axios
				.get(
					`https://nbaapp.vercel.app/api/comparePlayers?p1Name=${p1Name}&p2Name=${p2Name}`
				)
				.then((response) => {
					if (response.data === 'Could not find one of the players') {
						toast.error(
							'Could Not find one of the players. Please check spelling, and try again'
						);
						router.push('/PlayerSearch?error=PlayersNotFound');
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

	const shotPercentage = (made, attempted) => {
		let percentage = (made / attempted) * 100;
		return `${percentage.toFixed(2)}%`;
	};

	const handleFavoritePlayer = async () => {
		try {
			const requestBody = {
				uid: user.uid,
				playerName: `${first} ${last}`,
			};

			const response = await axios.post(
				`https://nbaapp.vercel.app/api/addFavoritePlayer`,
				requestBody
			);

			setFavoritePlayers(response.data.user.favoritePlayers);
			localStorage.setItem(
				'favoritePlayers',
				JSON.stringify(response.data.user.favoritePlayers)
			);
			if (
				response.data.user.favoritePlayers.some(
					(player) =>
						player.playerName === playerDetails.playerData[0].first_name + playerDetails.playerData[0].last_name
				)
			) {
				toast.success('Player Added to Favorites!');
			} else {
				toast.success('Player Removed From Favorites!');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className='playerDetailsPage'>
			<ToastContainer />
			{playerDetails.playerData ? (
				<div className='playerDetails'>
					<div className='playerBio'>
						{playerDetails.details ? (
							<>
								<Image
									src={playerDetails.details.player[0].strThumb}
									className='playerPic'
									alt='player Picture'
								/>
								<div>
									<h3>
										{playerDetails.details.player[0].strPlayer}{' '}
										{favoritePlayers &&
										favoritePlayers.some(
											(player) => player.playerName === first + ' ' + last
										) ? (
											<FontAwesomeIcon
												icon={faStar}
												style={{ color: 'yellow', cursor:'pointer' }}
												onClick={() => handleFavoritePlayer()}
											/>
										) : (
											<FontAwesomeIcon
												icon={faStar}
												style={{ color: '#FFFFFF', cursor:'pointer' }}
												onClick={() => handleFavoritePlayer()}
											/>
										)}
									</h3>
									<h3>{playerDetails.details.player[0].strPosition}</h3>
									<h3>{playerDetails.details.player[0].strHeight}</h3>
									<h3>
										<a
											href={`/TeamDetails?teamName=${playerDetails.playerData[0].team.full_name}`}>
											{playerDetails.details.player[0].strTeam}
										</a>
									</h3>
								</div>
							</>
						) : (
							<>
								<h3>
									{playerDetails.playerData[0].first_name}{' '}
									{playerDetails.playerData[0].last_name}
								</h3>
								<h3>
									<a
										href={`/TeamDetails?teamName=${playerDetails.playerData[0].team.full_name}`}>
										{playerDetails.playerData[0].team.full_name}
									</a>
								</h3>
							</>
						)}
					</div>
					<div className='playerStats'>
						{playerDetails.playerAverages.length > 0 && 
						playerDetails.playerAverages.map((season, index) => (
							<Button
								onClick={() => setSelectedSeason(season[0].season)}
								key={index} className='searchButton button'>
								{season[0].season}
							</Button>
						))}
						<Table striped='columns'>
							<thead>
								<th>Season</th>
								<th>Games Played</th>
								<th>Minutes Per Game</th>
								<th>FG%</th>
								<th>3PT%</th>
								<th>FT%</th>
								<th>Points Per Game</th>
								<th>Rebounds Per Game</th>
								<th>Assists Per Game</th>
								<th>Steals Per Game</th>
								<th>Blocks Per Game</th>
								<th>Turnovers Per Game</th>
							</thead>
							<tbody>
								{playerDetails.playerAverages[0].length === 0 ? (
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
										<td>0</td>
										<td>0</td>
										<td>0</td>
									</tr>
								) : (
									
									playerDetails.playerAverages.map(
										(season) =>
											season[0].season === selectedSeason && (
												<tr key={season[0].season}>
													<td className='season'>{season[0].season}</td>
													<td className='gamesPlayed'>
														{season[0].games_played}
													</td>
													<td>{season[0].min}</td>
													<td>
														{season[0].fgm === 0
															? `0%`
															: shotPercentage(season[0].fgm, season[0].fga)}
													</td>
													<td>
														{season[0].fg3m === 0
															? `0%`
															: shotPercentage(season[0].fg3m, season[0].fg3a)}
													</td>
													<td>
														{season[0].ftm === 0
															? `0%`
															: shotPercentage(season[0].ftm, season[0].fta)}
													</td>
													<td>{season[0].pts}</td>
													<td>{season[0].reb}</td>
													<td>{season[0].ast}</td>
													<td>{season[0].stl}</td>
													<td>{season[0].blk}</td>
													<td>{season[0].turnover}</td>
												</tr>
											)
									)
								)}
							</tbody>
						</Table>
					</div>
					<div className='sortButtons'>
						<Button onClick={() => setShowGamelog(false)} className='button'>
							Player Details
						</Button>
						<Button onClick={() => setShowGamelog(true)} className='button'>2023 Gamelog</Button>
					</div>
					{!showGamelog ? (
						<div className='description'>
							{playerDetails.details ? (
								<p>{playerDetails.details.player[0].strDescriptionEN}</p>
							) : (
								<h3>No Player Details Available</h3>
							)}
						</div>
					) : playerDetails.playerGamelog.length > 0 ? (
						<div className='gamelog'>
							<Table className='gamelogTable' striped>
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
									{playerDetails.playerGamelog.reverse().map((game) => (
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
			) : p1Data.length > 0 && p2Data.length > 0 ? (
				<div>
					<Table className='comparePlayersTable'>
						<thead>
							<tr>
								<th>
									{p1Data[0].first_name} {p1Data[0].last_name} vs{' '}
									{p2Data[0].first_name} {p2Data[0].last_name}
								</th>
								<th>
									<p>
										<a
											href={`/PlayerDetails/?first=${p1Data[0].first_name}&last=${p1Data[0].last_name}`}>
											{p1Data[0].first_name} {p1Data[0].last_name}
										</a>
									</p>
									<p>{p1Data[0].position}</p>
									{p1Data[0].height ? (
										<p>
											Height: {p1Data[0].height}
										</p>
									) : (
										<p>Height Not Found</p>
									)}
									<p>
										<a
											href={`/TeamDetails?teamName=${p1Data[0].team.full_name}`}>
											{p1Data[0].team.full_name}
										</a>
									</p>
								</th>
								<th>
									<p>
										<a
											href={`/PlayerDetails/?first=${p2Data[0].first_name}&last=${p2Data[0].last_name}`}>
											{p2Data[0].first_name} {p2Data[0].last_name}
										</a>
									</p>
									<p>{p2Data[0].position}</p>
									{p2Data[0].height  ? (
										<p>
											Height: {p2Data[0].height}
										</p>
									) : (
										<p>Height Not Found</p>
									)}
									<p>
										<a
											href={`/TeamDetails?teamName=${p2Data[0].team.full_name}`}>
											{p2Data[0].team.full_name}
										</a>
									</p>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<strong>Games Played</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].games_played > p2Stats[0].games_played
												? 'green'
												: 'red',
									}}>
									{p1Stats[0].games_played}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].games_played > p1Stats[0].games_played
												? 'green'
												: 'red',
									}}>
									{p2Stats[0].games_played}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Minutes Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].min > p2Stats[0].min ? 'green' : 'red',
									}}>
									{p1Stats[0].min}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].min > p1Stats[0].min ? 'green' : 'red',
									}}>
									{p2Stats[0].min}
								</td>
							</tr>
							<tr>
								<td>
									<strong>FG%</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].fg_pct * 100 > p2Stats[0].fg_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p1Stats[0].fg_pct * 100).toFixed(2)} %
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].fg_pct * 100 > p1Stats[0].fg_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p2Stats[0].fg_pct * 100).toFixed(2)} %
								</td>
							</tr>
							<tr>
								<td>
									<strong>3PT%</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].fg3_pct * 100 > p2Stats[0].fg3_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p1Stats[0].fg3_pct * 100).toFixed(2)} %
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].fg3_pct * 100 > p1Stats[0].fg3_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p2Stats[0].fg3_pct * 100).toFixed(2)} %
								</td>
							</tr>
							<tr>
								<td>
									<strong>FT%</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].ft_pct * 100 > p2Stats[0].ft_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p1Stats[0].ft_pct * 100).toFixed(2)} %
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].ft_pct * 100 > p1Stats[0].ft_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p2Stats[0].ft_pct * 100).toFixed(2)} %
								</td>
							</tr>
							<tr>
								<td>
									<strong>Points Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].pts > p2Stats[0].pts ? 'green' : 'red',
									}}>
									{p1Stats[0].pts}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].pts > p1Stats[0].pts ? 'green' : 'red',
									}}>
									{p2Stats[0].pts}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Rebounds Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].reb > p2Stats[0].reb ? 'green' : 'red',
									}}>
									{p1Stats[0].reb}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].reb > p1Stats[0].reb ? 'green' : 'red',
									}}>
									{p2Stats[0].reb}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Assists Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].ast > p2Stats[0].ast ? 'green' : 'red',
									}}>
									{p1Stats[0].ast}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].ast > p1Stats[0].ast ? 'green' : 'red',
									}}>
									{p2Stats[0].ast}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Steals Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].stl > p2Stats[0].stl ? 'green' : 'red',
									}}>
									{p1Stats[0].stl}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].stl > p1Stats[0].stl ? 'green' : 'red',
									}}>
									{p2Stats[0].stl}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Blocks Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].blk > p2Stats[0].blk ? 'green' : 'red',
									}}>
									{p1Stats[0].blk}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].blk > p1Stats[0].blk ? 'green' : 'red',
									}}>
									{p2Stats[0].blk}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Turnovers Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].turnover < p2Stats[0].turnover
												? 'green'
												: 'red',
									}}>
									{p1Stats[0].turnover}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].turnover < p1Stats[0].turnover
												? 'green'
												: 'red',
									}}>
									{p2Stats[0].turnover}
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
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
