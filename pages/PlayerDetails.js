import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/app.css';
import 'react-toastify/dist/ReactToastify.css';

import { Image } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const PlayerDetails = () => {
	const router = useRouter();
	const { first, last } = router.query;
	console.log(first);
	console.log(last);
	const [playerDetails, setPlayerDetails] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [showGamelog, setShowGamelog] = useState(false);
	const [p1FirstName, setP1FirstName] = useState('')
	const [p1LastName, setP1LastName] = useState('')
	const [p2FirstName, setP2FirstName] = useState('')
	const [p2LastName, setP2LastName] = useState('')
	const [p1Data, setP1Data] = useState([])
	const [p2Data, setP2Data] = useState([])
	const [p1Stats, setP1Stats] = useState([])
	const [p2Stats, setP2Stats] = useState([])


	const handleSubmit = () => {
		axios
			.get(
				`https://nbaapp.vercel.app/api/getPlayer?firstName=${firstName}&lastName=${lastName}`
			)
			.then((response) => {
				setPlayerDetails(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
                toast.error('Player Not Found!')
			});
	};

	const comparePlayers = () =>{
		axios.get(`https://nbaapp.vercel.app/api/comparePlayers?p1Name=${p1FirstName}_${p1LastName}&p2Name=${p2FirstName}_${p2LastName}`)
		.then((response)=>{
			console.log(response.data)
			if(response.data === 'Could not find one of the players'){
				toast.error("Could Not find one of the players. Please check spelling, and try again")
			}else{
				setP1Data(response.data.p1Data)
				setP2Data(response.data.p2Data)
				setP1Stats(response.data.p1Stats)
				setP2Stats(response.data.p2Stats)
			}
		})
		.catch((error)=>{
			console.log(error)
			toast.error('Players could not be found!')
		})
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			// This code will only run on the client-side
			setPlayerDetails([]);
		}
		if (first && last) {
			axios
				.get(
					`https://nbaapp.vercel.app/api/getPlayer?firstName=${first}&lastName=${last}`
				)
				.then((response) => {
					setPlayerDetails(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
                    toast.error('Player Not Found!');
				});
		}
	}, [first, last]);

    const shotPercentage = (made, attempted)=>{
        let percentage = made / attempted * 100
        return `${percentage.toFixed(2)}%`
    }

console.log(p1Data, p1Stats)
console.log(p2Data, p2Stats)
	return (
		<div className='playerPage'>
            <ToastContainer/>
			{playerDetails.length === 0 && p1Data.length === 0 ? (
				<div>
				<div className='searchPlayer'>
					<h3>Search Player Stats:</h3>
                    {/* <p>Note: Some Rookies have not been added yet :(</p> */}
					<p>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</p>
					<p>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							onChange={(e) => setLastName(e.target.value)}
						/>
					</p>
					<p>
						<button onClick={() => handleSubmit()}>Search</button>
					</p>
				</div>
				<div className='comparePlayers'>
					<h3>Compare Player Stats</h3>
					<div>
						<h5>Player One:</h5>
					<p>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							onChange={(e) => setP1FirstName(e.target.value)}
						/>
					</p>
					<p>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							onChange={(e) => setP1LastName(e.target.value)}
						/>
					</p>
					</div>
					<div>
						<h5>Player Two:</h5>
					<p>
						<input
							type='text'
							name='firstName'
							placeholder='First Name'
							onChange={(e) => setP2FirstName(e.target.value)}
						/>
					</p>
					<p>
						<input
							type='text'
							name='lastName'
							placeholder='Last Name'
							onChange={(e) => setP2LastName(e.target.value)}
						/>
					</p>
					</div>
					<button onClick={()=>comparePlayers()}>Compare Players</button>
				</div>
				</div>
			) : p1Data.length === 0 ?(
				<div className='playerDetails'>
					<div className='playerBio'>
                        {playerDetails.details ?(
                            <>
						<Image
							src={playerDetails.details.player[0].strThumb}
							className='playerPic'
							alt='player Picture'
						/>
						<div>
							<h3>{playerDetails.details.player[0].strPlayer}</h3>
							<h3>{playerDetails.details.player[0].strPosition}</h3>
							<h3>{playerDetails.details.player[0].strHeight}</h3>
							<h3><a href={`/TeamDetails?teamName=${playerDetails.playerData[0].team.full_name}`}>{playerDetails.details.player[0].strTeam}</a></h3>
						</div>
                            </>

                        ):(
                            <>
                            <h3>{playerDetails.playerData[0].first_name} {playerDetails.playerData[0].last_name}</h3>
                            <h3><a href={`/TeamDetails?teamName=${playerDetails.playerData[0].team.full_name}`}>{playerDetails.playerData[0].team.full_name}</a></h3>
                            </>
                            
                        )}
					</div>
					<div className='playerStats'>
						<Table striped='columns'>
							<thead>
								<th>Season</th>
								<th>Games Played</th>
								<th>Minutes Per Game</th>
								<th>FG%</th>
								<th>3PT%</th>
								<th>FT%</th>
								<th>Points Per Game</th>
								<th>Rebounds Per Game</th>
								<th>Assists Per Game</th>
								<th>Steals Per Game</th>
								<th>Blocks Per Game</th>
								<th>Turnovers Per Game</th>
							</thead>
							<tbody>
								{playerDetails.stats.length === 0 ? (
									<tr>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
										<td>0</td>
									</tr>
								) : (
									<tr>
										<td class='season'>{playerDetails.stats[0].season}</td>
										<td class='gamesPlayed'>
											{playerDetails.stats[0].games_played}
										</td>
										<td>{playerDetails.stats[0].min}</td>
										<td>{playerDetails.stats[0].fgm === 0 ? `0%`: shotPercentage(playerDetails.stats[0].fgm, playerDetails.stats[0].fga)}</td>
										<td>{playerDetails.stats[0].fg3m === 0 ? `0%`: shotPercentage(playerDetails.stats[0].fg3m,playerDetails.stats[0].fg3a)}</td>
										<td>{playerDetails.stats[0].ftm === 0 ? `0%`: shotPercentage(playerDetails.stats[0].ftm,playerDetails.stats[0].fta)}</td>
										<td>{playerDetails.stats[0].pts}</td>
										<td>{playerDetails.stats[0].reb}</td>
										<td>{playerDetails.stats[0].ast}</td>
										<td>{playerDetails.stats[0].stl}</td>
										<td>{playerDetails.stats[0].blk}</td>
										<td>{playerDetails.stats[0].turnover}</td>
									</tr>
								)}
							</tbody>
						</Table>
					</div>
					<div className='sortButtons'>
						<button onClick={() => setShowGamelog(false)}>
							Player Details
						</button>
						<button onClick={() => setShowGamelog(true)}>Player Gamelog</button>
					</div>
					{!showGamelog ? (
						<div className='description'>
                            {playerDetails.details ?(
                                <p>{playerDetails.details.player[0].strDescriptionEN}</p>

                            ):(
                                <h3>No Player Details Available</h3>
                            )}
						</div>
					) : playerDetails.gamelog.length > 0 ? (
						<div className='gamelog'>
							<Table className='gamelogTable' striped>
								<thead>
									<tr>
										<th>Date</th>
										<th>Minutes</th>
										<th>FG</th>
										<th>FT</th>
										<th>3PT</th>
										<th>Points</th>
										<th>Rebounds</th>
										<th>Assists</th>
										<th>Steals</th>
										<th>Blocks</th>
										<th>Turnovers</th>
									</tr>
								</thead>
								<tbody>
									{playerDetails.gamelog.reverse().map((game) => (
										<tr key={game.id}>
											{' '}
											{/* Add a unique key for each row */}
											<td>{game.game.date.slice(0, 10)}</td>
											<td>{game.min}</td>
											<td>{`${game.fgm}/${game.fga}`}</td>
											<td>{`${game.ftm}/${game.fta}`}</td>
											<td>{`${game.fg3m}/${game.fg3a}`}</td>
											<td>{game.pts}</td>
											<td>{game.reb}</td>
											<td>{game.ast}</td>
											<td>{game.stl}</td>
											<td>{game.blk}</td>
											<td>{game.turnover}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					) : (
						<h2>No Games Played Yet</h2>
					)}
				</div>
			):(
				<div>
					<Table className='comparePlayersTable'>
						<thead>
							<tr>
								<th>{p1Data[0].first_name} {p1Data[0].last_name} vs {p2Data[0].first_name} {p2Data[0].last_name}</th>
								<th>
										<p><a href={`/PlayerDetails/?first=${p1Data[0].first_name}&last=${p1Data[0].last_name}`}>{p1Data[0].first_name} {p1Data[0].last_name}</a></p>
										<p>{p1Data[0].position}</p>
										{p1Data[0].height_feet && p1Data[0].height_inches ?(
											<p>{p1Data[0].height_feet}ft {p1Data[0].height_inches}in</p>

										):(
											<p>Height Not Found</p>
										)
										}
										<p><a href={`/TeamDetails?teamName=${p1Data[0].team.full_name}`}>{p1Data[0].team.full_name}</a></p>
									
								</th>
								<th>
										<p><a href={`/PlayerDetails/?first=${p2Data[0].first_name}&last=${p2Data[0].last_name}`}>{p2Data[0].first_name} {p2Data[0].last_name}</a></p>
										<p>{p2Data[0].position}</p>
										{p2Data[0].height_feet && p2Data[0].height_inches ?(
											<p>{p2Data[0].height_feet}ft {p2Data[0].height_inches}in</p>

										):(
											<p>Height Not Found</p>
										)
										}
										<p><a href={`/TeamDetails?teamName=${p2Data[0].team.full_name}`}>{p2Data[0].team.full_name}</a></p>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<strong>Games Played</strong>
								</td>
								<td style={{backgroundColor:p1Stats[0].games_played > p2Stats[0].games_played ? 'green' : "red"}}>{p1Stats[0].games_played}</td>
								<td style={{backgroundColor:p2Stats[0].games_played > p1Stats[0].games_played ? 'green' : "red"}}>{p2Stats[0].games_played}</td>
							</tr>
							<tr>
								<td>
									<strong>Minutes Per Game</strong> 
								</td>
								<td style={{backgroundColor:p1Stats[0].min > p2Stats[0].min ? 'green' : "red"}}>{p1Stats[0].min}</td>
								<td style={{backgroundColor:p2Stats[0].min > p1Stats[0].min ? 'green' : "red"}}>{p2Stats[0].min}</td>
							</tr>
							<tr>
								<td>
									<strong>Points Per Game</strong> 
								</td>
								<td style={{backgroundColor:p1Stats[0].pts > p2Stats[0].pts ? 'green' : "red"}}>{p1Stats[0].pts}</td>
								<td style={{backgroundColor:p2Stats[0].pts > p1Stats[0].pts ? 'green' : "red"}}>{p2Stats[0].pts}</td>
							</tr>
							<tr>
								<td>
									<strong>Rebounds Per Game</strong> 
								</td>
								<td style={{backgroundColor:p1Stats[0].reb > p2Stats[0].reb ? 'green' : "red"}}>{p1Stats[0].reb}</td>
								<td style={{backgroundColor:p2Stats[0].reb > p1Stats[0].reb ? 'green' : "red"}}>{p2Stats[0].reb}</td>
							</tr>
							<tr>
								<td>
									<strong>Assists Per Game</strong> 
								</td>
								<td style={{backgroundColor:p1Stats[0].ast > p2Stats[0].ast ? 'green' : "red"}}>{p1Stats[0].ast}</td>
								<td style={{backgroundColor:p2Stats[0].ast > p1Stats[0].ast ? 'green' : "red"}}>{p2Stats[0].ast}</td>
							</tr>
							<tr>
								<td>
									<strong>Steals Per Game</strong> 
								</td>
								<td style={{backgroundColor:p1Stats[0].stl > p2Stats[0].stl ? 'green' : "red"}}>{p1Stats[0].stl}</td>
								<td style={{backgroundColor:p2Stats[0].stl > p1Stats[0].stl ? 'green' : "red"}}>{p2Stats[0].stl}</td>
							</tr>
							<tr>
								<td>
									<strong>Turnovers Per Game</strong> 
								</td>
								<td style={{backgroundColor:p1Stats[0].turnover < p2Stats[0].turnover ? 'green' : "red"}}>{p1Stats[0].turnover}</td>
								<td style={{backgroundColor:p2Stats[0].turnover < p1Stats[0].turnover ? 'green' : "red"}}>{p2Stats[0].turnover}</td>
							</tr>
						</tbody>
					</Table>
				</div>
				
			)}
		</div>
	);
};

export default PlayerDetails;
