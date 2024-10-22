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
		let playerTeam = team?.full_name || ''; // Fallback in case team info is missing
		
		// Set default values to 0 for all stats
		let games_played = 0;
		let min = 0;
		let points = 0;
		let assists = 0;
		let rebounds = 0;
		let blocks = 0;
		let steals = 0;
		let turnovers = 0;
		let fg_pct = 0;
		let fg3_pct = 0;
		let ft_pct = 0;

		// Fetch season averages for the player
		const seasonAveragesResponse = await axios.get(
			`http://api.balldontlie.io/v1/season_averages?season=2024&player_id=${id}`,
			{
				headers: {
					Authorization: '34db4f41-8c29-4fef-940d-db01294f67cc',
					'Content-Type': 'application/json',
				},
			}
		);

		if (seasonAveragesResponse.data.data.length > 0) {
			const seasonData = seasonAveragesResponse.data.data[0];
			
			// Assign values from the API response, with fallback to 0 if undefined
			games_played = seasonData?.games_played ?? 0;
			min = seasonData?.min ?? 0;
			points = seasonData?.pts ?? 0;
			assists = seasonData?.ast ?? 0;
			rebounds = seasonData?.reb ?? 0;
			steals = seasonData?.stl ?? 0;
			blocks = seasonData?.blk ?? 0;
			turnovers = seasonData?.turnover ?? 0;
			fg_pct = seasonData?.fg_pct ?? 0;
			fg3_pct = seasonData?.fg3_pct ?? 0;
			ft_pct = seasonData?.ft_pct ?? 0;
		}

		// Create playerObject with either valid or default (0) values
		const playerObject = {
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

		// Save the player object to the database
		const playerDoc = new Player(playerObject);
		await playerDoc.save();

		// Log and return the player object
		console.log(playerObject);
		return playerObject;
	} catch (error) {
		console.error(`Error processing player ${player.first_name} ${player.last_name}:`, error);

		// Handle rate-limiting with backoff delay
		if (error.response && error.response.status === 429) {
			delay *= 2;
			if (delay > maxBackoffDelay) {
				delay = maxBackoffDelay;
			}
			await new Promise((resolve) => setTimeout(resolve, delay));
		}

		return null; // Indicate failure
	}
};



export default async (req, res) => {
	await playerData.run(req, res);
};
