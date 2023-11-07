import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware

const comparePlayersRouter = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });

// boxScoreRouter.use(corsMiddleware);

comparePlayersRouter.get(async (req, res) => {
	try {
        const { p1Name, p2Name } = req.query;
		console.log(p1Name);
		console.log(p2Name);
		let p1Data = [];
		let p2Data = [];
		let p1Stats = [];
		let p2Stats = [];
		await fetch(`https://www.balldontlie.io/api/v1/players?search=${p1Name}`)
			.then((res) => res.json())
			.then((data) => {
				for (let i = 0; i < data.data.length; i++) {
					p1Data.push(data.data[i]);
				}
			});
		await fetch(`https://www.balldontlie.io/api/v1/players?search=${p2Name}`)
			.then((res) => res.json())
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
            await fetch(
                `https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${p1ID}`
            )
                .then((res) => res.json())
                .then((statsData) => {
                    for (let i = 0; i < statsData.data.length; i++) {
                        p1Stats.push(statsData.data[i]);
                    }
                });
        }
        if(p2ID){
            await fetch(
                `https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${p2ID}`
            )
                .then((res) => res.json())
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
