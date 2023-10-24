import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import "../app/app.css"


const BoxScore = () => {
    const [boxScore, setBoxScore] = useState([])
    const router = useRouter()
    const {gameID, homeTeam, awayTeam, date} = router.query

    useEffect(()=>{
        axios
    .get(`http://localhost:3000/api/getBoxScore?gameID=${gameID}&homeTeam=${homeTeam}&awayTeam=${awayTeam}&date=${date}`)
    .then((response) => {
    setBoxScore(response.data)
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    });
    },[date])
    console.log(boxScore)
  return (
    <div className='boxScore'>
        <h1 className='homeTeamName'>
            <a href={`/TeamDetails?teamName=${homeTeam}`}>
            {homeTeam}
            </a>
        </h1>
        {boxScore.teamOneArr&&
        <Table striped bordered className='homeTeam'>
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
        }
        <h1 className='awayTeamName'>
            <a href={`/TeamDetails?teamName=${awayTeam}`}>
            {awayTeam}
            </a>
        </h1>
        {boxScore.teamTwoArr&&
        <Table striped bordered className='awayTeam'>
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