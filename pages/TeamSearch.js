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
	const { teamName } = router.query;

	const onsubmit = () => {
        router.push(`/TeamDetails?teamName=${selectedTeam}`)
	};
	
	return (
		<div className='teamPage'>
			
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
		</div>
	);
};

export default TeamSearch;
