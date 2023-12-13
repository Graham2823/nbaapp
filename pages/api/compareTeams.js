import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware

const compareTeamsRouter = createRouter();

// Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });

// boxScoreRouter.use(corsMiddleware);

compareTeamsRouter.get(async (req, res) => {
	try {
        const {team1, team2} = req.query
        console.log(team1, team2)
        let teamID1
        let teamID2
        await fetch(`https://www.balldontlie.io/api/v1/teams`)
        .then(res => res.json())
        .then((teams)=>{
            for (let i=0; i<teams.data.length; i++){
                if(teams.data[i].full_name === team1){
                    teamID1 = teams.data[i].id
                }
            }
        })
        await fetch(`https://www.balldontlie.io/api/v1/teams`)
        .then(res => res.json())
        .then((teams)=>{
            for (let i=0; i<teams.data.length; i++){
                if(teams.data[i].full_name === team2){
                    teamID2 = teams.data[i].id
                }
            }
        })
        let western_conference = []
        let eastern_conference = []
        let wdivisions = []
        let edivisions = []
        let wc_teams = []
        let wcTeams
        let ec_teams = []
        let teams_full = []
        let team1_info = []
        let team2_info = []
        await fetch (`https://api.sportradar.us/nba/trial/v8/en/seasons/2023/REG/standings.json?api_key=qc3jvr8u7852z2s9u8hspz4s`)
             .then(res => res.json())
             .then((data)=>{
                 for(let i =0; i< data.conferences.length; i++){
                     if(data.conferences[i].name === 'WESTERN CONFERENCE'){
                         western_conference.push(data.conferences[i])
                     } if(data.conferences[i].name === 'EASTERN CONFERENCE'){
                         eastern_conference.push(data.conferences[i])
                     }
                 }
                 for(let i=0; i< western_conference[0].divisions.length; i++){
                     wdivisions.push(western_conference[0].divisions[i])
                 }
                 for(let i=0; i< eastern_conference[0].divisions.length; i++){
                     edivisions.push(eastern_conference[0].divisions[i])
                 }
                 for(let i=0; i<wdivisions.length; i++){
                     wc_teams.push(wdivisions[i].teams)  
                 }
                 for(let i=0; i<edivisions.length; i++){
                     ec_teams.push(edivisions[i].teams);
                 }
                 for(let i=0; i< 3; i++){
                     for(let j=0; j<wc_teams[i].length; j++){
                         teams_full.push(wc_teams[i][j])
                     }
                 }
                 for(let i=0; i< 3; i++){
                     for(let j=0; j<ec_teams[i].length; j++){
                         teams_full.push(ec_teams[i][j])
                     }
                 }
                 for(let i=0; i<teams_full.length; i++){
                     if(teams_full[i].market + " " + teams_full[i].name === team1){
                         team1_info.push(teams_full[i])
                     }
                     if(teams_full[i].market + " " + teams_full[i].name === team2){
                         team2_info.push(teams_full[i])
                     }
                 }
             })
             res.json({team1_info, team2_info});
	} catch (err) {
		console.log(err);
	}
});

export default async (req, res) => {
	await compareTeamsRouter.run(req, res);
};
