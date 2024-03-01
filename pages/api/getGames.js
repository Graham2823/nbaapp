import { createRouter } from 'next-connect';
import axios from 'axios';

const gamesRouter = createRouter();

const apiKey = '34db4f41-8c29-4fef-940d-db01294f67cc';

function getCurrentDateInET() {
    const now = new Date();
    const etOffset = -5 * 60; // Eastern Time is UTC-5
    const etTime = new Date(now.getTime() + etOffset * 60 * 1000);
    return etTime;
}

gamesRouter.get(async (req, res) => {
    console.log("hit")
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
    console.log("todays date", todaysDate)
    console.log("todays date type", typeof todaysDate)
    
    try {
        const tscoresResponse = await axios.get(`http://api.balldontlie.io/v1/games?seasons[]=2023&dates[]=${todaysDate}`, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        })

        res.json(tscoresResponse)
    
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
    
});

export default async (req, res) => {
    await gamesRouter.run(req, res);
};





// import { createRouter } from 'next-connect';
// import cors from 'cors'; // Import the cors middleware
// import axios from 'axios';

// const gamesRouter = createRouter();

// // Set up CORS options
// // const corsMiddleware = cors({
// //   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
// //   methods: ['GET'], // Allow only the HTTP methods you need
// // });


// // gamesRouter.use(corsMiddleware);

// const apiKey = '8920cadb-f040-4b27-8823-ace24cd841fe'

// function getCurrentDateInET() {
//     const now = new Date();
//     const etOffset = -5 * 60; // Eastern Time is UTC-5
//     const etTime = new Date(now.getTime() + etOffset * 60 * 1000);
//     return etTime;
//   }

// gamesRouter.get(async (req, res) => {
//     console.log("hit")
//     let date = getCurrentDateInET();
//     const yesterday = new Date(date);
//     yesterday.setDate(yesterday.getDate() - 1);
//     yesterday.toDateString(); // This line doesn't have an effect, it's missing the assignment.
//     const yesterdayArr = yesterday.toDateString().split(' ');
//     const yesterdaysDate = `${yesterdayArr[3]}-${yesterdayArr[1]}-${yesterdayArr[2]}`;
//     function formatDate(date) {
//         const year = date.getFullYear();
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const day = date.getDate().toString().padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     }
//     let todaysDate =  formatDate(date);
//     console.log("todays date", todaysDate)
//     console.log("todays date type", typeof todaysDate)
    
//     try {
//         console.log("Start of try catch")
        
//         const tscoresResponse = axios.get(`http://api.balldontlie.io/v1/games?seasons[]=2023&dates[]=${todaysDate}`, {
//             headers:{
//               'Authorization': '34db4f41-8c29-4fef-940d-db01294f67cc',
//               'Content-Type': 'application/json'
//             }
//           }).then((res)=> res.data)


        
//         const yscoresResponse = axios.get(`http://api.balldontlie.io/v1/games?seasons[]=2023&dates[]=${todaysDate}`, {
//             headers:{
//               'Authorization': '34db4f41-8c29-4fef-940d-db01294f67cc',
//               'Content-Type': 'application/json'
//             }
//           }).then((res)=> res.data)

        
        // const tscoresData = await tscoresResponse.json();
        // console.log("tscores,", tscores)
        // const yscoresData = await yscoresResponse.json();
    
    //     const tscores = tscoresResponse.data || [];
    //     const yscores = yscoresResponse.data || [];
    
    //     if (tscores.length === 0 && yscores.length === 0) {
    //         res.status(404).json({ message: "Data is not available" });
    //         return;
    //     }
    
    //     if (yscores.length === 0) {
    //         res.json({ tscores });
    //         return;
    //     }
    
    //     if (tscores.length === 0) {
    //         res.json({ yscores });
    //         return;
    //     }
    // console.log(tscoresData)
        // res.json({ tscoresResponse, yscoresResponse });
    
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Internal server error" });
//     }
    
// });

// export default async (req, res) => {
//     await gamesRouter.run(req, res);
// };
