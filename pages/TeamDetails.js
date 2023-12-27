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
	const [teamCompareLogos, setTeamCompareLogos] = useState();
	const { teamName, team1, team2 } = router.query;

	useEffect(() => {
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
			const teamLogo = teams.filter((team) => team.teamName === teamName);
			setTeamLogoAndColors(teamLogo);
		}
		if (team1 && team2) {
			axios
				.get(
					`https://nbaapp.vercel.app/api/compareTeams?team1=${team1}&team2=${team2}`
				)
				.then((response) => {
					console.log('res', response.data);
					setTeam1Info(response.data.teamOne);
					setTeam2Info(response.data.teamTwo);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
			const teamLogos = teams.filter(
				(team) => team.teamName === team1 || team.teamName === team2
			);
			setTeamCompareLogos(teamLogos);
		}
	}, [teamName, team1, team2]);

	const winPercentageFromRecord = (record) => {
		const [wins, losses] = record.split('-').map(Number);
		console.log('wins', wins, 'losses', losses);

		if (wins === 0 && losses === 0) {
			return 0;
		}

		const totalGames = wins + losses;
		return wins / totalGames;
	};
	const getNormalizedTeamName = (teamName) => {
		// Replace various whitespace characters, including non-breaking space, with regular spaces
		return teamName.replace(/\s+/g, ' ');
	};

	const extractStreakNumber = (streak) => {
		// Find the index where the numeric part starts
		let startIndex = 0;
		while (startIndex < streak.length && isNaN(parseInt(streak[startIndex]))) {
			startIndex++;
		}

		// Find the index where the numeric part ends
		let endIndex = startIndex;
		while (endIndex < streak.length && !isNaN(parseInt(streak[endIndex]))) {
			endIndex++;
		}

		// Extract the numeric part and convert it to a number
		const numericPart = streak.substring(startIndex, endIndex);
		return numericPart ? parseInt(numericPart) : 0;
	};

	console.log('logos', teamCompareLogos);
	console.log('teams', team1Info);
	return (
		<div className='teamPage'>
			<ToastContainer />
			{teamDetails.team ? (
				<div
					className='teamDetails'
					style={{ backgroundColor: teamLogoAndColors[0].primaryColor }}>
					<h2>
						<Image
							src={teamLogoAndColors[0].teamLogo}
							alt='team logo'
							className='teamLogo'
						/>
						{teamDetails.teamName}
					</h2>
					<Table className='teamDetailsTable' striped='columns' responsive='xl'>
						<thead>
							<tr>
								<th>Confernece Rank</th>
								<th>Record</th>
								<th>Games Behind</th>
								<th>Streak</th>
								<th>Conference Record</th>
								<th>Division Record</th>
								<th>Home Record</th>
								<th>Away Record</th>
								<th>Last 10</th>
								<th>Overtime</th>
							</tr>
						</thead>
						<tbody>
							<tr class='teamInfoRow'>
								<td> {teamDetails.team[0].rank} </td>
								<td>
									{' '}
									{teamDetails.team[0].wins}-{teamDetails.team[0].losses}
								</td>
								<td> {teamDetails.team[0].gamesBehind} </td>
								<td> {teamDetails.team[0].streak} </td>
								<td>{teamDetails.team[0].conferenceRecord}</td>
								<td>{teamDetails.team[0].divisionRecord}</td>
								<td>{teamDetails.team[0].homeRecord}</td>
								<td>{teamDetails.team[0].awayRecord}</td>
								<td>{teamDetails.team[0].lastTen}</td>
								<td>{teamDetails.team[0].otRecord}</td>
							</tr>
						</tbody>
					</Table>
					<div
						className='teamSchedule'
						style={{ backgroundColor: teamLogoAndColors[0].secondaryColor }}>
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
								{game.home_team_score > 0 && game.visitor_team_score > 0 ? (
									<p>
										<a
											href={`/BoxScore?gameID=${game.id}&homeTeam=${
												game.home_team.full_name
											}&homeScore=${game.home_team_score}&awayTeam=${
												game.visitor_team.full_name
											}&awayScore=${game.visitor_team_score}&date=${
												game.date.split('T')[0]
											}`}>
											<button>View Box Score</button>
										</a>
									</p>
								) : (
									<div>
										<a
											href={`/TeamDetails?team1=${game.home_team.full_name}&team2=${game.visitor_team.full_name}`}>
											<button className='compareButton'>Compare Teams</button>
										</a>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			) : team1Info.length > 0 && team2Info.length > 0 ? (
				<div>
					<h1 style={{ textAlign: 'center' }}>Teams</h1>
					<Table striped='rows' responsive='xl' className='compareTeamsTable'>
						<thead>
							<tr>
								<th></th>
								<th>
									<a href={`/TeamDetails?teamName=${team1}`}>
										<Image
											src={
												teamCompareLogos[0].teamName ===
												getNormalizedTeamName(team1Info[0].team)
													? teamCompareLogos[0].teamLogo
													: teamCompareLogos[1].teamLogo
											}
											alt='team logo'
											className='teamLogo'
										/>
										{team1Info[0].name}
									</a>
								</th>
								<th>
									<a href={`/TeamDetails?teamName=${team2}`}>
										<Image
											src={
												teamCompareLogos[1].teamName ===
												getNormalizedTeamName(team2Info[0].team)
													? teamCompareLogos[1].teamLogo
													: teamCompareLogos[0].teamLogo
											}
											alt='team logo'
											className='teamLogo'
										/>
										{team2Info[0].name}
									</a>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<strong>Conference Rank</strong>
								</td>
								<td
									style={{
										backgroundColor:
											parseInt(team1Info[0].rank) < parseInt(team2Info[0].rank)
												? 'green'
												: 'red',
									}}>
									{team1Info[0].rank}
								</td>
								<td
									style={{
										backgroundColor:
											parseInt(team2Info[0].rank) < parseInt(team1Info[0].rank)
												? 'green'
												: 'red',
									}}>
									{team2Info[0].rank}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Record</strong>
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(
												`${team1Info[0].wins}-${team1Info[0].losses}`
											) <
											winPercentageFromRecord(
												`${team2Info[0].wins}-${team2Info[0].losses}`
											)
												? 'red'
												: 'green',
									}}>
									{team1Info[0].wins} - {team1Info[0].losses}
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(
												`${team2Info[0].wins}-${team2Info[0].losses}`
											) <
											winPercentageFromRecord(
												`${team1Info[0].wins}-${team1Info[0].losses}`
											)
												? 'red'
												: 'green',
									}}>
									{team2Info[0].wins} - {team2Info[0].losses}
								</td>
							</tr>

							<tr>
								<td>
									<strong>Games Behind</strong>
								</td>
								<td
									style={{
										backgroundColor:
											team1Info[0].gamesBehind > team2Info[0].gamesBehind
												? 'red'
												: 'green',
									}}>
									{team1Info[0].gamesBehind}
								</td>
								<td
									style={{
										backgroundColor:
											team2Info[0].gamesBehind > team1Info[0].gamesBehind
												? 'red'
												: 'green',
									}}>
									{team2Info[0].gamesBehind}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Streak</strong>
								</td>
								<td
									// style={{
									// 	backgroundColor:
									// 		Math.abs(extractStreakNumber(team1Info[0].streak)) <
									// 		Math.abs(extractStreakNumber(team2Info[0].streak))
									// 			? 'red'
									// 			: 'green',
									// }}
									>
									{team1Info[0].streak}
								</td>
								<td
									// style={{
									// 	backgroundColor:
									// 		Math.abs(extractStreakNumber(team2Info[0].streak)) <
									// 		Math.abs(extractStreakNumber(team1Info[0].streak))
									// 			? 'red'
									// 			: 'green',
									// }}
									>
									{team2Info[0].streak}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Conference Record</strong>
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team1Info[0].conferenceRecord) <
											winPercentageFromRecord(team2Info[0].conferenceRecord)
												? 'red'
												: 'green',
									}}>
									{team1Info[0].conferenceRecord}
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team2Info[0].conferenceRecord) <
											winPercentageFromRecord(team1Info[0].conferenceRecord)
												? 'red'
												: 'green',
									}}>
									{team2Info[0].conferenceRecord}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Division Record</strong>
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team1Info[0].divisionRecord) <
											winPercentageFromRecord(team2Info[0].divisionRecord)
												? 'red'
												: 'green',
									}}>
									{team1Info[0].divisionRecord}
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team2Info[0].divisionRecord) <
											winPercentageFromRecord(team1Info[0].divisionRecord)
												? 'red'
												: 'green',
									}}>
									{team2Info[0].divisionRecord}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Home Record</strong>
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team1Info[0].homeRecord) <
											winPercentageFromRecord(team2Info[0].homeRecord)
												? 'red'
												: 'green',
									}}>
									{team1Info[0].homeRecord}
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team2Info[0].homeRecord) <
											winPercentageFromRecord(team1Info[0].homeRecord)
												? 'red'
												: 'green',
									}}>
									{team2Info[0].homeRecord}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Away Record</strong>
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team1Info[0].awayRecord) <
											winPercentageFromRecord(team2Info[0].awayRecord)
												? 'red'
												: 'green',
									}}>
									{team1Info[0].awayRecord}
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team2Info[0].awayRecord) <
											winPercentageFromRecord(team1Info[0].awayRecord)
												? 'red'
												: 'green',
									}}>
									{team2Info[0].awayRecord}
								</td>
							</tr>
							<tr>
								<td>
									<strong>last 10</strong>
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team1Info[0].lastTen) <
											winPercentageFromRecord(team2Info[0].lastTen)
												? 'red'
												: 'green',
									}}>
									{team1Info[0].lastTen}
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team2Info[0].lastTen) <
											winPercentageFromRecord(team1Info[0].lastTen)
												? 'red'
												: 'green',
									}}>
									{team2Info[0].lastTen}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Overtime</strong>
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team1Info[0].otRecord) <
											winPercentageFromRecord(team2Info[0].otRecord)
												? 'red'
												: 'green',
									}}>
									{team1Info[0].otRecord}
								</td>
								<td
									style={{
										backgroundColor:
											winPercentageFromRecord(team2Info[0].otRecord) <
											winPercentageFromRecord(team1Info[0].otRecord)
												? 'red'
												: 'green',
									}}>
									{team2Info[0].otRecord}
								</td>
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
