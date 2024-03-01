import { createRouter } from 'next-connect';
import axios from 'axios';

const playerRouter = createRouter();

const apiKey = '8920cadb-f040-4b27-8823-ace24cd841fe';

playerRouter.get(async (req, res) => {
  try {
    const { firstName, lastName } = req.query;
    const playerName = firstName + "_" + lastName;

    if (playerName !== '_') {
      const playerData = await fetchPlayerData(playerName);
      console.log("playerData", playerData)
      if (playerData[0]) {
        const { id: playerID } = playerData[0];
        const stats = await fetchAllPlayerStats(playerID);
        const gamelog = await fetchPlayerGameLog(playerID);
        const details = await fetchPlayerDetails(firstName, lastName);

        gamelog.sort((a, b) => Date.parse(a.game.date) - Date.parse(b.game.date));

        if (details.player && details.player[0].strSport === 'Basketball') {
          res.json({ stats, playerData, gamelog, details });
        } else {
          res.json({ stats, playerData, gamelog });
        }
      } else {
        res.json({ error: 'Player not found' });
      }
    } else {
      res.json({ error: 'Invalid player name' });
    }
  } catch (error) {
    console.error('Error fetching player data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const fetchPlayerData = async (playerName) => {
  try {
    const response = await axios.get(`http://api.balldontlie.io/v1/players?search=${playerName}`, {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    });
    console.log("res", response)
    return response.data.data;
  } catch (error) {
    console.error('Error fetching player data:', error);
    throw error;
  }
};

const fetchPlayerStats = async (playerID, year) => {
  try {
    const response = await axios.get(`http://api.balldontlie.io/v1/season_averages?season=${year}&player_ids[]=${playerID}`, {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
};

const fetchAllPlayerStats = async (playerID) => {
  const statsPromises = [];

  for (let i = 0; i <= 21; i++) {
    try {
      const statsPerYear = await fetchPlayerStats(playerID, (2023 - i));
      if (statsPerYear.length > 0) {
        statsPromises.push(statsPerYear);
      }
    } catch (error) {
      console.error('Error fetching all player stats:', error);
      throw error;
    }
  }

  try {
    const stats = await Promise.all(statsPromises);
    console.log('stats', stats);
    return stats;
  } catch (error) {
    console.error('Error fetching all player stats:', error);
    throw error;
  }
};

const fetchPlayerGameLog = async (playerID) => {
  let gamelog = [];

  for (let i = 1; i < 3; i++) {
    try {
      const response = await axios.get(`http://api.balldontlie.io/v1/stats?seasons[]=2023&player_ids[]=${playerID}&postseason=false&page=${i}`, {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json'
        }
      });
      gamelog = gamelog.concat(response.data.data);
    } catch (error) {
      console.error('Error fetching player game log:', error);
      throw error;
    }
  }

  return gamelog;
};

const fetchPlayerDetails = async (firstName, lastName) => {
  try {
    const response = await axios.get(`http://api.balldontlie.io/v1/json/3/searchplayers.php?p=${firstName}%20${lastName}`, {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    });
    if (!response.data.ok) {
      console.error(`Error: ${response.status}`);
      return null; // or handle the error accordingly
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching player details:', error);
    throw error;
  }
};

export default async (req, res) => {
  await playerRouter.run(req, res);
};



// import { createRouter } from 'next-connect';
// import cors from 'cors';

// const playerRouter = createRouter();

// // Enable CORS for the playerRouter
// // playerRouter.use(cors());

// playerRouter.get(async (req, res) => {
//   try {
//     const { firstName, lastName } = req.query;
//     const playerName = firstName + "_" + lastName;

//     if (playerName !== '_') {
//       const playerData = await fetchPlayerData(playerName);
//         // console.log("player data", playerData)
//       if (playerData) {
//         const { id: playerID } = playerData[0];
//         const stats = await fetchAllPlayerStats(playerID);
//         // console.log("stats", stats)
//         const gamelog = await fetchPlayerGameLog(playerID);
//         const details = await fetchPlayerDetails(firstName, lastName);
//         // console.log("details", details)

//         gamelog.sort((a, b) => Date.parse(a.game.date) - Date.parse(b.game.date));

//         if (details.player && details.player[0].strSport === 'Basketball') {
//           res.json({ stats, playerData, gamelog, details });
//         } else {
//           res.json({ stats, playerData, gamelog });
//         }
//       } else {
//         res.json({ error: 'Player not found' });
//       }
//     } else {
//       res.json({ error: 'Invalid player name' });
//     }
//   } catch (error) {
//     console.error('Error fetching player data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// const fetchPlayerData = async (playerName) => {
//   const response = await fetch(`http://api.balldontlie.io/v1/players?search=${playerName}`,{
//     headers:{
//         authorization: "8920cadb-f040-4b27-8823-ace24cd841fe"
//     }
//   });
//   const data = await response.json();
//   return data.data;
// };

// const fetchPlayerStats = async (playerID, year) => {
//   const response = await fetch(`http://api.balldontlie.io/v1/season_averages?season=${year}&player_ids[]=${playerID}`,{
//     headers:{
//         authorization: "8920cadb-f040-4b27-8823-ace24cd841fe"
//     }
//   });
//   const statsData = await response.json();
//   return statsData.data;
// };

// const fetchAllPlayerStats = async (playerID) => {
//     const statsPromises = [];

//     for (let i = 0; i <= 21; i++) {
//         const statsPerYear = await fetchPlayerStats(playerID, (2023 - i));
//         if (statsPerYear.length > 0) {
//             statsPromises.push(statsPerYear);
//         }
//     }

//     const stats = await Promise.all(statsPromises);

//     console.log('stats', stats);
//     return stats
// };


// const fetchPlayerGameLog = async (playerID) => {
//   let gamelog = [];

//   for (let i = 1; i < 3; i++) {
//     const response = await fetch(`http://api.balldontlie.io/v1/stats?seasons[]=2023&player_ids[]=${playerID}&postseason=false&page=${i}`,{
//         headers:{
//             authorization: "8920cadb-f040-4b27-8823-ace24cd841fe"
//         }
//       });
//     const gamelogData = await response.json();
//     gamelog = gamelog.concat(gamelogData.data);
//   }

//   return gamelog;
// };

// const fetchPlayerDetails = async (firstName, lastName) => {
//   const response = await fetch(`http://api.balldontlie.io/v1/json/3/searchplayers.php?p=${firstName}%20${lastName}`,{
//     headers:{
//         authorization: "8920cadb-f040-4b27-8823-ace24cd841fe"
//     }
//   });
//   if (!response.ok) {
//     console.error(`Error: ${response.status}`);
//     return null; // or handle the error accordingly
//   }
//   const details = await response.json();
//   return details;
// };

// export default async (req, res) => {
//   await playerRouter.run(req, res);
// };
