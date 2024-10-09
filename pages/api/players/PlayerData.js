import { createRouter } from 'next-connect';
import Player from '@/models/playerSchema';
import mongoose from 'mongoose';
import axios from 'axios';

const playerData = createRouter();

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;

playerData.get(async (req, res) => {
	await mongoose.connect(mongoConnectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const playerResults = [];
	const processedPlayers = new Set(); // Keep track of processed players
	const requestsPerMinute = 60;
	let millisecondsPerMinute = 150000;
	const maxBackoffDelay = 30000; // 5 minutes

	await Player.deleteMany({});

	// Start with the initial delay
	let currentBackoffDelay = millisecondsPerMinute;

	// Loop through team IDs from 1 to 30
	for (let teamId = 1; teamId <= 30; teamId++) {
		try {
			const playersResponse = await axios.get(
				`https://api.balldontlie.io/v1/players/active?per_page=100&team_ids[]=${teamId}`,
				{
					headers: {
						Authorization: '34db4f41-8c29-4fef-940d-db01294f67cc',
						'Content-Type': 'application/json',
					},
				}
			);

			// Process each player in the team
			for (const player of playersResponse.data.data) {
				// Check if the player has already been processed
				if (processedPlayers.has(player.id)) {
					continue;
				}

				let playerObject = await processPlayer(player, currentBackoffDelay);

				// Retry if player processing failed
				if (!playerObject) {
					let retryCount = 0;

					while (retryCount < 3) {
						playerObject = await processPlayer(player, currentBackoffDelay);

						if (playerObject) {
							break; // Successful retry, exit the loop
						}

						retryCount++;
					}
				}

				if (playerObject) {
					playerResults.push(playerObject);
					processedPlayers.add(player.id); // Mark the player as processed
				}
			}
		} catch (error) {
			console.error(`Error fetching players for team ${teamId}:`, error);
		}
	}

	res.json(playerResults);
});

const processPlayer = async (player, delay) => {
	try {
		const { id, first_name, last_name, team } = player;
		let playerTeam = team.full_name || '';
		let games_played;
		let min;
		let points;
		let assists;
		let rebounds;
		let blocks;
		let steals;
		let turnovers;
		let fg_pct;
		let fg3_pct;
		let ft_pct;
		let playerObject;

		const seasonAveragesResponse = await axios.get(
			`http://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${id}`,
			{
				headers: {
					Authorization: '34db4f41-8c29-4fef-940d-db01294f67cc',
					'Content-Type': 'application/json',
				},
			}
		);

		if (seasonAveragesResponse.data.data.length > 0) {
			const seasonData = seasonAveragesResponse.data.data[0];
			min = seasonData.min;
			points = seasonData.pts;
			rebounds = seasonData.reb;
			assists = seasonData.ast;
			steals = seasonData.stl;
			blocks = seasonData.blk;
			games_played = seasonData.games_played;
			turnovers = seasonData.turnover;
			fg_pct = seasonData.fg_pct;
			fg3_pct = seasonData.fg3_pct;
			ft_pct = seasonData.ft_pct;
		}

		// Create playerObject
		playerObject = {
			name: `${first_name} ${last_name}`,
			team: playerTeam,
			stats: {
				games_played,
				min,
				points,
				assists,
				rebounds,
				blocks,
				steals,
				turnovers,
				fg_pct,
				fg3_pct,
				ft_pct,
			},
		};

		// Push to playerResults and save to database
		const playerDoc = new Player(playerObject);
		await playerDoc.save();

		// Successful API call, reset backoff delay
		console.log(playerObject);
		return playerObject;
	} catch (error) {
		console.error(`Error processing player ${player.name}:`, error);

		if (error.response && error.response.status === 429) {
			// Implement exponential backoff with a maximum delay
			delay *= 2;
			if (delay > maxBackoffDelay) {
				delay = maxBackoffDelay;
			}
			// Delay before the next iteration
			await new Promise((resolve) => setTimeout(resolve, delay));
		}

		return null; // Signal failure to process player
	}
};

export default async (req, res) => {
	await playerData.run(req, res);
};
