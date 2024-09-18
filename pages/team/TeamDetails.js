import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../../app/app.css';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import teams from '../../teams';
import {Spinner} from 'react-bootstrap';
import RenderTeamDetails from '@/components/team/RenderTeamDetails';
import RenderCompareTeams from '@/components/compare/RenderCompareTeams';


const TeamDetails = () => {
	const router = useRouter();
	const [teamDetails, setTeamDetails] = useState([]);
	const [teamLogoAndColors, setTeamLogoAndColors] = useState();
	const [team1Info, setTeam1Info] = useState([]);
	const [team2Info, setTeam2Info] = useState([]);
	const [teamCompareLogos, setTeamCompareLogos] = useState();
	const { teamName, team1, team2 } = router.query;

	console.log("teams", teams)
	useEffect(() => {
		if (teamName) {
			axios
				.get(`https://nbaapp.vercel.app/api/team/getTeam?teamName=${teamName}`)
				.then((response) => {
					setTeamDetails(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
			const teamLogo = teams.filter((team) => team.teamName === teamName);
			console.log("team logo", teamLogo)
			setTeamLogoAndColors(teamLogo);
		}
		if (team1 && team2) {
			axios
				.get(
					`https://nbaapp.vercel.app/api/compare/compareTeams?team1=${team1}&team2=${team2}`
				)
				.then((response) => {
					setTeam1Info(response.data.teamOne);
					setTeam2Info(response.data.teamTwo);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
			const teamLogos = teams.filter(
				(team) => team.teamName === team1 || team.teamName === team2
			);
			setTeamCompareLogos(teamLogos);
		}
	}, [teamName, team1, team2]);

	return (
		<div className='teamPage'>
			{teamDetails.team ? (
				<RenderTeamDetails teamDetails={teamDetails} teamLogoAndColors={teamLogoAndColors}/>
			) : team1Info.length > 0 && team2Info.length > 0 ? (
				<RenderCompareTeams team1={team1} team1Info={team1Info} team2={team2} team2Info={team2Info} teamCompareLogos={teamCompareLogos}/>
			) : (
				<div>
					<h1 style={{ textAlign: 'center' }}>Loading</h1>
					<Spinner animation="border" variant="primary"/>
				</div>
				
			)}
		</div>
	);
};

export default TeamDetails;
