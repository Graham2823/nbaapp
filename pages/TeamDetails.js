import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../app/app.css';
import { useRouter } from 'next/router';
import convertTo12HourFormat from '@/utils/convertTime';
import { Table } from 'react-bootstrap';

const TeamDetails = () => {
	const router = useRouter();
	const [teamDetails, setTeamDetails] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState('Atlanta Hawks');
	const { teamName } = router.query;

	const onsubmit = () => {
		const team = selectedTeam.split(' ');
		axios
			.get(`https://nbaapp.vercel.app/api/getTeam?teamName=${selectedTeam}`)
			.then((response) => {
				console.log(response.data);
				setTeamDetails(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// This code will only run on the client-side
			setTeamDetails([]);
		}
		if (teamName) {
			axios
				.get(`https://nbaapp.vercel.app/api/getTeam?teamName=${teamName}`)
				.then((response) => {
					console.log(response.data);
					setTeamDetails(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		}
	}, [teamName]);

	console.log(selectedTeam);
	return (
		<div className='teamPage'>
			{teamDetails.length === 0 ? (
				<div className='teamSearch'>
					<h3>
						<label>Search Team:</label>
					</h3>
					<select
						name='teamSelect'
						onChange={(e) => setSelectedTeam(e.target.value)}>
						<option>Atlanta Hawks</option>
						<option>Boston Celtics</option>
						<option>Brooklyn Nets</option>
						<option>Charlotte Hornets</option>
						<option>Chicago Bulls</option>
						<option>Cleveland Cavaliers</option>
						<option>Dallas Mavericks</option>
						<option>Denver Nuggets</option>
						<option>Detroit Pistons</option>
						<option>Golden State Warriors</option>
						<option>Houston Rockets</option>
						<option>Indiana Pacers</option>
						<option>LA Clippers</option>
						<option>Los Angeles Lakers</option>
						<option>Memphis Grizzlies</option>
						<option>Miami Heat</option>
						<option>Milwaukee Bucks</option>
						<option>Minnesota Timberwolves</option>
						<option>New Orleans Pelicans</option>
						<option>New York Knicks</option>
						<option>Oklahoma City Thunder</option>
						<option>Orlando Magic</option>
						<option>Philadelphia 76ers</option>
						<option>Phoenix Suns</option>
						<option>Portland Trail Blazers</option>
						<option>Sacramento Kings</option>
						<option>San Antonio Spurs</option>
						<option>Toronto Raptors</option>
						<option>Utah Jazz</option>
						<option>Washington Wizards</option>
					</select>
					<button onClick={() => onsubmit()}>Search</button>
				</div>
			) : (
				<div className='teamDetails'>
					<h2>{teamDetails.teamName}</h2>
					<Table className='teamDetailsTable' striped='columns' responsive='xl'>
						<thead>
							<th>Conference Rank</th>
							<th>Wins</th>
							<th>Losses</th>
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
                        <tr class="teamInfoRow">
            <td> {teamDetails.team_info[0].calc_rank.conf_rank} </td>
            <td> {teamDetails.team_info[0].wins} </td>
            <td> {teamDetails.team_info[0].losses} </td>
            <td> {teamDetails.team_info[0].games_behind.conference} </td>
            <td> {teamDetails.team_info[0].points_for} </td>
            <td> {teamDetails.team_info[0].points_against} </td>
            <td> {teamDetails.team_info[0].point_diff} </td>
            <td>
				{teamDetails.team_info[0].streak.kind === 'loss' ? 'Lost ' : 'Won '}{teamDetails.team_info[0].streak.length}
			</td>
            <td> {teamDetails.team_info[0].records[3].wins}-{teamDetails.team_info[0].records[3].losses} </td>
            <td> {teamDetails.team_info[0].records[4].wins}-{teamDetails.team_info[0].records[4].losses} </td>
            <td> {teamDetails.team_info[0].records[8].wins}-{teamDetails.team_info[0].records[8].losses} </td>
            <td> {teamDetails.team_info[0].records[22].wins}-{teamDetails.team_info[0].records[22].losses} </td>
            <td> {teamDetails.team_info[0].records[9].wins}-{teamDetails.team_info[0].records[9].losses} </td>
            <td> {teamDetails.team_info[0].records[1].wins}-{teamDetails.team_info[0].records[1].losses} </td>
            <td> {teamDetails.team_info[0].records[20].wins}-{teamDetails.team_info[0].records[20].losses} </td>
            <td> {teamDetails.team_info[0].records[27].wins }-{teamDetails.team_info[0].records[27].losses} </td>
            <td> {teamDetails.team_info[0].records[19].wins}-{teamDetails.team_info[0].records[19].losses}</td>
        </tr>
                        </tbody>
					</Table>
					<h2>Team Schedule:</h2>
					<div className='teamSchedule'>
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
			)}
		</div>
	);
};

export default TeamDetails;
