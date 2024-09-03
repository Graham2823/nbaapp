import React, {useContext} from 'react'
import { Table, Spinner, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import getTeamLogo from '@/utils/getLogo';
import { UserContext } from '@/context/userContext';
import User from '@/models/userSchema';
import '../app/app.css';


const RenderBoxScore = ({boxScore, team, score}) => {
    const {favoritePlayers} = useContext(UserContext)
    console.log("bs", boxScore)
    console.log("team", team)
    console.log("score", score)
  return (
    <div>
        {boxScore && team && score &&(
                        <h1 className='homeTeamName'>
                            <a href={`/team/TeamDetails?teamName=${team.full_name}`}>
                                <Image src={getTeamLogo(team.full_name)} alt='team logo' className='teamLogo' />
                                {team.full_name}:{score}
                            </a>
                        </h1>
                    )}
                    {boxScore && (
                        <div>
                            <Table striped bordered responsive='xl' className='boxScoreTable homeTeam'>
                                <thead>
                                    <tr>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {boxScore.map((player) => (
                                        <React.Fragment key={player.player.id}>
                                            {player.min > 0 && (
                                                <tr>
                                                    <td>
                                                        {player.player ? (
                                                            <a href={`/player/PlayerDetails/?first=${player.player.first_name}&last=${player.player.last_name}`}>
                                                                {player.player.first_name} {player.player.last_name}{' '}
                                                                {favoritePlayers.some((players) => players.playerName === `${player.player.first_name} ${player.player.last_name}`) && (
                                                                    <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
                                                                )}
                                                            </a>
                                                        ) : (
                                                            <p>Unknown Player</p>
                                                        )}
                                                    </td>
                                                    <td>{player.min}</td>
                                                    <td>{`${player.fgm}/${player.fga}`}</td>
                                                    <td>{`${player.ftm}/${player.fta}`}</td>
                                                    <td>{`${player.fg3m}/${player.fg3a}`}</td>
                                                    <td>{player.pts}</td>
                                                    <td>{player.reb}</td>
                                                    <td>{player.ast}</td>
                                                    <td>{player.stl}</td>
                                                    <td>{player.blk}</td>
                                                    <td>{player.pf}</td>
                                                    <td>{player.turnover}</td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
    </div>
  )
}

export default RenderBoxScore