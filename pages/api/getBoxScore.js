import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware

const boxScoreRouter = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });


// boxScoreRouter.use(corsMiddleware);


boxScoreRouter.get(async (req, res)=>{
        const {gameID, homeTeam, awayTeam, date} = req.query
        let Data = []
        let idArray = []
        let teamOneArr = []
        let teamTwoArr = []
        try{
        for(let i = 1; i < 3; i++){
        await fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameID}&start_date=${date}&end_date=${date}&page=${i}`)
        .then(res => res.json())
        .then((data)=>{
            for (let i = 0; i< data.data.length; i++) {
            if(!idArray.includes(data.data[i].id)){
                idArray.push(data.data[i].id)
                Data.push(data.data[i])
            }
            }
            const teamOne = Data[0].team.full_name
            for (let i = 0; i< Data.length; i++){
                if(Data[i].team.full_name === teamOne){
                    if(!teamOneArr.includes(Data[i])){
                    teamOneArr.push(Data[i])
                    }
                } else{
                    if(!teamTwoArr.includes(Data[i])){
                    teamTwoArr.push(Data[i])
                    }
                }
            }
        })
    }
        res.json({teamOneArr, teamTwoArr, homeTeam, awayTeam});
    } catch(err){
        console.log(err)
    }
})

export default async (req, res) => {
    await boxScoreRouter.run(req, res);
};

