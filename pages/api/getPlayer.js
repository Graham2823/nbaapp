import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware

const playerRouter = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });


// playerRouter.use(corsMiddleware);


playerRouter.get(async (req, res) =>{
    const { firstName, lastName } = req.query;
    const playerName = firstName + "_" + lastName
    console.log(playerName)
    let playerData=[]
    let stats=[]
    let gamelog=[]
    if (playerName != '_'){
        await fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
        .then(res => res.json())
        .then((data)=>{
            for(let i=0; i<data.data.length; i++){
                playerData.push(data.data[i])
            }
        })
        const playerID = playerData[0].id
        await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${playerID}`)
            .then(res => res.json())
            .then((statsData)=>{ 
                for(let i=0; i<statsData.data.length; i++){
                    stats.push(statsData.data[i])
                }
            })
            for(let i=1; i<3; i++){
               await fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=2023&player_ids[]=${playerID}&postseason=false&page=${i}`)
                .then(res => res.json())
                .then((gamelogData)=>{
                    for(let j=0; j<gamelogData.data.length; j++){
                        gamelog.push(gamelogData.data[j])
                    }
             })
            }
               await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${firstName}%20${lastName}`)
                .then(res => res.json())
                .then((details)=>{
                    console.log('details', details)
                    gamelog.sort((a,b)=> Date.parse(a.game.date) - Date.parse(b.game.date) );
                    // console.log(gamelog.length);
                    // res.send(JSON.stringify(gamelog));
                    if(details.player){
                        if(details.player[0].strSport === 'Basketball'){
                            res.json( {stats, playerData, gamelog, details});
                        }else{
                            res.json({stats, playerData, gamelog})
                        }
                    }else{
                        res.json({stats, playerData, gamelog})
                    }
                })
}
})

export default async (req, res) => {
    await playerRouter.run(req, res);
};