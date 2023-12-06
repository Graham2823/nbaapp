import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../app/app.css';
import { useRouter } from 'next/router';
import convertTo12HourFormat from '@/utils/convertTime';
import { Table, Image } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import teams from '@/teams';

const TeamDetails = () => {
	const router = useRouter();
	const [teamDetails, setTeamDetails] = useState([]);
	const [teamLogoAndColors, setTeamLogoAndColors] = useState();
	const [team1Info, setTeam1Info] = useState([]);
	const [team2Info, setTeam2Info] = useState([]);
	const [teamCompareLogos, setTeamCompareLogos] = useState()
	const { teamName, team1, team2 } = router.query;
	console.log(teamLogoAndColors)

	useEffect(() => {
		if (teamName) {
			axios
				.get(`http://localhost:3000/api/getTeam?teamName=${teamName}`)
				.then((response) => {
					console.log(response.data);
					setTeamDetails(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
			const teamLogo = teams.filter((team)=> team.teamName === teamName)
			setTeamLogoAndColors(teamLogo)
		}
		if (team1 && team2) {
			axios
				.get(
					`https://nbaapp.vercel.app/api/compareTeams?team1=${team1}&team2=${team2}`
				)
				.then((response) => {
					setTeam1Info(response.data.team1_info)
					setTeam2Info(response.data.team2_info)
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
			const teamLogos = teams.filter((team)=> team.teamName === team1 || team.teamName === team2)
			setTeamCompareLogos(teamLogos)
		}
	}, [teamName, team1, team2]);

	const winPercentage = (wins, losses)=>{
		if(wins === 0 && losses === 0){
			return 0
		}
		const totalGames = wins + losses
		return wins/totalGames
	}

	return (
		<div className='teamPage'>
			<ToastContainer />
			{teamDetails.team_info ? (
				<div className='teamDetails' style={{backgroundColor : teamLogoAndColors[0].primaryColor}}>
					<h2><Image src={teamLogoAndColors[0].teamLogo} alt='team logo' className='teamLogo'/>{teamDetails.teamName}</h2>
					<Table className='teamDetailsTable' striped='columns' responsive='xl'>
						<thead>
							<th>Conference Rank</th>
							<th>Record</th>
							<th>Games Behind</th>
							<th>Points For</th>
							<th>Points Against</th>
							<th>Points Differential</th>
							<th>Streak</th>
							<th>Conference Record</th>
							<th>Division Record</th>
							<th>Home Record</th>
							<th>Away Record</th>
							<th>Last 10</th>
							<th>Vs below .500</th>
							<th>Vs above .500</th>
							<th>Games Decided by 3 Points</th>
							<th>Overtime</th>
							<th></th>
						</thead>
						<tbody>
							<tr class='teamInfoRow'>
								<td> {teamDetails.team_info[0].calc_rank.conf_rank} </td>
								<td> {teamDetails.team_info[0].wins}-{teamDetails.team_info[0].losses} </td>
								<td> {teamDetails.team_info[0].games_behind.conference} </td>
								<td> {teamDetails.team_info[0].points_for} </td>
								<td> {teamDetails.team_info[0].points_against} </td>
								<td> {teamDetails.team_info[0].point_diff} </td>
								<td>
									{teamDetails.team_info[0].streak.kind === 'loss'
										? 'Lost '
										: 'Won '}
									{teamDetails.team_info[0].streak.length}
								</td>
								<td>
									{' '}
									{teamDetails.team_info[0].records[3].wins}-
									{teamDetails.team_info[0].records[3].losses}{' '}
								</td>
								<td>
									{' '}
									{teamDetails.team_info[0].records[4].wins}-
									{teamDetails.team_info[0].records[4].losses}{' '}
								</td>
								<td>
									{' '}
									{teamDetails.team_info[0].records[8].wins}-
									{teamDetails.team_info[0].records[8].losses}{' '}
								</td>
								<td>
									{' '}
									{teamDetails.team_info[0].records[22].wins}-
									{teamDetails.team_info[0].records[22].losses}{' '}
								</td>
								<td>
									{' '}
									{teamDetails.team_info[0].records[9].wins}-
									{teamDetails.team_info[0].records[9].losses}{' '}
								</td>
								<td>
									{' '}
									{teamDetails.team_info[0].records[1].wins}-
									{teamDetails.team_info[0].records[1].losses}{' '}
								</td>
								<td>
									{' '}
									{teamDetails.team_info[0].records[20].wins}-
									{teamDetails.team_info[0].records[20].losses}{' '}
								</td>
								<td>
									{' '}
									{teamDetails.team_info[0].records[27].wins}-
									{teamDetails.team_info[0].records[27].losses}{' '}
								</td>
								<td>
									{' '}
									{teamDetails.team_info[0].records[19].wins}-
									{teamDetails.team_info[0].records[19].losses}
								</td>
							</tr>
						</tbody>
					</Table>
					<div className='teamSchedule' style={{backgroundColor:teamLogoAndColors[0].secondaryColor}}>
						{teamDetails.schedule.map((game, index) => (
							<div key={index} className='teamGame'>
								<h3>
									<a href={`/TeamDetails?teamName=${game.home_team.full_name}`}>
										{game.home_team.abbreviation}
									</a>
									{typeof game.home_team_score !== 'undefined' &&
										game.home_team_score > 0 && (
											<span>: {game.home_team_score}</span>
										)}
								</h3>
								<h3>VS</h3>
								<h3>
									<a
										href={`/TeamDetails?teamName=${game.visitor_team.full_name}`}>
										{game.visitor_team.abbreviation}
									</a>
									{typeof game.visitor_team_score !== 'undefined' &&
										game.visitor_team_score > 0 && (
											<span>: {game.visitor_team_score}</span>
										)}
								</h3>
								{game.status === 'Final' ? (
									<h3
										className={
											(game.home_team.full_name === teamDetails.teamName &&
												game.home_team_score > game.visitor_team_score) ||
											(game.visitor_team.full_name === teamDetails.teamName &&
												game.visitor_team_score > game.home_team_score)
												? 'won'
												: 'lost'
										}>
										{game.status}
									</h3>
								) : game.home_team_score > 0 || game.visitor_team_score > 0 ? (
									<h3 className='gameStatus'>{game.status}</h3>
								) : (
									<h3 className='gameStatus'>
										{convertTo12HourFormat(game.status, true)}
									</h3>
								)}
								{game.home_team_score > 0 && game.visitor_team_score > 0 && (
									<p>
										<a
											href={`/BoxScore?gameID=${game.id}&homeTeam=${
												game.home_team.full_name
											}&awayTeam=${game.visitor_team.full_name}&date=${
												game.date.split('T')[0]
											}`}>
											<button>View Box Score</button>
										</a>
									</p>
								)}
							</div>
						))}
					</div>
				</div>
			) : team1Info.length > 0 && team2Info.length >0 ? (
				<div>
					<h1 style={{ textAlign: 'center' }}>Teams</h1>
					<Table striped="rows" responsive="xl" className='compareTeamsTable'>
						<thead>
							<tr>
								<th></th>
								<th ><a href={`/TeamDetails?teamName=${team1}`}><Image src={teamCompareLogos[0].teamLogo} alt='team logo' className='teamLogo'/>{team1Info[0].name}</a></th>
								<th><a href={`/TeamDetails?teamName=${team2}`}><Image src={teamCompareLogos[1].teamLogo} alt='team logo' className='teamLogo'/>{team2Info[0].name}</a></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><strong>Conference Rank</strong></td>
								<td style={{backgroundColor:team1Info[0].calc_rank.conf_rank < team2Info[0].calc_rank.conf_rank ? 'green' : "red"}}>{team1Info[0].calc_rank.conf_rank}</td>
								<td style={{backgroundColor:team2Info[0].calc_rank.conf_rank < team1Info[0].calc_rank.conf_rank ? 'green' : "red"}}>{team2Info[0].calc_rank.conf_rank}</td>
							</tr>
							<tr>
								<td><strong>Record</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].wins , team1Info[0].losses) < winPercentage(team2Info[0].wins , team2Info[0].losses) ? 'red' : "green"}}>{team1Info[0].wins} - {team1Info[0].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].wins , team2Info[0].losses) < winPercentage(team1Info[0].wins , team1Info[0].losses) ? 'red' : "green"}}>{team2Info[0].wins} - {team2Info[0].losses}</td>
							</tr>
							<tr>
								<td><strong>Games Behind</strong></td>
								<td style={{backgroundColor:team1Info[0].games_behind.conference > team2Info[0].games_behind.conference ? 'red' : "green"}}>{team1Info[0].games_behind.conference}</td>
								<td style={{backgroundColor:team2Info[0].games_behind.conference > team1Info[0].games_behind.conference ? 'red' : "green"}}>{team2Info[0].games_behind.conference}</td>
							</tr>
							<tr>
								<td><strong>Points For</strong></td>
								<td style={{backgroundColor:team1Info[0].points_for < team2Info[0].points_for ? 'red' : "green"}}>{team1Info[0].points_for}</td>
								<td style={{backgroundColor:team2Info[0].points_for < team1Info[0].points_for ? 'red' : "green"}}>{team2Info[0].points_for}</td>
							</tr>
							<tr>
								<td><strong>Points Against</strong></td>
								<td style={{backgroundColor:team1Info[0].points_against > team2Info[0].points_against ? 'red' : "green"}}>{team1Info[0].points_against}</td>
								<td style={{backgroundColor:team2Info[0].points_against > team1Info[0].points_against ? 'red' : "green"}}>{team2Info[0].points_against}</td>
							</tr>
							<tr>
								<td><strong>Points Differential</strong></td>
								<td style={{backgroundColor:team1Info[0].point_diff < team2Info[0].point_diff ? 'red' : "green"}}>{team1Info[0].point_diff}</td>
								<td style={{backgroundColor:team2Info[0].point_diff < team1Info[0].point_diff ? 'red' : "green"}}>{team2Info[0].point_diff}</td>
							</tr>
							<tr>
								<td><strong>Streak</strong></td>
								<td style={{backgroundColor:team1Info[0].streak.kind === 'win' && team2Info[0].streak.kind === 'loss'? 'green':team1Info[0].streak.kind === 'loss' && team2Info[0].streak.kind === 'win'? 'red':team1Info[0].streak.kind === 'loss' && team2Info[0].streak.kind === 'loss' && team1Info[0].streak.length > team2Info[0].streak.length ? 'red' : team1Info[0].streak.kind === 'loss' && team2Info[0].streak.kind === 'loss' && team1Info[0].streak.length < team2Info[0].streak.length ? 'green' :team1Info[0].streak.kind === 'win' && team2Info[0].streak.kind === 'win' && team1Info[0].streak.length > team2Info[0].streak.length ? 'green' : team1Info[0].streak.kind === 'win' && team2Info[0].streak.kind === 'win' && team1Info[0].streak.length < team2Info[0].streak.length?'red': 'green' }}>
									{team1Info[0].streak.kind === 'loss'
										? 'Lost '
										: 'Won '}
									{team1Info[0].streak.length}
								</td>
								<td style={{backgroundColor:team2Info[0].streak.kind === 'win' && team1Info[0].streak.kind === 'loss'? 'green':team2Info[0].streak.kind === 'loss' && team1Info[0].streak.kind === 'win'? 'red':team2Info[0].streak.kind === 'loss' && team1Info[0].streak.kind === 'loss' && team2Info[0].streak.length > team1Info[0].streak.length ? 'red' : team2Info[0].streak.kind === 'loss' && team1Info[0].streak.kind === 'loss' && team2Info[0].streak.length < team1Info[0].streak.length ? 'green' :team2Info[0].streak.kind === 'win' && team1Info[0].streak.kind === 'win' && team2Info[0].streak.length > team1Info[0].streak.length ? 'green' : team2Info[0].streak.kind === 'win' && team1Info[0].streak.kind === 'win' && team2Info[0].streak.length < team1Info[0].streak.length?'red': 'green' }}>
									{team2Info[0].streak.kind === 'loss'
										? 'Lost '
										: 'Won '}
									{team2Info[0].streak.length}
								</td>
							</tr>
							<tr>
								<td><strong>Conference Record</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].records[3].wins , team1Info[0].records[3].losses) < winPercentage(team2Info[0].records[3].wins , team2Info[0].records[3].losses) ? 'red' : "green"}}>{team1Info[0].records[3].wins} - {team1Info[0].records[3].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].records[3].wins , team2Info[0].records[3].losses) < winPercentage(team1Info[0].records[3].wins , team1Info[0].records[3].losses) ? 'red' : "green"}}>{team2Info[0].records[3].wins} - {team2Info[0].records[3].losses}</td>
							</tr>
							<tr>
								<td><strong>Division Record</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].records[4].wins , team1Info[0].records[4].losses) < winPercentage(team2Info[0].records[4].wins , team2Info[0].records[4].losses) ? 'red' : "green"}}>{team1Info[0].records[4].wins} - {team1Info[0].records[4].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].records[4].wins , team2Info[0].records[4].losses) < winPercentage(team1Info[0].records[4].wins , team1Info[0].records[4].losses) ? 'red' : "green"}}>{team2Info[0].records[4].wins} - {team2Info[0].records[4].losses}</td>
							</tr>
							<tr>
								<td><strong>Home Record</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].records[8].wins , team1Info[0].records[8].losses) < winPercentage(team2Info[0].records[8].wins , team2Info[0].records[8].losses) ? 'red' : "green"}}>{team1Info[0].records[8].wins} - {team1Info[0].records[8].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].records[8].wins , team2Info[0].records[8].losses) < winPercentage(team1Info[0].records[8].wins , team1Info[0].records[8].losses) ? 'red' : "green"}}>{team2Info[0].records[8].wins} - {team2Info[0].records[8].losses}</td>
							</tr>
							<tr>
								<td><strong>Away Record</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].records[22].wins , team1Info[0].records[22].losses) < winPercentage(team2Info[0].records[22].wins , team2Info[0].records[22].losses) ? 'red' : "green"}}>{team1Info[0].records[22].wins} - {team1Info[0].records[22].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].records[22].wins , team2Info[0].records[22].losses) < winPercentage(team1Info[0].records[22].wins , team1Info[0].records[22].losses) ? 'red' : "green"}}>{team2Info[0].records[22].wins} - {team2Info[0].records[22].losses}</td>
							</tr>
							<tr>
								<td><strong>Last 10</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].records[9].wins , team1Info[0].records[9].losses) < winPercentage(team2Info[0].records[9].wins , team2Info[0].records[9].losses) ? 'red' : "green"}}>{team1Info[0].records[9].wins} - {team1Info[0].records[9].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].records[9].wins , team2Info[0].records[9].losses) < winPercentage(team1Info[0].records[9].wins , team1Info[0].records[9].losses) ? 'red' : "green"}}>{team2Info[0].records[9].wins} - {team2Info[0].records[9].losses}</td>
							</tr>
							<tr>
								<td><strong>Vs below .500</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].records[1].wins , team1Info[0].records[1].losses) < winPercentage(team2Info[0].records[1].wins , team2Info[0].records[1].losses) ? 'red' : "green"}}>{team1Info[0].records[1].wins} - {team1Info[0].records[1].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].records[1].wins , team2Info[0].records[1].losses) < winPercentage(team1Info[0].records[1].wins , team1Info[0].records[1].losses) ? 'red' : "green"}}>{team2Info[0].records[1].wins} - {team2Info[0].records[1].losses}</td>
							</tr>
							<tr>
								<td><strong>Vs above .500</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].records[20].wins , team1Info[0].records[20].losses) < winPercentage(team2Info[0].records[20].wins , team2Info[0].records[20].losses) ? 'red' : "green"}}>{team1Info[0].records[20].wins} - {team1Info[0].records[20].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].records[20].wins , team2Info[0].records[20].losses) < winPercentage(team1Info[0].records[20].wins , team1Info[0].records[20].losses) ? 'red' : "green"}}>{team2Info[0].records[20].wins} - {team2Info[0].records[20].losses}</td>
							</tr>
							<tr>
								<td><strong>Games Decided by 3 Points</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].records[27].wins , team1Info[0].records[27].losses) < winPercentage(team2Info[0].records[27].wins , team2Info[0].records[27].losses) ? 'red' : "green"}}>{team1Info[0].records[27].wins} - {team1Info[0].records[27].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].records[27].wins , team2Info[0].records[27].losses) < winPercentage(team1Info[0].records[27].wins , team1Info[0].records[27].losses) ? 'red' : "green"}}>{team2Info[0].records[27].wins} - {team2Info[0].records[27].losses}</td>
							</tr>
							<tr>
								<td><strong>Overtime</strong></td>
								<td style={{backgroundColor:winPercentage(team1Info[0].records[19].wins , team1Info[0].records[19].losses) < winPercentage(team2Info[0].records[19].wins , team2Info[0].records[19].losses) ? 'red' : "green"}}>{team1Info[0].records[19].wins} - {team1Info[0].records[19].losses}</td>
								<td style={{backgroundColor:winPercentage(team2Info[0].records[19].wins , team2Info[0].records[19].losses) < winPercentage(team1Info[0].records[19].wins , team1Info[0].records[19].losses) ? 'red' : "green"}}>{team2Info[0].records[19].wins} - {team2Info[0].records[19].losses}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			) : (
				<h1 style={{ textAlign: 'center' }}>Loading</h1>
			)}
		</div>
	);
};

export default TeamDetails;
