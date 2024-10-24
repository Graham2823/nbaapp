import React, { useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

const FavPlayerCard = ({ favoritePlayer }) => {
	const [playerDetails, setPlayerDetails] = useState(null);
	const [showPlayerStats, setShowPlayerStats] = useState(true);
	const [showPlayerDetails, setShowPlayerDetails] = useState(false);
	const [showPlayerGamelog, setShowPlayerGamelog] = useState(false);
	const router = useRouter();

	console.log('favorite player', favoritePlayer);

	// Safely show last 5 games or fewer if not available
	const last5Games =
		favoritePlayer.playerGamelog &&
		Array.isArray(favoritePlayer.playerGamelog) &&
		favoritePlayer.playerGamelog.length > 0
			? favoritePlayer.playerGamelog.length <= 5
				? [...favoritePlayer.playerGamelog].reverse() // Show all if 5 or fewer
				: favoritePlayer.playerGamelog.slice(-5).reverse() // Show the most recent 5 if more than 5
			: []; // Return empty array if no games

	const handleClickButton = (e) => {
		if (e.target.name === 'playerStats') {
			setShowPlayerStats(true);
			setShowPlayerDetails(false);
			setShowPlayerGamelog(false);
		} else if (e.target.name === 'playerDetails') {
			setShowPlayerStats(false);
			setShowPlayerDetails(true);
			setShowPlayerGamelog(false);
		} else if (e.target.name === 'last5') {
			setShowPlayerStats(false);
			setShowPlayerDetails(false);
			setShowPlayerGamelog(true);
		}
	};

	return (
		<div>
			{favoritePlayer && (
				<Card className='favoritePlayerCard'>
					<div className='playerCardButtonContainer'>
						<Button
							className='playerCardButton'
							name='playerStats'
							onClick={handleClickButton}>
							Player Stats
						</Button>
						<Button
							className='playerCardButton'
							name='playerDetails'
							onClick={handleClickButton}>
							Player Details
						</Button>
						<Button
							className='playerCardButton'
							name='last5'
							onClick={handleClickButton}>
							Last 5 Games
						</Button>
					</div>
					<Table>
						<thead>
							<tr>
								{favoritePlayer.playerData &&
								favoritePlayer.playerData.length > 0 ? (
									<>
										<th colSpan={showPlayerGamelog ? 2.5 : 1}>
											{favoritePlayer.playerData[0].first_name}{' '}
											{favoritePlayer.playerData[0].last_name}
										</th>
										<th
											colSpan={showPlayerGamelog ? 2.5 : 1}
											onClick={() =>
												router.push(
													`/team/TeamDetails?teamName=${favoritePlayer.playerData[0].team.full_name}`
												)
											}>
											{favoritePlayer.playerData[0].team.full_name}
										</th>
									</>
								) : (
									<th colSpan={2}>Player data not available</th>
								)}
							</tr>
						</thead>
						{showPlayerStats ? (
							<tbody>
								<tr>
									<td>Points:</td>
									<td>
										{favoritePlayer.playerAverages &&
										favoritePlayer.playerAverages[0] &&
										favoritePlayer.playerAverages[0][0]
											? favoritePlayer.playerAverages[0][0].pts
											: 0}
									</td>
								</tr>
								<tr>
									<td>Rebounds:</td>
									<td>
										{favoritePlayer.playerAverages &&
										favoritePlayer.playerAverages[0] &&
										favoritePlayer.playerAverages[0][0]
											? favoritePlayer.playerAverages[0][0].reb
											: 0}
									</td>
								</tr>
								<tr>
									<td>Assists:</td>
									<td>
										{favoritePlayer.playerAverages &&
										favoritePlayer.playerAverages[0] &&
										favoritePlayer.playerAverages[0][0]
											? favoritePlayer.playerAverages[0][0].ast
											: 0}
									</td>
								</tr>
								<tr>
									<td>Steals:</td>
									<td>
										{favoritePlayer.playerAverages &&
										favoritePlayer.playerAverages[0] &&
										favoritePlayer.playerAverages[0][0]
											? favoritePlayer.playerAverages[0][0].stl
											: 0}
									</td>
								</tr>
								<tr>
									<td>Blocks:</td>
									<td>
										{favoritePlayer.playerAverages &&
										favoritePlayer.playerAverages[0] &&
										favoritePlayer.playerAverages[0][0]
											? favoritePlayer.playerAverages[0][0].blk
											: 0}
									</td>
								</tr>
							</tbody>
						) : showPlayerDetails ? (
							<tbody>
								<tr>
									<td>Position:</td>
									<td>{favoritePlayer.details.player[0].strPosition}</td>
								</tr>
								<tr>
									<td>Height:</td>
									<td>{favoritePlayer.playerData[0].height}</td>
								</tr>
								<tr>
									<td>Weight:</td>
									<td>{favoritePlayer.details.player[0].strWeight}</td>
								</tr>
								<tr>
									<td>Number:</td>
									<td>{favoritePlayer.playerData[0].jersey_number}</td>
								</tr>
								<tr>
									<td>Nationality:</td>
									<td>{favoritePlayer.details.player[0].strNationality}</td>
								</tr>
							</tbody>
						) : (
							<tbody>
								<tr>
									<td>Points</td>
									<td>Rebounds</td>
									<td>Assists</td>
									<td>Steals</td>
									<td>Blocks</td>
								</tr>
								{last5Games &&
									last5Games.map((game, key) => (
										<tr key={key}>
											<td>{game.pts}</td>
											<td>{game.reb}</td>
											<td>{game.ast}</td>
											<td>{game.stl}</td>
											<td>{game.blk}</td>
										</tr>
									))}
							</tbody>
						)}
					</Table>

					<Button
						className='button'
						onClick={() =>
							router.push(
								`/player/PlayerDetails/?first=${favoritePlayer.playerData[0].first_name}&last=${favoritePlayer.playerData[0].last_name}`
							)
						}>
						View More
					</Button>
				</Card>
			)}
		</div>
	);
};

export default FavPlayerCard;
