import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import Player from '@/models/playerSchema';
import mongoose from 'mongoose';
require('dotenv').config();


const topFiveLeaders = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'http://localhost:3000'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });


// playerRouter.use(corsMiddleware);
const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;

topFiveLeaders.get(async (req, res) =>{
  let leaders
    try {
        await mongoose.connect(mongoConnectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    
        const pointLeaders = await Player.find({})
          .sort({ 'stats.points': -1 }) 
          .limit(5);
        const assistLeaders = await Player.find({})
          .sort({ 'stats.assists': -1 }) 
          .limit(5);
        const reboundLeaders = await Player.find({})
          .sort({ 'stats.rebounds': -1 }) 
          .limit(5);
        const blockLeaders = await Player.find({})
          .sort({ 'stats.blocks': -1 }) 
          .limit(5);
        const stealLeaders = await Player.find({})
          .sort({ 'stats.steals': -1 }) 
          .limit(5);
        const turnoverLeaders = await Player.find({})
          .sort({ 'stats.turnovers': -1 }) 
          .limit(5);

          leaders = {
            pointLeaders: pointLeaders,
            assistLeaders: assistLeaders,
            reboundLeaders: reboundLeaders,
            blockLeaders: blockLeaders,
            stealLeaders: stealLeaders,
            turnoverLeaders: turnoverLeaders,

          }

    
        res.json(leaders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
   });

export default async (req, res) => {
    await topFiveLeaders.run(req, res);
};