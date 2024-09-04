import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import getTeamLogo from '@/utils/getLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '@/context/userContext';
import convertTo12HourFormat from '@/utils/convertTime';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RenderGames = ({ games, today }) => {
	const { username, favoriteTeams } = useContext(UserContext);
	const favoriteTeam = (teamName) => {
		if (favoriteTeams.some((team) => team.teamName === teamName)) {
			return (
				<FontAwesomeIcon
					icon={faStar}
					style={{ color: 'yellow' }}
					onClick={() => handleFavoriteTeam()}
				/>
			);
		}
	};

	console.log("games", games)
	return (
		<div className='todaysGames'>
			{games ? (
				games.map((game, index) => (
					<div key={index} className='game'>
						<h3>
							<a href={`/team/TeamDetails?teamName=${game.home_team.full_name}`}>
								<Image
									src={getTeamLogo(game.home_team.full_name)}
									alt='team logo'
									className='teamLogoFrontPage'
								/>
								{game.home_team.abbreviation}
							</a>
							{favoriteTeam(game.home_team.full_name)}
							{typeof game.home_team_score !== 'undefined' &&
								game.home_team_score > 0 && (
									<span>: {game.home_team_score}</span>
								)}
						</h3>
						<h3>VS</h3>
						<h3>
							<a href={`/team/TeamDetails?teamName=${game.visitor_team.full_name}`}>
								<Image
									src={getTeamLogo(game.visitor_team.full_name)}
									alt='team logo'
									className='teamLogoFrontPage'
								/>
								{game.visitor_team.abbreviation}
							</a>
							{favoriteTeam(game.visitor_team.full_name)}
							{typeof game.visitor_team_score !== 'undefined' &&
								game.visitor_team_score > 0 && (
									<span>: {game.visitor_team_score}</span>
								)}
						</h3>
						{game.home_team_score > 0 || game.visitor_team_score > 0 ? (
							<>
								<p>
									<h3 className='gameStatus'>{game.time}</h3>
								</p>
								<p>
									{today ? (
									<a
										href={`/boxScore/BoxScore?homeTeam=${game.home_team.full_name}&homeScore=${game.home_team_score}&awayTeam=${game.visitor_team.full_name}&awayScore=${game.visitor_team_score}`}>
										<Button className='buttonHome'>View Box Score</Button>
									</a>
									):(
									<a
										href={`/boxScore/BoxScore?homeTeam=${game.home_team.full_name}&homeScore=${game.home_team_score}&awayTeam=${game.visitor_team.full_name}&awayScore=${game.visitor_team_score}&date=${game.date}`}>
										<Button className='buttonHome'>View Box Score</Button>
									</a>
									)}
								</p>
							</>
						) : (
							<div>
								<h3 className='gameStatus'>
									{convertTo12HourFormat(game.status, true)}
								</h3>
								<a
									href={`/team/TeamDetails?team1=${game.home_team.full_name}&team2=${game.visitor_team.full_name}`}>
									<Button className='buttonHome'>Compare Teams</Button>
								</a>
							</div>
						)}
					</div>
				))
			) : (
				<h3>No Games Today</h3>
			)}
		</div>
	);
};

export default RenderGames;
