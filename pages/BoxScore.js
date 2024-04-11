import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Table, Spinner, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../app/app.css';
import teams from '@/teams';
import getTeamLogo from '@/utils/getLogo';
import { UserContext } from '@/context/userContext';
import RenderBoxScore from '@/components/RenderBoxScore';

const BoxScore = () => {
    const [boxScore, setBoxScore] = useState([]);
    const router = useRouter();
    const { gameID, homeTeam, homeScore, awayTeam, awayScore, date } = router.query;
    const [teamLogosandColors, setTeamLogosAndColors] = useState([]);
    const { favoritePlayers } = useContext(UserContext);

    useEffect(() => {
        if (date) {
            axios.get(
                `https://nbaapp.vercel.app/api/getBoxScore?homeTeam=${homeTeam}&awayTeam=${awayTeam}&date=${date}`,
                { timeout: 10000 }
            )
                .then((response) => {
                    setBoxScore(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            axios.get(
                `https://nbaapp.vercel.app/api/getBoxScore?homeTeam=${homeTeam}&awayTeam=${awayTeam}`,
                { timeout: 10000 }
            )
                .then((response) => {
                    setBoxScore(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }

        const teamsLogos = teams.filter(
            (team) => team.teamName === homeTeam || team.teamName === awayTeam
        );
        setTeamLogosAndColors(teamsLogos);
    }, [date, gameID, homeTeam, awayTeam]);

	console.log("boxScore", boxScore)

    return (
        <div className='boxScore'>
            {boxScore.length > 0 ? (
                <>
				<RenderBoxScore boxScore={boxScore[0].home_team.players} team={boxScore[0].home_team} score={homeScore}/>
				<RenderBoxScore boxScore={boxScore[0].visitor_team.players} team={boxScore[0].visitor_team} score={awayScore}/>
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
