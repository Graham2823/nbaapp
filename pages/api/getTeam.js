import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import mongoose from 'mongoose';

const teamRouter = createRouter();

// // Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });


// teamRouter.use(corsMiddleware);


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
   const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
  await mongoose.connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const standingsCollection = mongoose.connection.db.collection('standings');

  // Fetch all documents in the Standings collection
  const allStandings = await standingsCollection.find({}).toArray();

  let teamInfo = null;

  // Iterate through Eastern and Western Conference to find the team
  const team = allStandings[0].easternConference.teams.filter((team)=> team.team.replace(/\s+/g, ' ') === teamName)
  console.log(team)
  if(team.length > 0){
      schedule.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      res.json({ schedule, teamName, team });
    }else{
        const team = allStandings[0].westernConference.teams.filter((team)=> team.team.replace(/\s+/g, ' ') === teamName)
        schedule.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        res.json({ schedule, teamName, team });
  }
});

export default async (req, res) => {
    await teamRouter.run(req, res);
};
