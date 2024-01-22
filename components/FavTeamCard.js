import React, {useEffect, useState} from 'react'
import teams from '@/teams';
import { Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import getTeamLogo from '@/utils/getLogo';
import {Image} from 'react-bootstrap';

const FavTeamCard = ({favoriteTeam}) => {
    const [teamDetails, setTeamDetails] = useState()
    const [teamLogo, setTeamLogo] = useState()
    const router = useRouter()
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/getTeam?teamName=${favoriteTeam}`)
            .then((response) => {
                setTeamDetails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    
        const teamLogo = teams.filter((team) => team.teamName === favoriteTeam);
        setTeamLogo(teamLogo);
    }, [favoriteTeam]); // Add any dependencies that should trigger the effect when changed
    
    console.log(teamDetails)
    console.log(teamLogo)
  return (
    <div>
        {teamDetails && teamLogo && (
  <Card className='favoriteTeamCard'>
    <Table>
        <thead>
            <th><Image src={getTeamLogo(favoriteTeam)} alt='team logo' className='teamLogoFrontPage'/>{favoriteTeam}</th>
        </thead>
        <tbody>
    <tr>
        <td>Record:</td><td>{teamDetails.team[0].wins}-{teamDetails.team[0].losses}</td>
        </tr>
        <tr>
        <td>Conference Rank:</td><td>{teamDetails.team[0].rank}</td>
        </tr>
        <tr>
        <td>Conference Record:</td><td>{teamDetails.team[0].conferenceRecord}</td>
        </tr>
        <tr>
        <td>Division Record:</td><td>{teamDetails.team[0].divisionRecord}</td>
        </tr>
        <tr>
        <td>Streak:</td><td>{teamDetails.team[0].streak}</td>
        </tr>
        <tr>
        <td>Last Ten:</td><td>{teamDetails.team[0].lastTen}</td>
        </tr>
        <tr>
        <td>Overtime Record:</td><td>{teamDetails.team[0].otRecord}</td>
        </tr>
        </tbody>
    </Table>
    <Button className='button' onClick={()=>router.push(`/TeamDetails?teamName=${favoriteTeam}`)}>View More</Button>
  </Card>
        )}
    </div>
  )
}

export default FavTeamCard