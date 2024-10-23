import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table, Spinner, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../../app/app.css';
import teams from '@/teams';
import getTeamLogo from '@/utils/getLogo';
import { UserContext } from '@/context/userContext';
import RenderBoxScore from '@/components/boxScore/RenderBoxScore';

const BoxScore = () => {
    const [boxScore, setBoxScore] = useState([]);
    const router = useRouter();
    const { gameID, homeTeam, homeTeamID, homeScore, awayTeam, awayTeamID, awayScore } = router.query;
    const [teamLogosandColors, setTeamLogosAndColors] = useState([]);


    useEffect(() => {
            axios.get(
                `https://nbaapp.vercel.app/api/boxScore/getBoxScore?homeTeamID=${homeTeamID}&awayTeamID=${awayTeamID}&gameID=${gameID}`,
                { timeout: 10000 }
            )
                .then((response) => {
                    setBoxScore(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
    

        const teamsLogos = teams.filter(
            (team) => team.teamName === homeTeam || team.teamName === awayTeam
        );
        setTeamLogosAndColors(teamsLogos);
    }, [ gameID, homeTeamID, awayTeamID]);


    return (
        <div className='boxScore'>
            {boxScore.homeTeamBoxScore && boxScore.awayTeamBoxScore ? (
                <>
				<RenderBoxScore boxScore={boxScore.homeTeamBoxScore} team={homeTeam} score={homeScore}/>
				<RenderBoxScore boxScore={boxScore.awayTeamBoxScore} team={awayTeam} score={awayScore}/>
                </>
            ) : (
				<>
				<h1 style={{ textAlign: 'center' }}>Loading</h1>
                <Spinner animation='border' variant='primary' />
				</>
            )}
        </div>
    );
};

export default BoxScore;
