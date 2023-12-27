import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware
import mongoose from 'mongoose';


const standingsRouter = createRouter();

// standingsRouter.get(async (req, res) =>{
//     let western_conference = []
//    let wcNumber = 1
//    let eastern_conference = []
//    let ecNumber = 1
//    let wdivisions = []
//    let edivisions = []
//    let wc_teams = []
//    let wcTeams
//    let ec_teams = []
//    let ec_full = []
//    let wc_full =[]
//     try{
//         fetch (`https://api.sportradar.us/nba/trial/v8/en/seasons/2023/REG/standings.json?api_key=qc3jvr8u7852z2s9u8hspz4s`)
//         .then(res => res.json())
//         .then((data)=>{
//             for(let i =0; i< data.conferences.length; i++){
//                 if(data.conferences[i].name === 'WESTERN CONFERENCE'){
//                     western_conference.push(data.conferences[i])
//                 } if(data.conferences[i].name === 'EASTERN CONFERENCE'){
//                     eastern_conference.push(data.conferences[i])
//                 }
//             }
//             for(let i=0; i< western_conference[0].divisions.length; i++){
//                 wdivisions.push(western_conference[0].divisions[i])
//             }
//             for(let i=0; i< eastern_conference[0].divisions.length; i++){
//                 edivisions.push(eastern_conference[0].divisions[i])
//             }
//             for(let i=0; i<wdivisions.length; i++){
//                 wc_teams.push(wdivisions[i].teams)  
//             }
//             for(let i=0; i<edivisions.length; i++){
//                 ec_teams.push(edivisions[i].teams);
//             }
//             for(let i=0; i< 3; i++){
//                 for(let j=0; j<wc_teams[i].length; j++){
//                     wc_full.push(wc_teams[i][j])
//                 }
//             }
//             for(let i=0; i< 3; i++){
//                 for(let j=0; j<ec_teams[i].length; j++){
//                     ec_full.push(ec_teams[i][j])
//                 }
//             }
//             wc_full.sort((a,b)=> a.calc_rank.conf_rank - b.calc_rank.conf_rank)
//             ec_full.sort((a,b)=> a.calc_rank.conf_rank - b.calc_rank.conf_rank)
//             console.log(western_conference)
//             res.json({wc_full, ec_full})
//         })
//     } catch(err){
//         console.log(err)
//     }
// })

// export default async (req, res) => {
//     await standingsRouter.run(req, res);
// };



//
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
