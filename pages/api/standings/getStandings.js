import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import mongoose from 'mongoose';


const standingsRouter = createRouter();

standingsRouter.get(async (req, res) => {
    try {
      const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
      await mongoose.connect(mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Access the Standings collection directly
      const standingsCollection = mongoose.connection.db.collection('standings');
  
      // Fetch all documents in the Standings collection
      const standingsData = await standingsCollection.find({}).toArray();
  
      // Respond with the fetched data
      res.json(standingsData);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  export default async (req, res) => {
    await standingsRouter.run(req, res);
  };
