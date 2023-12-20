import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import Player from '@/models/playerSchema';
import mongoose from 'mongoose';
import basketballPlayers from '@/players';


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
for (let i = 0; i < basketballPlayers.length; i++) {
    let playerID;
    let playerTeam = null;
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
    let playerFirstName = basketballPlayers[i].split(" ")[0]
    let playerLastName = basketballPlayers[i].split(" ")[1]
    

    const playerInfo = await fetch(`https://www.balldontlie.io/api/v1/players?search=${playerFirstName}%20${playerLastName}`).then(res=> res.json())
    console.log(playerInfo.data[0])
    if(playerInfo.data[0]){

    
        playerID = playerInfo.data[0].id
    
    if(playerInfo.data[0].team.length > 0){
        playerTeam = playerInfo.data[0].team.full_name
    }

      // Fetch season averages data
      const playerStats = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${playerID}`).then(res => res.json());

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
    }

      // Create playerObject
      playerObject = {
        name: basketballPlayers[i].split("%20").join(" "),
        team: playerTeam === null ? "" : playerTeam,
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
      if(playerObject.stats.games_played){
          playerResults.push(playerObject);
          const playerDoc = new Player(playerObject);
          await playerDoc.save();
          console.log(playerObject)
      }
    

    // Delay before next iteration
    await delay(millisecondsPerMinute / requestsPerMinute);
  }

  res.json(playerResults);
});

export default async (req, res) => {
    await playerData.run(req, res);
};