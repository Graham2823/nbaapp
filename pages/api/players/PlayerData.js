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
  const processedPlayers = new Set(); // Keep track of processed players
  const requestsPerMinute = 60;
  let millisecondsPerMinute = 150000;
  const maxBackoffDelay = 30000; // 5 minutes

  await Player.deleteMany({});

  // Start with the initial delay
  let currentBackoffDelay = millisecondsPerMinute;

  for (const player of basketballPlayers) {
    // Check if the player has already been processed
    if (processedPlayers.has(player)) {
      continue;
    }

    let playerObject = await processPlayer(player, currentBackoffDelay);

    // Retry if player processing failed
    if (!playerObject) {
      let retryCount = 0;

      while (retryCount < 3) {
        playerObject = await processPlayer(player, currentBackoffDelay);

        if (playerObject) {
          break; // Successful retry, exit the loop
        }

        retryCount++;
      }
    }

    if (playerObject) {
      playerResults.push(playerObject);
      processedPlayers.add(player); // Mark the player as processed
    }
  }

  res.json(playerResults);
});

const processPlayer = async (player, delay) => {
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
        const playerDoc = new Player(playerObject);
        await playerDoc.save();
      }

      // Successful API call, reset backoff delay
      console.log(playerObject)
      return playerObject;
    }
  } catch (error) {
    console.error(`Error processing player ${player}:`, error);

    if (error.response && error.response.status === 429) {
      // Implement exponential backoff with a maximum delay
      delay *= 2;
      if (delay > maxBackoffDelay) {
        delay = maxBackoffDelay;
      }
      // Delay before the next iteration
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return null; // Signal failure to process player
  }
};

export default async (req, res) => {
  await playerData.run(req, res);
};
