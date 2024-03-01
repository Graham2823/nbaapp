import { createRouter } from 'next-connect';
import Player from '@/models/playerSchema';
import mongoose from 'mongoose';
import basketballPlayers from '@/players';
import axios from 'axios';

const playerData = createRouter();

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;

playerData.get(async (req, res) => {
  await mongoose.connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const playerResults = [];
  const requestsPerMinute = 60;
  let millisecondsPerMinute = 150000;
  const maxBackoffDelay = 30000; // 5 minutes

  await Player.deleteMany({});

  for (const player of basketballPlayers) {
    try {
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
      const [playerFirstName, playerLastName] = player.split(" ");

      const playersResponse = await axios.get(
        `http://api.balldontlie.io/v1/players?first_name=${playerFirstName}&last_name=${playerLastName}`,
        {
          headers: {
            Authorization: '34db4f41-8c29-4fef-940d-db01294f67cc',
            'Content-Type': 'application/json',
          },
        }
      );

      if (playersResponse.data.data[0]) {
        playerID = playersResponse.data.data[0].id;

        if (playersResponse.data.data[0].team.length > 0) {
          playerTeam = playersResponse.data.data[0].team.full_name;
        }

        const seasonAveragesResponse = await axios.get(
          `http://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerID}`,
          {
            headers: {
              Authorization: '34db4f41-8c29-4fef-940d-db01294f67cc',
              'Content-Type': 'application/json',
            },
          }
        );

        if (seasonAveragesResponse.data.data.length > 0) {
          min = seasonAveragesResponse.data.data[0].min;
          points = seasonAveragesResponse.data.data[0].pts;
          rebounds = seasonAveragesResponse.data.data[0].reb;
          assists = seasonAveragesResponse.data.data[0].ast;
          steals = seasonAveragesResponse.data.data[0].stl;
          blocks = seasonAveragesResponse.data.data[0].blk;
          games_played = seasonAveragesResponse.data.data[0].games_played;
          turnovers = seasonAveragesResponse.data.data[0].turnover;
          fg_pct = seasonAveragesResponse.data.data[0].fg_pct;
          fg3_pct = seasonAveragesResponse.data.data[0].fg3_pct;
          ft_pct = seasonAveragesResponse.data.data[0].ft_pct;
        }

        // Create playerObject
        playerObject = {
          name: player.split("%20").join(" "),
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
        if (playerObject.stats.games_played) {
          playerResults.push(playerObject);
          const playerDoc = new Player(playerObject);
          await playerDoc.save();
          console.log(playerObject);
        }
      }
    } catch (error) {
      console.error(`Error processing player ${player}:`, error);

      // Check if the error is a 429 (Too Many Requests) status
      if (error.response && error.response.status === 429) {
        // Implement exponential backoff with a maximum delay
        millisecondsPerMinute *= 2;
        if (millisecondsPerMinute > maxBackoffDelay) {
          millisecondsPerMinute = maxBackoffDelay;
        }
        console.log(`Rate limit exceeded. Backing off for ${millisecondsPerMinute / 1000} seconds.`);
        // Delay before the next iteration
        await new Promise(resolve => setTimeout(resolve, millisecondsPerMinute));
      }
    }
  }

  res.json(playerResults);
});

export default async (req, res) => {
  await playerData.run(req, res);
};
