const mongoose = require('mongoose');


mongoose.models = {}; // Clear existing models
const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    favoriteTeams:[
        {
            teamName: String
        }
    ],
    favoritePlayers:[
        {
            playerName: String
        }
    ]
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
