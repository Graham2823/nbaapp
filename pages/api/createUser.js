import { createRouter } from 'next-connect';
import mongoose from 'mongoose';

const User = require('../../models/userSchema');

const createUserRouter = createRouter();

// Connect to MongoDB at application startup
const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

createUserRouter.post(async (req, res) => {
    try {
        const { uid, username } = req.body;

        const newUser = new User({
            uid: uid,
            username: username,
        });

        const savedUser = await newUser.save();

        res.json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default async (req, res) => {
    await createUserRouter.run(req, res);
};
