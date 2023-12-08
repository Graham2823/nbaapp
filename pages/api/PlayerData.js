import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import Player from '@/models/playerSchema';
import mongoose from 'mongoose';

const playerData = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });


// playerRouter.use(corsMiddleware);
const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;

playerData.get(async (req, res) =>{
    await mongoose.connect(mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    const playerResults = []
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

const requestsPerMinute = 60;
const millisecondsPerMinute = 120000;
await Player.deleteMany({});
for (let i = 15; i <= 495; i++) {
    let playerName;
    let playerID;
    let playerTeam;
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
    let compilePlayer = false;
    let playerObject;

    // Fetch gamelog data
    const gamelogData = await fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=2023&player_ids[]=${i}&postseason=false`).then(res => res.json());

    if (gamelogData.data.length > 0) {
      playerName = gamelogData.data[0].player.first_name + "%20" + gamelogData.data[0].player.last_name;
      compilePlayer = true; // Set compilePlayer to true when gamelog data is available
      playerTeam = gamelogData.data[0].team.full_name;
    }

    // Continue with other fetches and processing only if compilePlayer is true
    if (compilePlayer) {
      // Fetch season averages data
      const playerStats = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${i}`).then(res => res.json());

      if (playerStats.data.length > 0) {
        min = playerStats.data[0].min;
        points = playerStats.data[0].pts;
        rebounds = playerStats.data[0].reb;
        assists = playerStats.data[0].ast;
        steals = playerStats.data[0].stl;
        blocks = playerStats.data[0].blk;
        games_played = playerStats.data[0].games_played;
        turnovers = playerStats.data[0].turnover;
        fg_pct = playerStats.data[0].fg_pct;
        fg3_pct = playerStats.data[0].fg3_pct;
        ft_pct = playerStats.data[0].ft_pct;
      }

      // Create playerObject
      playerObject = {
        name: playerName.split("%20").join(' '),
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
      playerResults.push(playerObject);
      const playerDoc = new Player(playerObject);
      await playerDoc.save();
    }

    // Delay before next iteration
    await delay(millisecondsPerMinute / requestsPerMinute);
  }

  res.json(playerResults);
});

export default async (req, res) => {
    await playerData.run(req, res);
};