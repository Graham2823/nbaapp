import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import '../app/app.css';
import teams from '@/teams';
import { Image } from 'react-bootstrap';
import getTeamLogo from '@/utils/getLogo';
import { UserContext } from '@/context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

const BoxScore = () => {
	const [boxScore, setBoxScore] = useState(null);
	const router = useRouter();
	const { gameID, homeTeam, homeScore, awayTeam, awayScore, date } =
		router.query;
	const [teamLogosandColors, setTeamLogosAndColors] = useState([]);
	const {favoritePlayers} = useContext(UserContext)
	console.log("Home Team", homeTeam)
	console.log("away Team", awayTeam)

	useEffect(() => {
		if(date){
			axios
				.get(
					`https://nbaapp.vercel.app/api/getBoxScore?homeTeam=${homeTeam}&awayTeam=${awayTeam}&date=${date}`
				)
				.then((response) => {
					console.log(response)
					setBoxScore(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		}else{
			axios
				.get(
					`https://nbaapp.vercel.app/api/getBoxScore?homeTeam=${homeTeam}&awayTeam=${awayTeam}`
				)
				.then((response) => {
					setBoxScore(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});

		}
		const teamsLogos = teams.filter(
			(team) => team.teamName === homeTeam || team.teamName === awayTeam
		);
		setTeamLogosAndColors(teamsLogos);
	},[date, gameID, homeTeam, awayTeam]);
	console.log("boxscore", boxScore)
	return (
		<div className='boxScore'>
			{boxScore && (
				<h1 className='homeTeamName'>
					<a
						href={`/TeamDetails?teamName=${boxScore[0].home_team.full_name}`}>
						<Image
							src={getTeamLogo(boxScore[0].home_team.full_name)}
							alt='team logo'
							className='teamLogo'
						/>
						{boxScore[0].home_team.full_name}:{homeScore}
					</a>
				</h1>
			)}
			{boxScore && boxScore[0] && boxScore[0].home_team && (
				<div className='table-responsive'>
					<Table striped bordered className='boxScoreTable homeTeam'>
						<thead>
							<th>Player Name</th>
							<th>Minutes Played</th>
							<th>FG</th>
							<th>FT</th>
							<th>3PT</th>
							<th>Points</th>
							<th>Rebounds</th>
							<th>Assists</th>
							<th>Steals</th>
							<th>Blocks</th>
							<th>Fouls</th>
							<th>Turnovers</th>
						</thead>
						<tbody>
							{boxScore[0].home_team.players.map((player) => (
								<>
									{player.min > 0 && (
										<tr>
											<td>
												{player.player 
													?(
														<a
															href={`/PlayerDetails/?first=${player.player.first_name}&last=${player.player.last_name}`}>
															{player.player.first_name}{' '}
															{player.player.last_name} {favoritePlayers.some((players)=>players.playerName === `${player.player.first_name} ${player.player.last_name}`) &&
							<FontAwesomeIcon icon={faStar} style={{color:'yellow'}}/>
						}
														</a>
													):(
                                                        <p>Unknown Player</p>
                                                    )}
											</td>
											<td>{player.min}</td>
											<td>
												{player.fgm}/{player.fga}
											</td>
											<td>
												{player.ftm}/{player.fta}
											</td>
											<td>
												{player.fg3m}/{player.fg3a}
											</td>
											<td>{player.pts}</td>
											<td>{player.reb}</td>
											<td>{player.ast}</td>
											<td>{player.stl}</td>
											<td>{player.blk}</td>
											<td>{player.pf}</td>
											<td>{player.turnover}</td>
										</tr>
									)}
								</>
							))}
						</tbody>
					</Table>
				</div>
			)}
			{boxScore && boxScore[0] && boxScore[0].visitor_team && (
				<h1 className='awayTeamName'>
					<a
						href={`/TeamDetails?teamName=${boxScore[0].visitor_team.full_name}`}>
						<Image
							src={getTeamLogo(boxScore[0].visitor_team.full_name)}
							alt='team logo'
							className='teamLogo'
						/>
						{boxScore[0].visitor_team.full_name}:{awayScore}
					</a>
				</h1>
			)}
			{boxScore && boxScore[0] && boxScore[0].visitor_team && (
				<Table striped bordered className='boxScoreTable awayTeam'>
					<thead>
						<th>Player Name</th>
						<th>Minutes Played</th>
						<th>FG</th>
						<th>FT</th>
						<th>3PT</th>
						<th>Points</th>
						<th>Rebounds</th>
						<th>Assists</th>
						<th>Steals</th>
						<th>Blocks</th>
						<th>Fouls</th>
						<th>Turnovers</th>
					</thead>
					<tbody>
						{boxScore[0].visitor_team.players.map((player) => (
							<>
								{player.min > 0 && (
									<tr>
										<td>
												{player.player 
													?(
														<a
															href={`/PlayerDetails/?first=${player.player.first_name}&last=${player.player.last_name}`}>
															{player.player.first_name}{' '}
															{player.player.last_name} {favoritePlayers.some((players)=>players.playerName === `${player.player.first_name} ${player.player.last_name}`) &&
							<FontAwesomeIcon icon={faStar} style={{color:'yellow'}}/>
						}
														</a>
													):(
                                                        <p>Unknown Player</p>
                                                    )}
											</td>
										<td>{player.min}</td>
										<td>
											{player.fgm}/{player.fga}
										</td>
										<td>
											{player.ftm}/{player.fta}
										</td>
										<td>
											{player.fg3m}/{player.fg3a}
										</td>
										<td>{player.pts}</td>
										<td>{player.reb}</td>
										<td>{player.ast}</td>
										<td>{player.stl}</td>
										<td>{player.blk}</td>
										<td>{player.pf}</td>
										<td>{player.turnover}</td>
									</tr>
								)}
							</>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default BoxScore;
