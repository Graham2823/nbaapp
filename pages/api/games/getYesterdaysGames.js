import { createRouter } from 'next-connect';
import axios from 'axios';

const yesterdaysGamesRouter = createRouter();

const apiKey = '34db4f41-8c29-4fef-940d-db01294f67cc';

function getCurrentDateInET() {
    const now = new Date();
    const etOffset = -5 * 60; // Eastern Time is UTC-5
    const etTime = new Date(now.getTime() + etOffset * 60 * 1000);
    return etTime;
}

yesterdaysGamesRouter.get(async (req, res) => {
    let date = getCurrentDateInET();
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    // No need for yesterday.toDateString(); as it doesn't modify the date object itself
    const yesterdaysDate = formatDate(yesterday);
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    let todaysDate =  formatDate(date);
    
    try {
       
    axios.get(`http://api.balldontlie.io/v1/games?seasons[]=2023&dates[]=${yesterdaysDate}`, {
        headers:{
          'Authorization': '34db4f41-8c29-4fef-940d-db01294f67cc',
          'Content-Type': 'application/json'
        }
      }).then((res)=> res.data)
        .then((data)=>{
          res.json(data)
        })
    
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
    
});

export default async (req, res) => {
    await yesterdaysGamesRouter.run(req, res);
};
