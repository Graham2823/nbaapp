import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import axios from 'axios';

const comparePlayersRouter = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'http://localhost:3000'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });

// boxScoreRouter.use(corsMiddleware);
const apiKey = '34db4f41-8c29-4fef-940d-db01294f67cc';

comparePlayersRouter.get(async (req, res) => {
	try {
        const { p1Name, p2Name } = req.query;
		let p1Data = [];
		let p2Data = [];
		let p1Stats = [];
		let p2Stats = [];
		await axios.get(`http://api.balldontlie.io/v1/players?first_name=${p1Name.split("_")[0]}&last_name=${p1Name.split("_")[1]}`, {
            headers: {
              Authorization: apiKey,
              'Content-Type': 'application/json'
            }
          })
			.then((res) => res.data)
			.then((data) => {
				for (let i = 0; i < data.data.length; i++) {
					p1Data.push(data.data[i]);
				}
			});
		await axios.get(`http://api.balldontlie.io/v1/players?first_name=${p2Name.split("_")[0]}&last_name=${p2Name.split("_")[1]}`, {
            headers: {
              Authorization: apiKey,
              'Content-Type': 'application/json'
            }
          })
			.then((res) => res.data)
			.then((data) => {
				for (let i = 0; i < data.data.length; i++) {
					p2Data.push(data.data[i]);
				}
			});
            let p1ID
            let p2ID
            if(p1Data[0]){
                p1ID = p1Data[0].id;
            }
            if(p2Data[0]){
                p2ID = p2Data[0].id;

            }
        if(p1ID){
            await axios.get(`https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${p1ID}`, {
                headers: {
                  Authorization: apiKey,
                  'Content-Type': 'application/json'
                }
              })
                .then((res) => res.data)
                .then((statsData) => {
                    for (let i = 0; i < statsData.data.length; i++) {
                        p1Stats.push(statsData.data[i]);
                    }
                });
        }
        if(p2ID){
            await axios.get(`https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${p2ID}`, {
                headers: {
                  Authorization: apiKey,
                  'Content-Type': 'application/json'
                }
              })
                .then((res) => res.data)
                .then((statsData) => {
                    for (let i = 0; i < statsData.data.length; i++) {
                        p2Stats.push(statsData.data[i]);
                    }
                });
        }
            if(p1Data.length > 0 && p2Data.length > 0 && p1Stats.length > 0 && p2Stats.length > 0){
                res.json({ p1Data, p2Data, p1Stats, p2Stats });
            }else{
                res.json('Could not find one of the players')
            }
	} catch (err) {
		console.log(err);
	}
});

export default async (req, res) => {
	await comparePlayersRouter.run(req, res);
};
