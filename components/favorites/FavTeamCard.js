import React from 'react'
import { Card, Table, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import getTeamLogo from '@/utils/getLogo';
import {Image} from 'react-bootstrap';

const FavTeamCard = ({favoriteTeam}) => {
    const router = useRouter()
    
  return (
    <div>
        {favoriteTeam && (
  <Card className='favoriteTeamCard'>
    <Table>
        <thead>
            <th><Image src={getTeamLogo(favoriteTeam.teamName)} alt='team logo' className='teamLogoFrontPage'/>{favoriteTeam.teamName}</th>
        </thead>
        <tbody>
    <tr>
        <td>Record:</td><td>{favoriteTeam.team[0].wins}-{favoriteTeam.team[0].losses}</td>
        </tr>
        <tr>
        <td>Conference Rank:</td><td>{favoriteTeam.team[0].rank}</td>
        </tr>
        <tr>
        <td>Conference Record:</td><td>{favoriteTeam.team[0].conferenceRecord}</td>
        </tr>
        <tr>
        <td>Division Record:</td><td>{favoriteTeam.team[0].divisionRecord}</td>
        </tr>
        <tr>
        <td>Streak:</td><td>{favoriteTeam.team[0].streak}</td>
        </tr>
        <tr>
        <td>Last Ten:</td><td>{favoriteTeam.team[0].lastTen}</td>
        </tr>
        <tr>
        <td>Overtime Record:</td><td>{favoriteTeam.team[0].otRecord}</td>
        </tr>
        </tbody>
    </Table>
    <Button className='button' onClick={()=>router.push(`/team/TeamDetails?teamName=${favoriteTeam.teamName}`)}>View More</Button>
  </Card>
        )}
    </div>
  )
}

export default FavTeamCard