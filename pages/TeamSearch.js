import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../app/app.css';
import { useRouter } from 'next/router';
import convertTo12HourFormat from '@/utils/convertTime';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const teams = [
	'Atlanta Hawks',
	'Boston Celtics',
	'Brooklyn Nets',
	'Charlotte Hornets',
	'Chicago Bulls',
	'Cleveland Cavaliers',
	'Dallas Mavericks',
	'Denver Nuggets',
	'Detroit Pistons',
	'Golden State Warriors',
	'Houston Rockets',
	'Indiana Pacers',
	'LA Clippers',
	'Los Angeles Lakers',
	'Memphis Grizzlies',
	'Miami Heat',
	'Milwaukee Bucks',
	'Minnesota Timberwolve',
	'New Orleans Pelicans',
	'New York Knicks',
	'Oklahoma City Thunder',
	'Orlando Magic',
	'Philadelphia 76er',
	'Phoenix Suns',
	'Portland Trail Blazers',
	'Sacramento Kings',
	'San Antonio Spurs',
	'Toronto Raptors',
	'Utah Jazz',
	'Washington Wizards',
];

const TeamSearch = () => {
	const router = useRouter();
	const [teamDetails, setTeamDetails] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState('Atlanta Hawks');
	const [team1, setTeam1] = useState('Atlanta Hawks');
	const [team2, setTeam2] = useState('Atlanta Hawks');
	const { teamName } = router.query;

	const onsubmit = () => {
		router.push(`/TeamDetails?teamName=${selectedTeam}`);
	};

	const compareTeams = () => {
		router.push(`/TeamDetails?team1=${team1}&team2=${team2}`);
	};

	return (
		<div className='teamPage'>
			<div className='teamSearch'>
				<h2>
					<label>Search Team:</label>
				</h2>
				<select
					name='teamSelect'
					onChange={(e) => setSelectedTeam(e.target.value)}>
					{teams.map((team)=>(
						<option key={team}>{team}</option>
					))}
				</select>
				<Button onClick={() => onsubmit()} className='button searchButton'>
					Search
				</Button>
			</div>
			<div className='compareTeams'>
				<h2>Compare Teams:</h2>
				<div>
					<h3>
						<label>Team 1:</label>
					</h3>
					<select name='teamSelect' onChange={(e) => setTeam1(e.target.value)}>
					{teams.map((team)=>(
						<option key={team}>{team}</option>
					))}
					</select>
				</div>
				<div>
					<h3>
						<label>Team 2:</label>
					</h3>
					<select name='teamSelect' onChange={(e) => setTeam2(e.target.value)}>
					{teams.map((team)=>(
						<option key={team}>{team}</option>
					))}
					</select>
				</div>
				<Button onClick={() => compareTeams()} className='button searchButton'>
					Compare Teams
				</Button>
			</div>
		</div>
	);
};

export default TeamSearch;
