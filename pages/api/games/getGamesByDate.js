import { createRouter } from 'next-connect';
import axios from 'axios';

const gamesByDate = createRouter();


gamesByDate.get(async (req, res) => {
    const date = req.query;
    console.log(date)
    try {
       
    axios.get(`http://api.balldontlie.io/v1/games?seasons[]=2024&dates[]=${date.date}`, {
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
    await gamesByDate.run(req, res);
};
