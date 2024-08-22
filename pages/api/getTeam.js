import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import mongoose from 'mongoose';
import axios from 'axios';

const teamRouter = createRouter();

// // Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });


// teamRouter.use(corsMiddleware);


teamRouter.get(async (req, res) => {
	const {teamName} = req.query
    let teamID
	await axios.get(`http://api.balldontlie.io/v1/teams`, {
  headers: {
    'Authorization': '34db4f41-8c29-4fef-940d-db01294f67cc',
    'Content-Type': 'application/json'
  }
}).then((res) => res.data)
  .then((teams) => {
    for (let i = 0; i < teams.data.length; i++) {
      if (teams.data[i].full_name === teamName) {
        teamID = teams.data[i].id;
        break; // Once you find the matching team, exit the loop
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });

	// await fetch(`https://www.balldontlie.io/api/v1/teams`)
	// 	.then((res) => res.json())
	// 	.then((teams) => {
	// 		for (let i = 0; i < teams.data.length; i++) {
	// 			if (teams.data[i].full_name === teamName) {
	// 				teamID = teams.data[i].id;
	// 			}
	// 		}
	// 	});
	let schedule = [];
		await axios.get(`http://api.balldontlie.io/v1/games?seasons[]=2024&team_ids[]=${teamID}&per_page=100`, {
  headers: {
    'Authorization': '34db4f41-8c29-4fef-940d-db01294f67cc',
    'Content-Type': 'application/json'
  }
}).then((res) => res.data)
  .then((data) => {
    for (let i = 0; i < data.data.length; i++) {
		schedule.push(data.data[i]);
	}
  })
  .catch((error) => {
    console.error(error);
  });
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
