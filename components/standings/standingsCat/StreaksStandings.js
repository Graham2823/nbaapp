import React from 'react';
import { Table } from 'react-bootstrap';
import '../../../app/app.css';
import getTeamLogo from '@/utils/getLogo'
import {Image} from 'react-bootstrap';
import encodeTeamNameForURL from '@/utils/encodeTeamNameForURL';
import getNormalizedTeamName from '@/utils/getNormalizedTeamName';

const StreaksStandings = ({ conference }) => {

console.log(conference)

	return (
		<div>
			<Table className='standingsTable' responsive='xl'>
				<thead>
					<tr>
						<th>Conference Rank</th>
						<th>Team</th>
						<th>Record</th>
						<th>Games Behind</th>
						<th>Streak</th>
						<th>Last 10</th>
						<th>Last 10 Home</th>
						<th>Last 10 Away</th>
					</tr>
				</thead>
				<tbody>
					{conference &&
						conference.teams.map((team, index) => (
							<>
								<tr className={index <6 ? 'playoffTeam' : index< 10 ? 'playinTeam' : 'lotteryTeam'}> 
							<td>{index + 1}</td>
							<td><a
											href={`/team/TeamDetails?teamName=${encodeTeamNameForURL(team.team.replace(/[\s-]*ps$/i, ''))}`}>
												<Image src={getTeamLogo(getNormalizedTeamName(team.team))} alt='team logo' className='teamLogoStandings'/>
											{team.team.replace(/[\s-]*ps$/i, '')}
										</a></td>
							<td>{team.wins}-{team.losses}</td>
							<td>{team.gamesBehind}</td>
							<td>{team.streak}</td>
							<td>{team.lastTen}</td>
							<td>{team.l10Home}</td>
							<td>{team.l10Away}</td>
								</tr>
							</>
						))}
				</tbody>
			</Table>
		</div>
	);
};

export default StreaksStandings;
