import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import mongoose from 'mongoose';
import axios from 'axios';

const compareTeamsRouter = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'http://localhost:3000'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });

// boxScoreRouter.use(corsMiddleware);

const apiKey = '34db4f41-8c29-4fef-940d-db01294f67cc';


compareTeamsRouter.get(async (req, res) => {
	try {
        const {team1, team2} = req.query
        let teamID1
        let teamID2
        await axios.get(`http://api.balldontlie.io/v1/teams`, {
            headers: {
              Authorization: apiKey,
              'Content-Type': 'application/json'
            }
          })
        .then(res => res.data)
        .then((teams)=>{
            for (let i=0; i<teams.data.length; i++){
                if(teams.data[i].full_name === team1){
                    teamID1 = teams.data[i].id
                }
            }
        })
        await axios.get(`http://api.balldontlie.io/v1/teams`, {
            headers: {
              Authorization: apiKey,
              'Content-Type': 'application/json'
            }
          })
        .then(res => res.data)
        .then((teams)=>{
            for (let i=0; i<teams.data.length; i++){
                if(teams.data[i].full_name === team2){
                    teamID2 = teams.data[i].id
                }
            }
        })
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
        const teamOne = allStandings[0].easternConference.teams.filter((team)=> team.team.replace(/\s+/g, ' ') === team1)
        const teamTwo = allStandings[0].easternConference.teams.filter((team)=> team.team.replace(/\s+/g, ' ') === team2)
        if(teamOne.length > 0 && teamTwo.length > 0){
            res.json({ teamOne, teamTwo });
        }else if(teamOne.length > 0){
            const teamTwo = allStandings[0].westernConference.teams.filter((team)=> team.team.replace(/\s+/g, ' ') === team2)
            res.json({ teamOne, teamTwo });
        } else if(teamTwo.length > 0){
            const teamOne = allStandings[0].westernConference.teams.filter((team)=> team.team.replace(/\s+/g, ' ') === team1)
            res.json({ teamOne, teamTwo });
        }else if(teamOne.length < 1 && teamTwo.length < 1){
            const teamOne = allStandings[0].westernConference.teams.filter((team)=> team.team.replace(/\s+/g, ' ') === team1)
            const teamTwo = allStandings[0].westernConference.teams.filter((team)=> team.team.replace(/\s+/g, ' ') === team2)
            res.json({ teamOne, teamTwo });
        }else{
            res.json({message:"error"})
        }
	} catch (err) {
		console.log(err);
	}
});

export default async (req, res) => {
	await compareTeamsRouter.run(req, res);
};
