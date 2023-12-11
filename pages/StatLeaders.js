import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import "../app/app.css"


const StatLeaders = () => {
	const router = useRouter();
	const { stat } = router.query;
	const [statLeaders, setStatLeaders] = useState([]);

	useEffect(() => {
        if(stat){
            axios
                .get(`https://nbaapp.vercel.app/api/${stat}Leaders`)
                .then((response) => {
                    setStatLeaders(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
	}, [stat]);

	return (
		<div className='statLeadersPage'>
			{statLeaders.length > 0 && (
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
			)}
		</div>
	);
};

export default StatLeaders;
