import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware

const teamRouter = createRouter();

// Set up CORS options
const corsMiddleware = cors({
  origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
  methods: ['GET'], // Allow only the HTTP methods you need
});


teamRouter.use(corsMiddleware);


teamRouter.get(async (req, res) => {
	const {teamName} = req.query
	console.log(teamName);
    let teamID
	await fetch(`https://www.balldontlie.io/api/v1/teams`)
		.then((res) => res.json())
		.then((teams) => {
			for (let i = 0; i < teams.data.length; i++) {
				if (teams.data[i].full_name === teamName) {
					teamID = teams.data[i].id;
				}
			}
		});
	let schedule = [];
	let wins = 0;
	let losses = 0;
	for (let i = 1; i < 5; i++) {
		await fetch(
			`https://www.balldontlie.io/api/v1/games?seasons[]=2023&team_ids[]=${teamID}&page=${i}`
		)
			.then((res) => res.json())
			.then((data) => {
				for (let i = 0; i < data.data.length; i++) {
					schedule.push(data.data[i]);
				}
			});
	}

	// console.log(Date.parse(schedule[81].date))
	schedule.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
	res.json({ schedule, teamName });
});

export default async (req, res) => {
    await teamRouter.run(req, res);
};
