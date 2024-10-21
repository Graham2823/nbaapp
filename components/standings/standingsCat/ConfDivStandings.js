import React from 'react';
import { Table } from 'react-bootstrap';
import '../../../app/app.css';
import getTeamLogo from '@/utils/getLogo'
import {Image} from 'react-bootstrap';
import encodeTeamNameForURL from '@/utils/encodeTeamNameForURL';
import getNormalizedTeamName from '@/utils/getNormalizedTeamName';

const ConfDivStandings = ({ conference }) => {



	return (
		<div>
			<Table className='standingsTable' responsive='xl'>
				<thead>
					<tr>
						<th>Conference Rank</th>
						<th>Team</th>
						<th>Record</th>
						<th>Games Behind</th>
						<th>East</th>
						<th>West</th>
						<th>Atlantic</th>
						<th>Central</th>
						<th>SouthEast</th>
						<th>NorthWest</th>
						<th>Pacific</th>
						<th>SouthWest</th>
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
							<td>{team.vsEast}</td>
							<td>{team.vsWest}</td>
							<td>{team.vsAtlantic}</td>
							<td>{team.vsCentral}</td>
							<td>{team.vsSoutheast}</td>
							<td>{team.vsNorthwest}</td>
							<td>{team.vsPacific}</td>
							<td>{team.vsSouthwest}</td>
								</tr>
							</>
						))}
				</tbody>
			</Table>
		</div>
	);
};

export default ConfDivStandings;
