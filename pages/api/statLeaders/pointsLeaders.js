import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import Player from '@/models/playerSchema';
import mongoose from 'mongoose';

const pointLeaders = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'http://localhost:3000'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });


// playerRouter.use(corsMiddleware);
const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;

pointLeaders.get(async (req, res) =>{
    try {
        await mongoose.connect(mongoConnectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    
        const players = await Player.find({})
          .sort({ 'stats.points': -1 }) // Sort by assists in descending order
          .limit(20); // Limit to the top 20 players
    
        res.json(players);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
   });

export default async (req, res) => {
    await pointLeaders.run(req, res);
};