import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware

const gamesRouter = createRouter();

// Set up CORS options
const corsMiddleware = cors({
  origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
  methods: ['GET'], // Allow only the HTTP methods you need
});


gamesRouter.use(corsMiddleware);

gamesRouter.get(async (req, res) => {
    let date = new Date();
    let todaysDate =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.toDateString; // This line doesn't have an effect, it's missing the assignment.
    const yesterdayArr = yesterday.toDateString().split(' ');
    const yesterdaysDate = `${yesterdayArr[3]}-${yesterdayArr[1]}-${yesterdayArr[2]}`;

    try {
        const tscoresResponse = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2023&start_date=${todaysDate}&end_date=${todaysDate}`);
        const yscoresResponse = await fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=2023&start_date=${yesterdaysDate}&end_date=${yesterdaysDate}`);
        const tscoresData = await tscoresResponse.json();
        const yscoresData = await yscoresResponse.json();
        
        const tscores = tscoresData.data;
        const yscores = yscoresData.data;
        
        if (tscores.length === 0 && yscores.length === 0) {
            res.status(404).json({ message: "Data is not available" });
            return;
        }
        if(yscores.length === 0){
            res.json({tscores})
            return
        }
        if(tscores.length === 0){
            res.json({yscores})
            return
        }
            res.json({ tscores, yscores });
        
    } catch (err) {
        console.log(err);
    }
});

export default async (req, res) => {
    await gamesRouter.run(req, res);
};
