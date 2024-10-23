import React, {useState} from 'react';
import '../../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from 'react-bootstrap';

const RenderStatsComparison = ({p1Data, p1CareerAverages, p2Data, p2CareerAverages}) => {
  return (
    <div>
        <Table className='comparePlayersTable'>
						<thead>
							<tr>
								<th>
									{p1Data[0].first_name} {p1Data[0].last_name} vs{' '}
									{p2Data[0].first_name} {p2Data[0].last_name}
								</th>
								<th>
									<p>
										<a
											href={`/player/PlayerDetails/?first=${p1Data[0].first_name}&last=${p1Data[0].last_name}`}>
											{p1Data[0].first_name} {p1Data[0].last_name}
										</a>
									</p>
									<p>{p1Data[0].position}</p>
									{p1Data[0].height ? (
										<p>
											Height: {p1Data[0].height}
										</p>
									) : (
										<p>Height Not Found</p>
									)}
									<p>
										<a
											href={`/team/TeamDetails?teamName=${p1Data[0].team.full_name}`}>
											{p1Data[0].team.full_name}
										</a>
									</p>
								</th>
								<th>
									<p>
										<a
											href={`/player/PlayerDetails/?first=${p2Data[0].first_name}&last=${p2Data[0].last_name}`}>
											{p2Data[0].first_name} {p2Data[0].last_name}
										</a>
									</p>
									<p>{p2Data[0].position}</p>
									{p2Data[0].height  ? (
										<p>
											Height: {p2Data[0].height}
										</p>
									) : (
										<p>Height Not Found</p>
									)}
									<p>
										<a
											href={`/team/TeamDetails?teamName=${p2Data[0].team.full_name}`}>
											{p2Data[0].team.full_name}
										</a>
									</p>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<strong>Games Played</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.games_played > p2CareerAverages.games_played
												? 'green'
												: 'red',
									}}>
									{p1CareerAverages.games_played}
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.games_played > p1CareerAverages.games_played
												? 'green'
												: 'red',
									}}>
									{p2CareerAverages.games_played}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Minutes Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.min > p2CareerAverages.min ? 'green' : 'red',
									}}>
									{p1CareerAverages.min}
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.min > p1CareerAverages.min ? 'green' : 'red',
									}}>
									{p2CareerAverages.min}
								</td>
							</tr>
							<tr>
								<td>
									<strong>FG%</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.fg_pct * 100 > p2CareerAverages.fg_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p1CareerAverages.fg_pct * 100).toFixed(2)} %
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.fg_pct * 100 > p1CareerAverages.fg_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p2CareerAverages.fg_pct * 100).toFixed(2)} %
								</td>
							</tr>
							<tr>
								<td>
									<strong>3PT%</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.fg3_pct * 100 > p2CareerAverages.fg3_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p1CareerAverages.fg3_pct * 100).toFixed(2)} %
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.fg3_pct * 100 > p1CareerAverages.fg3_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p2CareerAverages.fg3_pct * 100).toFixed(2)} %
								</td>
							</tr>
							<tr>
								<td>
									<strong>FT%</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.ft_pct * 100 > p2CareerAverages.ft_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p1CareerAverages.ft_pct * 100).toFixed(2)} %
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.ft_pct * 100 > p1CareerAverages.ft_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p2CareerAverages.ft_pct * 100).toFixed(2)} %
								</td>
							</tr>
							<tr>
								<td>
									<strong>Points Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.pts > p2CareerAverages.pts ? 'green' : 'red',
									}}>
									{p1CareerAverages.pts}
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.pts > p1CareerAverages.pts ? 'green' : 'red',
									}}>
									{p2CareerAverages.pts}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Rebounds Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.reb > p2CareerAverages.reb ? 'green' : 'red',
									}}>
									{p1CareerAverages.reb}
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.reb > p1CareerAverages.reb ? 'green' : 'red',
									}}>
									{p2CareerAverages.reb}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Assists Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.ast > p2CareerAverages.ast ? 'green' : 'red',
									}}>
									{p1CareerAverages.ast}
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.ast > p1CareerAverages.ast ? 'green' : 'red',
									}}>
									{p2CareerAverages.ast}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Steals Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.stl > p2CareerAverages.stl ? 'green' : 'red',
									}}>
									{p1CareerAverages.stl}
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.stl > p1CareerAverages.stl ? 'green' : 'red',
									}}>
									{p2CareerAverages.stl}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Blocks Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.blk > p2CareerAverages.blk ? 'green' : 'red',
									}}>
									{p1CareerAverages.blk}
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.blk > p1CareerAverages.blk ? 'green' : 'red',
									}}>
									{p2CareerAverages.blk}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Turnovers Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1CareerAverages.turnover < p2CareerAverages.turnover
												? 'green'
												: 'red',
									}}>
									{p1CareerAverages.turnover}
								</td>
								<td
									style={{
										backgroundColor:
											p2CareerAverages.turnover < p1CareerAverages.turnover
												? 'green'
												: 'red',
									}}>
									{p2CareerAverages.turnover}
								</td>
							</tr>
						</tbody>
					</Table>
    </div>
  )
}

export default RenderStatsComparison