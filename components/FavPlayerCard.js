import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

const FavPlayerCard = ({favoritePlayer}) => {
    const [playerDetails, setPlayerDetails] = useState(null)
    const router = useRouter();
    console.log(favoritePlayer)

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/getPlayer?firstName=${favoritePlayer.playerName.split(" ")[0]}&lastName=${favoritePlayer.playerName.split(" ")[1]}${favoritePlayer.playerName.split(" ")[2]? "%20"+ favoritePlayer.playerName.split(" ")[2] : ''}`)
            .then((response) => {
                setPlayerDetails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [favoritePlayer]);

    console.log(playerDetails)
    return (
        <div>
            {playerDetails && (
      <Card className='favoritePlayerCard'>
        <Table>
            <thead>
                <th>{playerDetails.playerData[0].first_name} {playerDetails.playerData[0].last_name}</th>
                <th>{playerDetails.details.player[0].strHeight}</th>
            </thead>
            <tbody>
        <tr>
            <td>Team:</td><td>{playerDetails.details.player[0].strTeam}</td>
            </tr>
        <tr>
            <td>Points:</td><td>{playerDetails.stats[0].pts}</td>
            </tr>
            <tr>
            <td>Rebounds:</td><td>{playerDetails.stats[0].reb}</td>
            </tr>
            <tr>
            <td>Assists:</td><td>{playerDetails.stats[0].ast}</td>
            </tr>
            <tr>
            <td>Steals:</td><td>{playerDetails.stats[0].stl}</td>
            </tr>
            <tr>
            <td>Blocks:</td><td>{playerDetails.stats[0].blk}</td>
            </tr>
            </tbody>
        </Table>
        <Button className="button" onClick={()=>router.push(`/PlayerDetails/?first=${playerDetails.playerData[0].first_name}&last=${playerDetails.playerData[0].last_name}`)}>View More</Button>
      </Card>
            )}
        </div>
      )
}

export default FavPlayerCard