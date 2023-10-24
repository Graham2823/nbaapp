import React,{useEffect, useState} from 'react'
import axios from 'axios'
import "../app/app.css"
import { useRouter } from 'next/router';
import convertTo12HourFormat from '@/utils/convertTime'


const TeamDetails = () => {
    const router = useRouter()
    const [teamDetails, setTeamDetails] = useState([])
    const [selectedTeam, setSelectedTeam] = useState("Atlanta Hawks")
    const { teamName} = router.query;

    const onsubmit = ()=>{
        const team = selectedTeam.split(" ")
        axios
			.get(
				`https://nbaapp.vercel.app/api/getTeam?teamName=${selectedTeam}`
			)
			.then((response) => {
                console.log(response.data)
				setTeamDetails(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
    }

    useEffect(() => {
		if (typeof window !== 'undefined') {
			// This code will only run on the client-side
			setTeamDetails([]);
		}
		if (teamName) {
            axios
			.get(
				`https://nbaapp.vercel.app/api/getTeam?teamName=${teamName}`
			)
			.then((response) => {
                console.log(response.data)
				setTeamDetails(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
		}
	}, [teamName]);
    
    console.log(selectedTeam)
  return (
    <div className='teamPage'>
        {teamDetails.length === 0 ?(
            <div className="teamSearch">
            <h3><label>Search Team:</label></h3>
            <select name="teamSelect" onChange={(e)=>setSelectedTeam(e.target.value)}>
                <option>
                    Atlanta Hawks
                </option>
                <option>
                    Boston Celtics
                </option>
                <option>
                    Brooklyn Nets
                </option>
                <option>
                    Charlotte Hornets
                </option>
                <option>
                    Chicago Bulls
                </option>
                <option>
                    Cleveland Cavaliers
                </option>
                <option>
                    Dallas Mavericks
                </option>
                <option>
                    Denver Nuggets
                </option>
                <option>
                    Detroit Pistons
                </option>
                <option>
                    Golden State Warriors
                </option>
                <option>
                    Houston Rockets
                </option>
                <option>
                    Indiana Pacers
                </option>
                <option>
                    LA Clippers
                </option>
                <option>
                    Los Angeles Lakers
                </option>
                <option>
                    Memphis Grizzlies
                </option>
                <option>
                    Miami Heat
                </option>
                <option>
                    Milwaukee Bucks
                </option>
                <option>
                    Minnesota Timberwolves
                </option>
                <option>
                    New Orleans Pelicans
                </option>
                <option>
                    New York Knicks
                </option>
                <option>
                    Oklahoma City Thunder
                </option>
                <option>
                    Orlando Magic
                </option>
                <option>
                    Philadelphia 76ers
                </option>
                <option>
                    Phoenix Suns
                </option>
                <option>
                    Portland Trail Blazers
                </option>
                <option>
                    Sacramento Kings
                </option>
                <option>
                    San Antonio Spurs
                </option>
                <option>
                    Toronto Raptors
                </option>
                <option>
                    Utah Jazz
                </option>
                <option>
                    Washington Wizards
                </option>
            </select>
            <button onClick={()=>onsubmit()}>Search</button>
            </div>
        ):(
            <div className='teamDetails'>
                <h2>{teamDetails.teamName}</h2>
                <h2>Team Schedule:</h2>
                <div className='teamSchedule'>

                {teamDetails.schedule.map((game, index)=>(
                     <div key={index} className="game">
                     <h3>{game.home_team.abbreviation}
                         {typeof game.home_team_score !== 'undefined' && game.home_team_score > 0 && (
                             game.home_team_score
                         )}
                     </h3>
                     <h3>VS</h3>
                     <h3>{game.visitor_team.abbreviation}
                         {typeof game.visitor_team_score !== 'undefined' && game.visitor_team_score > 0 && (
                             game.visitor_team_score
                         )}
                     </h3>
                     <h3 className="gameStatus">{convertTo12HourFormat(game.status, true)}</h3>
                     {game.home_team_score> 0 && game.visitor_team_score > 0 &&(
                       <p><a href={`/BoxScore?gameID=${game.id}&homeTeam=${game.home_team.full_name}&awayTeam=${game.visitor_team.full_name}&date=${game.date.split("T")[0]}`}><button>View Box Score</button></a></p>
                     )}
                 </div>
                ))}
                </div>
            </div>
        )}
        </div>
  )
}

export default TeamDetails