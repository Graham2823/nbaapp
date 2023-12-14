import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import Player from '@/models/playerSchema';
import mongoose from 'mongoose';

const findPlayersRouter = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;

findPlayersRouter.get(async (req, res) => {
    const {name} = req.query
    try{
        await mongoose.connect(mongoConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

        const players = await Player.find({});
        const filteredPlayers = players.filter((player)=> player.name.toLowerCase().startsWith(name.toLowerCase()) || player.name.toLowerCase().endsWith(name.toLowerCase()))
        const playersToDisplay = filteredPlayers.splice(0,5)

        // Send the response back to the client
        res.status(200).json({ playersToDisplay });
    } catch (err) {
        console.log(err);
    }
});

export default async (req, res) => {
    await findPlayersRouter.run(req, res);
};
