import React from 'react';
import { Table } from 'react-bootstrap';
import '../app/app.css';

const StandingsCard = ({ conference }) => {
	return (
		<div>
			<Table className='standingsTable' responsive='xl'>
				<thead>
					<tr>
						<th>Confernece Rank</th>
						<th>Team</th>
						<th>Wins</th>
						<th>Losses</th>
						<th>Games Behind</th>
						<th>Points For</th>
						<th>Points Against</th>
						<th>Point Differential</th>
						<th>Streak</th>
						<th>Conference Record</th>
						<th>Division Record</th>
						<th>Home Record</th>
						<th>Away Record</th>
						<th>Last 10</th>
					</tr>
				</thead>
				<tbody>
					{conference &&
						conference.map((team, index) => (
							<>
								<tr>
									<td>{index + 1}</td>
									<td>
										<a
											href={`/TeamDetails?teamName=${team.market}%20${team.name}`}>
											{team.market} {team.name}
										</a>
									</td>
									<td>{team.wins}</td>
									<td>{team.losses}</td>
									<td>{team.games_behind.conference}</td>
									<td>{team.points_for}</td>
									<td>{team.points_against}</td>
									<td>{team.point_diff}</td>
									<td>
										{team.streak.kind === 'loss' ? 'Lost' : 'Won'}{' '}
										{team.streak.length}
									</td>
									<td>
										{team.records[3].wins}-{team.records[3].losses}
									</td>
									<td>
										{team.records[4].wins}-{team.records[4].losses}
									</td>
									<td>
										{team.records[8].wins}-{team.records[8].losses}
									</td>
									<td>
										{team.records[22].wins}-{team.records[22].losses}
									</td>
									<td>
										{team.records[9].wins}-{team.records[9].losses}
									</td>
								</tr>
							</>
						))}
				</tbody>
			</Table>
		</div>
	);
};

export default StandingsCard;
