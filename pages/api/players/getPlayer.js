import { createRouter } from 'next-connect';
import axios from 'axios';

const playerRouter = createRouter();

const apiKey = '34db4f41-8c29-4fef-940d-db01294f67cc';

playerRouter.get(async (req, res) => {
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
          timeout: 20000,
  headers: {
    Authorization: apiKey,
    'Content-Type': 'application/json'
  }
}).then((res) => res.data)
  .then((data) => {
    playerData = data.data
    playerID = data.data[0].id
  });
  let counter = 0;
  const requests = [];

for (let i = 0; i <= 21; i++) {
  requests.push(
    axios.get(`http://api.balldontlie.io/v1/season_averages?season=${2024 - i}&player_id=${playerID}`, {
      timeout: 60000,
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    }).then((res) => res.data)
  );
}

try {
  const results = await Promise.all(requests);

  // Process the results
  for (let i = 0; i <= 21; i++) {
    const data = results[i];

    
    if (data.data.length > 0) {
      playerAverages.push(data.data);
    } else {
      counter += 1;
    }

    if (counter === 3) {
      break; // Exit the loop if counter reaches 3
    }
  }

} catch (error) {
  console.error('Error fetching player data:', error.message);
  // Handle errors
}

  // for (let i = 0; i < 3; i++) {
    await axios.get(`http://api.balldontlie.io/v1/stats?seasons[]=2024&player_ids[]=${playerID}&postseason=false&per_page=100`, {
      timeout: 20000,
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
    await axios.get(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${firstName}_${lastName}`,{
      timeout: 20000,
    })
    .then((res) => res.data)
    .then((data) => {
      details = data
    });
  playerGamelog.sort((a, b) => Date.parse(a.game.date) - Date.parse(b.game.date));

  console.log("pa:",playerAverages, "pd:",playerData, "pg:",playerGamelog, "d:", details)
//  if(playerAverages.length > 0 && playerData.length > 0 && playerGamelog.length > 0 && details.player.length > 0){
//   res.json({playerData, playerAverages, playerGamelog, details})
// }else if(playerAverages.length > 0 && playerData.length > 0 && playerGamelog.length > 0){
//   res.json({playerAverages, playerData, playerGamelog})
// }else if(playerData.length > 0 && playerGamelog.length > 0){
//   res.json({playerData, playerGamelog})
// }else if(playerAverages.length > 0 && playerGamelog.length > 0){
//   res.json({playerAverages, playerGamelog})
// }else if(playerData){
//   res.json({playerData})
// }else{
//   res.json("Player Not Found")
// }
res.json({playerData, playerAverages, playerGamelog, details})
   }

 }
   catch (error) {
    console.error('Error fetching player data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default async (req, res) => {
  await playerRouter.run(req, res);
};

