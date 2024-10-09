import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '@/context/userContext';
import { Button } from 'react-bootstrap';
import RenderPlayerPointsChart from '../charts/RenderPlayerStatsChart';
import DisplayCharts from '../charts/DisplayCharts';

const RenderPlayerDetails = ({ playerDetails, first, last }) => {
	const { favoritePlayers, setFavoritePlayers, user } = useContext(UserContext);
	const [selectedSeason, setSelectedSeason] = useState(2023);
	const [showGamelog, setShowGamelog] = useState(false);
	const [showGraphs, setShowGraphs] = useState(false);

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
				`https://nbaapp.vercel.app/api/favorites/addFavoritePlayer`,
				requestBody
			);

			setFavoritePlayers(response.data.user.favoritePlayers);
			localStorage.setItem(
				'favoritePlayers',
				JSON.stringify(response.data.user.favoritePlayers)
			);
			if (
				response.data.user.favoritePlayers.some(
					(player) => player.playerName === first + ' ' + last
				)
			) {
				toast.success('Player Added to Favorites!');
			} else {
				toast.success('Player Removed from Favorites!');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<div className='playerDetails'>
				<ToastContainer />
				<div className='playerBio'>
					{playerDetails.details.player !== null &&
					playerDetails.details.player[0].strThumb ? (
						<>
							<Image
								src={playerDetails.details.player[0].strThumb}
								className='playerPic'
								alt='player Picture'
							/>
							<div>
								<h3>
									{playerDetails.details.player[0].strPlayer}{' '}
									{user !== null &&
									favoritePlayers &&
									favoritePlayers.some(
										(player) => player.playerName === first + ' ' + last
									) ? (
										<FontAwesomeIcon
											icon={faStar}
											style={{ color: 'yellow', cursor: 'pointer' }}
											onClick={() => handleFavoritePlayer()}
										/>
									) : (
										user !== null && (
											<FontAwesomeIcon
												icon={faStar}
												style={{ color: '#FFFFFF', cursor: 'pointer' }}
												onClick={() => handleFavoritePlayer()}
											/>
										)
									)}
								</h3>
								<h3>{playerDetails.details.player[0].strPosition}</h3>
								<h3>{playerDetails.details.player[0].strHeight}</h3>
								<h3>
									<a
										href={`/team/TeamDetails?teamName=${playerDetails.playerData[0].team.full_name}`}>
										{playerDetails.playerData[0].team.full_name}
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
									href={`/team/TeamDetails?teamName=${playerDetails.playerData[0].team.full_name}`}>
									{playerDetails.playerData[0].team.full_name}
								</a>
							</h3>
						</>
					)}
				</div>
				<div className='playerStats'>
					<div>
						<h6>Select Season</h6>
						<select onChange={(e) => setSelectedSeason(Number(e.target.value))}>
							{playerDetails.playerAverages &&
								playerDetails.playerAverages.length > 0 &&
								playerDetails.playerAverages.map((season, index) => (
									<option
										key={index}
										className='searchButton button'
										value={season[0].season}>
										{season[0].season}
									</option>
								))}
						</select>
					</div>
					<Table striped='columns' responsive='xl'>
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
							{playerDetails.playerAverages.length > 0 &&
							playerDetails.playerAverages[0].length === 0 ? (
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
								playerDetails.playerAverages &&
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
					<Button
						onClick={() => {
							setShowGamelog(false), setShowGraphs(false);
						}}
						className='button'>
						Player Details
					</Button>
					<Button
						onClick={() => {
							setShowGamelog(true), setShowGraphs(false);
						}}
						className='button'>
						2024 Gamelog
					</Button>
					<Button
						onClick={() => {
							setShowGraphs(true), setShowGamelog(false);
						}}
						className='button'>
						Show Graphs
					</Button>
				</div>
				{showGamelog ? (
					playerDetails.playerGamelog &&
					playerDetails.playerGamelog.length > 0 ? (
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
					)
				) : playerDetails.playerAverages && showGraphs ? (
					<DisplayCharts playerDetails={playerDetails.playerAverages} />
				) : (
					<div className='description'>
						{playerDetails.details.player ? (
							<p>{playerDetails.details.player[0].strDescriptionEN}</p>
						) : (
							<h3>No Player Details Available</h3>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default RenderPlayerDetails;
