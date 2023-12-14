import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import "../app/app.css"
import teams from '@/teams';
import {Image} from 'react-bootstrap';
import getTeamLogo from "@/utils/getLogo"


const BoxScore = () => {
    const [boxScore, setBoxScore] = useState([])
    const router = useRouter()
    const {gameID, homeTeam, homeScore, awayTeam, awayScore, date} = router.query
    const [teamLogosandColors , setTeamLogosAndColors] = useState([])

    useEffect(()=>{
        axios
    .get(`https://nbaapp.vercel.app/api/getBoxScore?gameID=${gameID}&homeTeam=${homeTeam}&awayTeam=${awayTeam}&date=${date}`)
    .then((response) => {
    setBoxScore(response.data)
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    });
    const teamsLogos = teams.filter((team)=> team.teamName === homeTeam || team.teamName === awayTeam)
    setTeamLogosAndColors(teamsLogos)
    },[date])
   console.log(boxScore)
  return (
    <div className='boxScore'>
        {boxScore.teamOneArr&&
        <h1 className='homeTeamName'>
            <a href={`/TeamDetails?teamName=${boxScore.teamOneArr[0].team.full_name}`}>
            <Image src={getTeamLogo(boxScore.teamOneArr[0].team.full_name)} alt='team logo' className='teamLogo'/>{boxScore.teamOneArr[0].team.full_name}:{homeScore}
            </a>
        </h1>
        }
        {boxScore.teamOneArr&&
        <div className='table-responsive'>
        <Table striped bordered className='boxScoreTable homeTeam'>
            <thead>
            <th>Player Name</th>
            <th>Minutes Played</th>
            <th>FG</th>
            <th>FT</th>
            <th>3PT</th>
            <th>Points</th>
            <th>Rebounds</th>
            <th>Assists</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>Fouls</th>
            <th>Turnovers</th>
            </thead>
            <tbody>
                {boxScore.teamOneArr.map((player)=>(
                <>
                {player.min > 0 &&
                
                    <tr>
                        <td>
                            <a href={`/PlayerDetails/?first=${player.player.first_name}&last=${player.player.last_name}`}>{player.player.first_name} {player.player.last_name}</a>
                        </td>
                        <td>
                            {player.min}
                        </td>
                        <td>
                            {player.fgm}/{player.fga}
                        </td>
                        <td>
                            {player.ftm}/{player.fta}
                        </td>
                        <td>
                            {player.fg3m}/{player.fg3a}
                        </td>
                        <td>{player.pts}</td>
                        <td>{player.reb}</td>
                        <td>{player.ast}</td>
                        <td>{player.stl}</td>
                        <td>{player.blk}</td>
                        <td>{player.pf}</td>
                        <td>{player.turnover}</td>
            
                    </tr>
                }
                </>
                ))}
            </tbody>
        </Table>
        </div>
        }
        {boxScore.teamTwoArr &&
        <h1 className='awayTeamName'>
            <a href={`/TeamDetails?teamName=${boxScore.teamTwoArr[0].team.full_name}`}>
            <Image src={getTeamLogo(boxScore.teamTwoArr[0].team.full_name)} alt='team logo' className='teamLogo'/>{boxScore.teamTwoArr[0].team.full_name}:{awayScore}
            </a>
        </h1>
        }
        {boxScore.teamTwoArr&&
        <Table striped bordered className='boxScoreTable awayTeam'>
            <thead>
            <th>Player Name</th>
            <th>Minutes Played</th>
            <th>FG</th>
            <th>FT</th>
            <th>3PT</th>
            <th>Points</th>
            <th>Rebounds</th>
            <th>Assists</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>Fouls</th>
            <th>Turnovers</th>
            </thead>
            <tbody>
                {boxScore.teamTwoArr.map((player)=>(
                <>
                {player.min > 0 && 
                    <tr>
                        <td>
                            <a href={`/PlayerDetails/?first=${player.player.first_name}&last=${player.player.last_name}`}>
                            {player.player.first_name} {player.player.last_name}
                            </a>
                        </td>
                        <td>
                            {player.min}
                        </td>
                        <td>
                            {player.fgm}/{player.fga}
                        </td>
                        <td>
                            {player.ftm}/{player.fta}
                        </td>
                        <td>
                            {player.fg3m}/{player.fg3a}
                        </td>
                        <td>{player.pts}</td>
                        <td>{player.reb}</td>
                        <td>{player.ast}</td>
                        <td>{player.stl}</td>
                        <td>{player.blk}</td>
                        <td>{player.pf}</td>
                        <td>{player.turnover}</td>
            
                    </tr>
                }
                </>
                ))}
            </tbody>
        </Table>
        }
    </div>
  )
}

export default BoxScore