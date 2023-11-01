import { createRouter } from 'next-connect';
import cors from 'cors'; // Import the cors middleware

const teamRouter = createRouter();

// // Set up CORS options
// const corsMiddleware = cors({
//   origin: ['http://localhost:3000', 'https://nbaapp.vercel.app'], // Replace with your local development URL
//   methods: ['GET'], // Allow only the HTTP methods you need
// });


// teamRouter.use(corsMiddleware);


teamRouter.get(async (req, res) => {
	const {teamName} = req.query
	console.log(teamName);
    let teamID
	await fetch(`https://www.balldontlie.io/api/v1/teams`)
		.then((res) => res.json())
		.then((teams) => {
			for (let i = 0; i < teams.data.length; i++) {
				if (teams.data[i].full_name === teamName) {
					teamID = teams.data[i].id;
				}
			}
		});
	let schedule = [];
	let wins = 0;
	let losses = 0;
	for (let i = 1; i < 5; i++) {
		await fetch(
			`https://www.balldontlie.io/api/v1/games?seasons[]=2023&team_ids[]=${teamID}&page=${i}`
		)
			.then((res) => res.json())
			.then((data) => {
				for (let i = 0; i < data.data.length; i++) {
					schedule.push(data.data[i]);
				}
			});
	}
    let western_conference = []
   let wcNumber = 1
   let eastern_conference = []
   let ecNumber = 1
   let wdivisions = []
   let edivisions = []
   let wc_teams = []
   let wcTeams
   let ec_teams = []
   let teams_full = []
   let team_info = []
        await fetch (`https://api.sportradar.us/nba/trial/v8/en/seasons/2023/REG/standings.json?api_key=ujcd47k6v4fdzvbbtpfatx63`)
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
                if(teams_full[i].market + " " + teams_full[i].name === teamName){
                    team_info.push(teams_full[i])
                }
            }
        })



	// console.log(Date.parse(schedule[81].date))
	schedule.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
	res.json({ schedule, teamName, team_info });
});

export default async (req, res) => {
    await teamRouter.run(req, res);
};
