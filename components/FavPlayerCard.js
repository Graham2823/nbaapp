import React, { useState} from 'react'
import { Table, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

const FavPlayerCard = ({favoritePlayer}) => {
    const [playerDetails, setPlayerDetails] = useState(null)
    const [last5Games, setLast5Game] = useState(favoritePlayer.playerGamelog.slice(-5).reverse())
    const [showPlayerStats, setShowPlayerStats] = useState(true)
    const [showPlayerDetails, setShowPlayerDetails] = useState(false)
    const [showPlayerGamelog, setShowPlayerGamelog] = useState(false)
    const router = useRouter();
    
    console.log("faovirte plauer", favoritePlayer)

    const handleClickButton = (e) =>{
        if (e.target.name === 'playerStats'){
            setShowPlayerStats(true)
            setShowPlayerDetails(false)
            setShowPlayerGamelog(false)
        }else if(e.target.name === 'playerDetails'){
            setShowPlayerStats(false)
            setShowPlayerDetails(true)
            setShowPlayerGamelog(false)
        }else if(e.target.name === 'last5'){
            setShowPlayerStats(false)
            setShowPlayerDetails(false)
            setShowPlayerGamelog(true)
        }
    }
    return (
        <div>
            {favoritePlayer && (
      <Card className='favoritePlayerCard'>
        <div className='playerCardButtonContainer'>
        <Button className='playerCardButton' name='playerStats' onClick={(e)=>handleClickButton(e)}>Player Stats</Button>
        <Button className='playerCardButton' name='playerDetails' onClick={(e)=>handleClickButton(e)}>Player Details</Button>
        <Button className='playerCardButton' name='last5' onClick={(e)=>handleClickButton(e)}>Last 5 Games</Button>
        </div>
        <Table>
            <thead>
                <th colSpan={showPlayerGamelog ? 2.5 : 1}>{favoritePlayer.playerData[0].first_name} {favoritePlayer.playerData[0].last_name}</th>
                <th colSpan={showPlayerGamelog ? 2.5 : 1} onClick={()=>router.push(`/TeamDetails?teamName=${favoritePlayer.details.player[0].strTeam}`)}>{favoritePlayer.details.player[0].strTeam}</th>
            </thead>
        {showPlayerStats ? (
            <tbody>
        <tr>
            <td>Points:</td><td>{favoritePlayer.playerAverages[0][0].pts}</td>
            </tr>
            <tr>
            <td>Rebounds:</td><td>{favoritePlayer.playerAverages[0][0].reb}</td>
            </tr>
            <tr>
            <td>Assists:</td><td>{favoritePlayer.playerAverages[0][0].ast}</td>
            </tr>
            <tr>
            <td>Steals:</td><td>{favoritePlayer.playerAverages[0][0].stl}</td>
            </tr>
            <tr>
            <td>Blocks:</td><td>{favoritePlayer.playerAverages[0][0].blk}</td>
            </tr>
                </tbody>
            ): showPlayerDetails ? (
                <tbody>
                    <tr>
                        <td>Position:</td><td>{favoritePlayer.details.player[0].strPosition}</td>
                    </tr>
                    <tr><td>Height:</td><td>{favoritePlayer.playerData[0].height}</td></tr>
                    <tr><td>Weight:</td><td>{favoritePlayer.details.player[0].strWeight}</td></tr>
                    <tr><td>Number:</td><td>{favoritePlayer.playerData[0].jersey_number}</td></tr>
                    <tr><td>Nationality:</td><td>{favoritePlayer.details.player[0].strNationality}</td></tr>
                </tbody>
            ):(
                <tbody>
                    <tr><td>Points</td><td>Rebounds</td><td>Assists</td><td>Steals</td><td>Blocks</td></tr>
                    {last5Games && (
                        last5Games.map((game, key)=>(
                            <tr key={key}>
                                <td>{game.pts}</td>
                                <td>{game.reb}</td>
                                <td>{game.ast}</td>
                                <td>{game.stl}</td>
                                <td>{game.blk}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            )}
        </Table>
        <Button className="button" onClick={()=>router.push(`/PlayerDetails/?first=${playerDetails.playerData[0].first_name}&last=${playerDetails.playerData[0].last_name}`)}>View More</Button>
      </Card>
            )}
        </div>
      )
}

export default FavPlayerCard