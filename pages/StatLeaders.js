import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import "../app/app.css"
import StatLeaderChart from '@/components/charts/StatLeaderChart';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (str) => {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
  };

const StatLeaders = () => {
	const router = useRouter();
	const { stat } = router.query;
	const [statLeaders, setStatLeaders] = useState([]);
	const [showChart, setShowChart] = useState(false)

	useEffect(() => {
        if(stat){
            axios
                .get(`http://localhost:3000/api/statLeaders/${stat}Leaders`)
                .then((response) => {
                    setStatLeaders(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
	}, [stat]);
	console.log("leaders", statLeaders)
	console.log("stat", stat)
	return (
		<div className='statLeadersPage'>
			<Button onClick={()=>router.push('/Stats')} className='returnButton'><FontAwesomeIcon icon={faArrowLeft}/> Stat Leaders</Button>
			<div>
			<h2>{capitalizeFirstLetter(stat)} Leaders</h2>
			<Button onClick={()=>setShowChart(!showChart)}>{showChart== false ? "Show Chart" : "Show Stats"}</Button>
			</div>
			{!showChart ? (
				statLeaders.length > 0 && (
					<Table responsive="lg" className='statLeadersTable'>
						<thead>
							<th></th>
							<th>Player</th>
							<th>Games Played</th>
							<th>Points Per Game</th>
							<th>Rebounds Per Game</th>
							<th>Assists Per Game</th>
							<th>Steals Per Game</th>
							<th>Blocks Per Game</th>
							<th>Turnovers Per Game</th>
							<th>Minutes Per Game</th>
							<th>FG%</th>
							<th>3PT%</th>
							<th>FT%</th>
						</thead>
						<tbody>
							{statLeaders.map((player, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td><a href={`/PlayerDetails/?first=${player.name.split(" ")[0]}&last=${player.name.split(" ")[1]}`}>{player.name}</a></td>
								<td class='gamesPlayed'>
									{player.stats.games_played}
								</td>
								<td style={{background:stat === 'points'? "yellow" : ''}}>{player.stats.points}</td>
								<td style={{background:stat === 'rebounds'? "yellow" : ''}}>{player.stats.rebounds}</td>
								<td style={{background:stat === 'assists'? "yellow" : ''}}>{player.stats.assists}</td>
								<td style={{background:stat === 'steals'? "yellow" : ''}}>{player.stats.steals}</td>
								<td style={{background:stat === 'blocks'? "yellow" : ''}}>{player.stats.blocks}</td>
								<td style={{background:stat === 'turnovers'? "yellow" : ''}}>{player.stats.turnovers}</td>
								<td>{player.stats.min}</td>
								<td>{(player.stats.fg_pct * 100).toFixed(2) + "%"}</td>
								<td>{(player.stats.fg3_pct * 100).toFixed(2) + "%"}</td>
								<td>{(player.stats.ft_pct * 100).toFixed(2) + "%"}</td>
							</tr>
							))}
						</tbody>
					</Table>
				)

			):(
				<div>
					<StatLeaderChart data={statLeaders} stat={stat}/>
				</div>
			)}
		</div>
	);
};

export default StatLeaders;
