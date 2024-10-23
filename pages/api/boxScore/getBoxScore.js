import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import axios from 'axios';

const boxScoreRouter = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'http://localhost:3000'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });

// boxScoreRouter.use(corsMiddleware);

boxScoreRouter.get(async (req, res) => {
  const { homeTeamID, awayTeamID, gameID } = req.query;


  const homeTeamBoxScore = [];
  const awayTeamBoxScore = [];

  try {
    // Fetch home team players
    const homePlayersResponse = await axios.get(
      `https://api.balldontlie.io/v1/players/active?per_page=100&team_ids[]=${homeTeamID}`,
      {
        headers: {
          Authorization: '34db4f41-8c29-4fef-940d-db01294f67cc',
          'Content-Type': 'application/json',
        },
        timeout: 20000,
      }
    );

    // Fetch game stats for all home players concurrently
    const homePlayerStatsPromises = homePlayersResponse.data.data.map((player) =>
      axios.get(
        `http://api.balldontlie.io/v1/stats?seasons[]=2024&player_ids[]=${player.id}&postseason=false&game_ids[]=${gameID}`,
        {
          headers: {
            Authorization: '34db4f41-8c29-4fef-940d-db01294f67cc',
            'Content-Type': 'application/json',
          },
          timeout: 20000,
        }
      )
    );

    // Await all the requests together
    const homePlayerStatsResponses = await Promise.all(homePlayerStatsPromises);

    // Push each player's game stats to homeTeamBoxScore
    homePlayerStatsResponses.forEach((response) => {
      const gameStats = response.data.data;
      if (gameStats && gameStats.length > 0) {
        homeTeamBoxScore.push(...gameStats);
      }
    });



    // Fetch away team players
    const awayPlayersResponse = await axios.get(
      `https://api.balldontlie.io/v1/players/active?per_page=100&team_ids[]=${awayTeamID}`,
      {
        headers: {
          Authorization: '34db4f41-8c29-4fef-940d-db01294f67cc',
          'Content-Type': 'application/json',
        },
        timeout: 20000,
      }
    );

    // Fetch game stats for all away players concurrently
    const awayPlayerStatsPromises = awayPlayersResponse.data.data.map((player) =>
      axios.get(
        `http://api.balldontlie.io/v1/stats?seasons[]=2024&player_ids[]=${player.id}&postseason=false&game_ids[]=${gameID}`,
        {
          headers: {
            Authorization: '34db4f41-8c29-4fef-940d-db01294f67cc',
            'Content-Type': 'application/json',
          },
          timeout: 20000,
        }
      )
    );

    // Await all the requests together
    const awayPlayerStatsResponses = await Promise.all(awayPlayerStatsPromises);

    // Push each player's game stats to awayTeamBoxScore
    awayPlayerStatsResponses.forEach((response) => {
      const gameStats = response.data.data;
      if (gameStats && gameStats.length > 0) {
        awayTeamBoxScore.push(...gameStats);
      }
    });



    // If both box scores have data, return the response
    if (homeTeamBoxScore.length > 0 && awayTeamBoxScore.length > 0) {
      return res.status(200).json({ homeTeamBoxScore, awayTeamBoxScore });
    } else {
      return res.status(404).json({ message: 'Box score data not found for the specified game.' });
    }

  } catch (error) {
    console.error("Error fetching box scores:", error);
    return res.status(500).json({ message: 'An error occurred while fetching box scores.' });
  }
});

export default async (req, res) => {
  await boxScoreRouter.run(req, res);
};



// boxScoreRouter.get(async (req, res)=>{
//         const {homeTeam, awayTeam, date} = req.query
//         console.log(homeTeam)
//         console.log(awayTeam)
//         console.log(date)
//         try {
//        if(date){
//            console.log("check 1")
//            axios.get(`https://api.balldontlie.io/v1/box_scores?date=${date}`, {
//                headers:{
//                  'Authorization': '34db4f41-8c29-4fef-940d-db01294f67cc',
//                  'Content-Type': 'application/json'
//                }
//              }).then((res)=> res.data)
//                .then((data)=>{
//                 console.log("check 2")
//                 const game = data.data.filter((game)=> game.home_team.full_name === homeTeam && game.visitor_team.full_name === awayTeam)
//                 console.log("game", game)
//                 if(game){
//                     res.json(game)
//                 }else{
//                     res.json("No Games Found")
//                 }
//             })
//         }else{
//            console.log("check 3")
//            axios.get(`https://api.balldontlie.io/v1/box_scores/live`, {
//                headers:{
//                  'Authorization': '34db4f41-8c29-4fef-940d-db01294f67cc',
//                  'Content-Type': 'application/json'
//                }
//              }).then((res)=> res.data)
//                .then((data)=>{
//                  const game = data.data.filter((game)=> game.home_team.full_name === homeTeam && game.visitor_team.full_name === awayTeam)
//                  console.log("game", game)
//                  if(game){
//                    res.json(game)
//                  }else{
//                    res.json("No Games Found")
//                  }
//                })

//     }

//             } catch (err) {
//                 console.log(err);
//                 res.status(500).json({ message: "Internal server error" });
//             }
// })

// export default async (req, res) => {
//     await boxScoreRouter.run(req, res);
// };

// boxScoreRouter.get(async (req, res)=>{
//         const {gameID, homeTeam, awayTeam, date} = req.query
//         let Data = []
//         let idArray = []
//         let teamOneArr = []
//         let teamTwoArr = []
//         try{
//         for(let i = 1; i < 3; i++){
//         await fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameID}&start_date=${date}&end_date=${date}&page=${i}`)
//         .then(res => res.json())
//         .then((data)=>{
//             for (let i = 0; i< data.data.length; i++) {
//             if(!idArray.includes(data.data[i].id)){
//                 idArray.push(data.data[i].id)
//                 Data.push(data.data[i])
//             }
//             }
//             const teamOne = Data[0].team.full_name
//             for (let i = 0; i< Data.length; i++){
//                 if(Data[i].team.full_name === teamOne){
//                     if(!teamOneArr.includes(Data[i])){
//                     teamOneArr.push(Data[i])
//                     }
//                 } else{
//                     if(!teamTwoArr.includes(Data[i])){
//                     teamTwoArr.push(Data[i])
//                     }
//                 }
//             }
//         })
//     }
//         res.json({teamOneArr, teamTwoArr, homeTeam, awayTeam});
//     } catch(err){
//         console.log(err)
//     }
// })

// export default async (req, res) => {
//     await boxScoreRouter.run(req, res);
// };
