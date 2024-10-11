import { createRouter } from 'next-connect';
import mongoose from 'mongoose';
import Player from '@/models/playerSchema'; // Your Player model
import axios from 'axios';

const randomPlayerRouter = createRouter();
const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;

// Cache the database connection
let cachedDb = null;

async function connectToDatabase() {
	if (!cachedDb) {
		cachedDb = await mongoose.connect(mongoConnectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');
	}
	return cachedDb;
}

async function fetchRandomPlayer(res, retryCount = 0) {
	try {
		// Ensure database connection is established
		await connectToDatabase();

		// Fetch random player using aggregation
		const randomPlayer = await Player.aggregate([{ $sample: { size: 1 } }]);

		if (randomPlayer.length === 0) {
			return res.status(404).json({ message: 'No players found' });
		}

		// Split the name into first and last name
		const nameParts = randomPlayer[0].name.split(' ');
		const firstName = nameParts[0];
		const lastName = nameParts.slice(1).join(' ');

		// Fetch player data from the external API
		const { data: { data: playerData } } = await axios.get(
			`http://api.balldontlie.io/v1/players?first_name=${firstName}&last_name=${lastName}`,
			{
				timeout: 20000,
				headers: {
					Authorization: process.env.API_KEY,
					'Content-Type': 'application/json',
				},
			}
		);

		if (playerData.length === 0) {
			return res.status(404).json({ message: 'No matching player found in API' });
		}
		const playerID = playerData[0].id;
		const draftYear = playerData[0].draft_year;
        console.log("playerID", playerID)
		// If the player was drafted after 2020 and retries are under limit, fetch another player
		if (draftYear === null || draftYear > 2020 && retryCount < 100) {
            console.log(`Player drafted in ${draftYear}, fetching a new player...`);
			return fetchRandomPlayer(res, retryCount + 1); // Recursively fetch a new player
		}
        console.log("first check")

		// Fetch player averages for past seasons
		const playerAverages = [];
		const requests = [];

		for (let i = 0; i <= 21; i++) {
			requests.push(
				axios.get(
					`http://api.balldontlie.io/v1/season_averages?season=${2024 - i}&player_id=${playerID}`,
					{
						timeout: 60000,
						headers: {
							Authorization: process.env.API_KEY,
							'Content-Type': 'application/json',
						},
					}
				)
			);
		}

		// Wait for all season average requests to finish
		const results = await Promise.all(requests);
        console.log('second check')
		// Process the results
		let counter = 0;
		for (const result of results) {
			const data = result.data.data;
			if (data.length > 0) {
				playerAverages.push(data);
			} else {
				counter++;
			}

			// If no data for 3 seasons in a row, break
			if (counter === 3) {
				break;
			}
		}
        let averaged20 = false
        for(const year of playerAverages){
            if(year[0].pts > 20){
                averaged20 = true
            }
        }
        if(!averaged20){
            console.log("player did not average over 20... finding new player")
            return fetchRandomPlayer(res);
        }

		// Return the player data and averages
		res.json({playerData, playerAverages});

	} catch (error) {
		console.error('Error fetching random player:', error);
		res.status(500).json({ message: 'Error fetching random player' });
	}
}

randomPlayerRouter.get(async (req, res) => {
	await fetchRandomPlayer(res); // Start the recursive player fetch process
});

export default async (req, res) => {
	await randomPlayerRouter.run(req, res);
};
