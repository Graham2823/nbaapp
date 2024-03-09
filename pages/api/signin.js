import { createRouter } from 'next-connect';
import mongoose from 'mongoose';
import User from '@/models/userSchema';

const signinRouter = createRouter();


signinRouter.get(async (req, res) => {
    try {
        const { uid } = req.query;
        const user = await User.findOne({ uid: uid });
        

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
