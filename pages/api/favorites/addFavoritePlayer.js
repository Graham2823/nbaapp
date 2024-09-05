import { createRouter } from 'next-connect';
import User from '@/models/userSchema';

const addFavoritePlayerRouter = createRouter();

addFavoritePlayerRouter.post(async (req, res) => {
    try {
        const { uid, playerName } = req.body;
        const user = await User.findOne({ uid: uid });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const teamIndex = user.favoritePlayers.findIndex(player => player.playerName === playerName);

        if (teamIndex !== -1) {
            // If the team already exists, remove it from the favoriteTeams array
            user.favoritePlayers.splice(teamIndex, 1);
        } else {
            // If the team doesn't exist, add it to the favoriteTeams array
            user.favoritePlayers.push({ playerName });
        }

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'Operation completed successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default async (req, res) => {
    await addFavoritePlayerRouter.run(req, res);
};
