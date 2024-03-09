import { createRouter } from 'next-connect';
import axios from 'axios';

const favoritePlayerRouter = createRouter();

const apiKey = '34db4f41-8c29-4fef-940d-db01294f67cc';

favoritePlayerRouter.get(async (req, res) => {
  try {
    const { firstName, lastName } = req.query;
    const playerName = firstName + "_" + lastName;
    let playerData = []
    let playerAverages = []
    let playerGamelog = []
    let details = []
    let playerID

    if (playerName !== '_') {
        await axios.get(`http://api.balldontlie.io/v1/players?first_name=${firstName}&last_name=${lastName}`, {
            timeout: 5000,
  headers: {
    Authorization: apiKey,
    'Content-Type': 'application/json'
  }
}).then((res) => res.data)
  .then((data) => {
    playerData = data.data
    playerID = data.data[0].id
  });
      await axios.get(`http://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerID}`, {
        timeout: 5000,
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    }).then((res) => res.data)
      .then((data) => {
          playerAverages.push(data.data)
      });
    
  
  // for (let i = 0; i < 3; i++) {
    await axios.get(`http://api.balldontlie.io/v1/stats?seasons[]=2023&player_ids[]=${playerID}&postseason=false&per_page=100`, {
        timeout: 5000,
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    }).then((res) => res.data)
      .then((data) => {
        // Concatenate the games to the existing playerGamelog array
        playerGamelog.push(...data.data);
      });
  // }
    await axios.get(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${firstName}_${lastName}`)
    .then((res) => res.data)
    .then((data) => {
     details = data
    });
  playerGamelog.sort((a, b) => Date.parse(a.game.date) - Date.parse(b.game.date));
 if(playerAverages.length > 0 && playerData.length > 0 && playerGamelog.length > 0 && details.player.length > 0){
  res.json({playerData, playerAverages, playerGamelog, details})
}else if(playerAverages.length > 0 && playerData.length > 0 && playerGamelog.length > 0){
  res.json({playerAverages, playerData, playerGamelog})
}else if(playerData.length > 0 && playerGamelog.length > 0){
  res.json({playerData, playerGamelog})
}else if(playerAverages.length > 0 && playerGamelog.length > 0){
  res.json({playerAverages, playerGamelog})
}else{
  res.json("Player Not Found")
}
   }

 }
   catch (error) {
    console.error('Error fetching player data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default async (req, res) => {
  await favoritePlayerRouter.run(req, res);
};

