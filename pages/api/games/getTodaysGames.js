import { createRouter } from 'next-connect';
import axios from 'axios';

const todaysGamesRouter = createRouter();

const apiKey = '34db4f41-8c29-4fef-940d-db01294f67cc';

function getCurrentDateInET() {
    const now = new Date();
    const etOffset = -5 * 60; // Eastern Time is UTC-5
    const etTime = new Date(now.getTime() + etOffset * 60 * 1000);
    return etTime;
}

todaysGamesRouter.get(async (req, res) => {
    let date = getCurrentDateInET();
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.toDateString(); // This line doesn't have an effect, it's missing the assignment.
    const yesterdayArr = yesterday.toDateString().split(' ');
    const yesterdaysDate = `${yesterdayArr[3]}-${yesterdayArr[1]}-${yesterdayArr[2]}`;
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    let todaysDate =  formatDate(date);
    
    try {
       
    axios.get(`http://api.balldontlie.io/v1/games?seasons[]=2023&dates[]=${todaysDate}`, {
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
    await todaysGamesRouter.run(req, res);
};
