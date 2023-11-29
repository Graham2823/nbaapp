import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../app/app.css';
import { useRouter } from 'next/router';
import convertTo12HourFormat from '@/utils/convertTime';
import { Table } from 'react-bootstrap';

const TeamSearch = () => {
	const router = useRouter();
	const [teamDetails, setTeamDetails] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState('Atlanta Hawks');
	const [team1, setTeam1] = useState('Atlanta Hawks')
	const [team2, setTeam2] = useState('Atlanta Hawks')
	const { teamName } = router.query;

	const onsubmit = () => {
        router.push(`/TeamDetails?teamName=${selectedTeam}`)
	};

	const compareTeams = ()=>{
		router.push(`/TeamDetails?team1=${team1}&team2=${team2}`)
	}
	
	return (
		<div className='teamPage'>
			
				<div className='teamSearch'>
					<h2>
						<label>Search Team:</label>
					</h2>
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
				<div className='compareTeams'>
					<h2>Compare Teams:</h2>
				<div>
					<h3>
						<label>Team 1:</label>
					</h3>
					<select
						name='teamSelect'
						onChange={(e) => setTeam1(e.target.value)}>
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
				</div>
				<div>
					<h3>
						<label>Team 2:</label>
					</h3>
					<select
						name='teamSelect'
						onChange={(e) => setTeam2(e.target.value)}>
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
				</div>
					<button onClick={() => compareTeams()}>Compare Teams</button>

				</div>
		</div>
	);
};

export default TeamSearch;
