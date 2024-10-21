import React from 'react';
import { Table } from 'react-bootstrap';
import '../../../app/app.css';
import getTeamLogo from '@/utils/getLogo'
import {Image} from 'react-bootstrap';
import encodeTeamNameForURL from '@/utils/encodeTeamNameForURL';
import getNormalizedTeamName from '@/utils/getNormalizedTeamName';

const BasicStandings = ({ conference }) => {



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
						<th>Conference Record</th>
						<th>Division Record</th>
						<th>Home Record</th>
						<th>Away Record</th>
						<th>Last 10</th>
						<th>Overtime</th>
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
							<td>{team.conferenceRecord}</td>
							<td>{team.divisionRecord}</td>
							<td>{team.homeRecord}</td>
							<td>{team.awayRecord}</td>
							<td>{team.lastTen}</td>
							<td>{team.otRecord}</td>
								</tr>
							</>
						))}
				</tbody>
			</Table>
		</div>
	);
};

export default BasicStandings;
