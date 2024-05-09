import { createRouter } from 'next-connect';
import mongoose from 'mongoose';
const User = require('../../models/userSchema');

const signinRouter = createRouter();

// Connect to MongoDB at application startup
const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


signinRouter.get(async (req, res) => {
    try {
        const { uid } = req.query;
        console.log(uid)
        const user = await User.findOne({ uid: uid });
        console.log(user)
        

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default async (req, res) => {
    await signinRouter.run(req, res);
};
