import React from 'react';
import '../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from 'react-bootstrap';
const RenderComparePlayers = ({p1Data, p1Stats, p2Data, p2Stats}) => {
    console.log("p1Data", p1Data)
  return (
    <div>
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
											href={`/PlayerDetails/?first=${p1Data[0].first_name}&last=${p1Data[0].last_name}`}>
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
											href={`/TeamDetails?teamName=${p1Data[0].team.full_name}`}>
											{p1Data[0].team.full_name}
										</a>
									</p>
								</th>
								<th>
									<p>
										<a
											href={`/PlayerDetails/?first=${p2Data[0].first_name}&last=${p2Data[0].last_name}`}>
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
											href={`/TeamDetails?teamName=${p2Data[0].team.full_name}`}>
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
											p1Stats[0].games_played > p2Stats[0].games_played
												? 'green'
												: 'red',
									}}>
									{p1Stats[0].games_played}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].games_played > p1Stats[0].games_played
												? 'green'
												: 'red',
									}}>
									{p2Stats[0].games_played}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Minutes Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].min > p2Stats[0].min ? 'green' : 'red',
									}}>
									{p1Stats[0].min}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].min > p1Stats[0].min ? 'green' : 'red',
									}}>
									{p2Stats[0].min}
								</td>
							</tr>
							<tr>
								<td>
									<strong>FG%</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].fg_pct * 100 > p2Stats[0].fg_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p1Stats[0].fg_pct * 100).toFixed(2)} %
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].fg_pct * 100 > p1Stats[0].fg_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p2Stats[0].fg_pct * 100).toFixed(2)} %
								</td>
							</tr>
							<tr>
								<td>
									<strong>3PT%</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].fg3_pct * 100 > p2Stats[0].fg3_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p1Stats[0].fg3_pct * 100).toFixed(2)} %
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].fg3_pct * 100 > p1Stats[0].fg3_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p2Stats[0].fg3_pct * 100).toFixed(2)} %
								</td>
							</tr>
							<tr>
								<td>
									<strong>FT%</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].ft_pct * 100 > p2Stats[0].ft_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p1Stats[0].ft_pct * 100).toFixed(2)} %
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].ft_pct * 100 > p1Stats[0].ft_pct * 100
												? 'green'
												: 'red',
									}}>
									{(p2Stats[0].ft_pct * 100).toFixed(2)} %
								</td>
							</tr>
							<tr>
								<td>
									<strong>Points Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].pts > p2Stats[0].pts ? 'green' : 'red',
									}}>
									{p1Stats[0].pts}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].pts > p1Stats[0].pts ? 'green' : 'red',
									}}>
									{p2Stats[0].pts}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Rebounds Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].reb > p2Stats[0].reb ? 'green' : 'red',
									}}>
									{p1Stats[0].reb}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].reb > p1Stats[0].reb ? 'green' : 'red',
									}}>
									{p2Stats[0].reb}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Assists Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].ast > p2Stats[0].ast ? 'green' : 'red',
									}}>
									{p1Stats[0].ast}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].ast > p1Stats[0].ast ? 'green' : 'red',
									}}>
									{p2Stats[0].ast}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Steals Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].stl > p2Stats[0].stl ? 'green' : 'red',
									}}>
									{p1Stats[0].stl}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].stl > p1Stats[0].stl ? 'green' : 'red',
									}}>
									{p2Stats[0].stl}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Blocks Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].blk > p2Stats[0].blk ? 'green' : 'red',
									}}>
									{p1Stats[0].blk}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].blk > p1Stats[0].blk ? 'green' : 'red',
									}}>
									{p2Stats[0].blk}
								</td>
							</tr>
							<tr>
								<td>
									<strong>Turnovers Per Game</strong>
								</td>
								<td
									style={{
										backgroundColor:
											p1Stats[0].turnover < p2Stats[0].turnover
												? 'green'
												: 'red',
									}}>
									{p1Stats[0].turnover}
								</td>
								<td
									style={{
										backgroundColor:
											p2Stats[0].turnover < p1Stats[0].turnover
												? 'green'
												: 'red',
									}}>
									{p2Stats[0].turnover}
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
    </div>
  )
}

export default RenderComparePlayers