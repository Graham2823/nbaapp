import React, {useContext } from 'react';
import axios from 'axios';
import '../app/app.css';
import { Table, Image } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '@/context/userContext';
import RenderGames from '@/components/RenderGames';

const RenderTeamDetails = ({teamDetails, teamLogoAndColors}) => {
    const {favoriteTeams, setFavoriteTeams, user} = useContext(UserContext)
console.log(teamDetails)
    const handleFavoriteTeam = async() =>{
		try {
			const requestBody = {
				uid: user.uid,
				teamName: teamDetails.teamName
			}

			const response = await axios.post(
				`http://localhost:3000/api/favorites/addFavoriteTeam`,
				requestBody
			);

		   setFavoriteTeams(response.data.user.favoriteTeams)
		   localStorage.setItem('favoriteTeams', JSON.stringify(response.data.user.favoriteTeams))
		   if(response.data.user.favoriteTeams.some((teams)=> teams.teamName === teamDetails.teamName)){
			   toast.success("Team Added to Favorites!")
			}else{
				toast.success("Team Removed From Favorites!")
		   }
		} catch (error) {
				console.error('Error:', error);
		}
	}

  return (
    <div>
        <div
    className='teamDetails'
    style={{ backgroundColor: teamLogoAndColors[0].primaryColor }}>
        <ToastContainer />
    <h2>
        <Image
            src={teamLogoAndColors[0].teamLogo}
            alt='team logo'
            className='teamLogo'
        />
        {teamDetails.teamName}
        {favoriteTeams && favoriteTeams.some((team)=>team.teamName === teamDetails.teamName) ?(
            <FontAwesomeIcon icon={faStar} style={{color:'yellow', cursor:'pointer'}} onClick={()=> handleFavoriteTeam()}/>
            ):(
            <FontAwesomeIcon icon={faStar} style={{color:'#FFFFFF', cursor:'pointer'}} onClick={()=> handleFavoriteTeam()}/>
        )}
    </h2>
    <Table className='teamDetailsTable' striped='columns' responsive='xl'>
        <thead>
            <tr>
                <th>Confernece Rank</th>
                <th>Record</th>
                <th>Games Behind</th>
                <th>Streak</th>
                <th>Conference Record</th>
                <th>Division Record</th>
                <th>Home Record</th>
                <th>Away Record</th>
                <th>Last 10</th>
                <th>Overtime</th>
            </tr>
        </thead>
        <tbody>
            <tr class='teamInfoRow'>
                <td> {teamDetails.team[0].rank} </td>
                <td>
                    {' '}
                    {teamDetails.team[0].wins}-{teamDetails.team[0].losses}
                </td>
                <td> {teamDetails.team[0].gamesBehind} </td>
                <td> {teamDetails.team[0].streak} </td>
                <td>{teamDetails.team[0].conferenceRecord}</td>
                <td>{teamDetails.team[0].divisionRecord}</td>
                <td>{teamDetails.team[0].homeRecord}</td>
                <td>{teamDetails.team[0].awayRecord}</td>
                <td>{teamDetails.team[0].lastTen}</td>
                <td>{teamDetails.team[0].otRecord}</td>
            </tr>
        </tbody>
    </Table>
    <div
        className='teamSchedule'
        style={{ backgroundColor: teamLogoAndColors[0].secondaryColor }}>
            <RenderGames games={teamDetails.schedule} today={false}/>
    </div>
</div></div>
  )
}

export default RenderTeamDetails