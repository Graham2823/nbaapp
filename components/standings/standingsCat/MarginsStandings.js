import React from 'react';
import { Table } from 'react-bootstrap';
import '../../../app/app.css';
import getTeamLogo from '@/utils/getLogo'
import {Image} from 'react-bootstrap';
import encodeTeamNameForURL from '@/utils/encodeTeamNameForURL';
import getNormalizedTeamName from '@/utils/getNormalizedTeamName';

const MarginsStandings = ({ conference }) => {



	return (
		<div>
			<Table className='standingsTable' responsive='xl'>
				<thead>
					<tr>
						<th>Conference Rank</th>
						<th>Team</th>
						<th>Record</th>
						<th>Games Behind</th>
						<th>3pt or less games</th>
						<th>10+pt games</th>
						<th>Score 100+</th>
						<th>Opp Scores 100+</th>
						<th>Opponents Over .500</th>
						<th>Lead Rebounds</th>
						<th>Fewer Turnovers</th>
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
							<td>{team.threePtGames}</td>
							<td>{team.tenPtGames}</td>
							<td>{team.score100}</td>
							<td>{team.oppScore100}</td>
							<td>{team.oppOver500}</td>
							<td>{team.leadReb}</td>
							<td>{team.fewTurn}</td>
								</tr>
							</>
						))}
				</tbody>
			</Table>
		</div>
	);
};

export default MarginsStandings;
