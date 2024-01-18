import { createRouter } from 'next-connect';
import cors from 'cors';

const playerRouter = createRouter();

// Enable CORS for the playerRouter
// playerRouter.use(cors());

playerRouter.get(async (req, res) => {
  try {
    const { firstName, lastName } = req.query;
    const playerName = firstName + "_" + lastName;

    if (playerName !== '_') {
      const playerData = await fetchPlayerData(playerName);
        // console.log("player data", playerData)
      if (playerData) {
        const { id: playerID } = playerData[0];
        const stats = await fetchPlayerStats(playerID);
        // console.log("stats", stats)
        const gamelog = await fetchPlayerGameLog(playerID);
        const details = await fetchPlayerDetails(firstName, lastName);
        // console.log("details", details)

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
  const response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}`);
  const data = await response.json();
  return data.data;
};

const fetchPlayerStats = async (playerID) => {
  const response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${playerID}`);
  const statsData = await response.json();
  return statsData.data;
};

const fetchPlayerGameLog = async (playerID) => {
  let gamelog = [];

  for (let i = 1; i < 3; i++) {
    const response = await fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=2023&player_ids[]=${playerID}&postseason=false&page=${i}`);
    const gamelogData = await response.json();
    gamelog = gamelog.concat(gamelogData.data);
  }

  return gamelog;
};

const fetchPlayerDetails = async (firstName, lastName) => {
  const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${firstName}%20${lastName}`);
  if (!response.ok) {
    console.error(`Error: ${response.status}`);
    return null; // or handle the error accordingly
  }
  const details = await response.json();
  return details;
};

export default async (req, res) => {
  await playerRouter.run(req, res);
};
