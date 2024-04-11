import React from 'react';
import '../app/app.css';
import { Table, Image } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

const RenderCompareTeams = ({team1, team1Info, team2, team2Info, teamCompareLogos}) => {

    const winPercentageFromRecord = (record) => {
		const [wins, losses] = record.split('-').map(Number);

		if (wins === 0 && losses === 0) {
			return 0;
		}

		const totalGames = wins + losses;
		return wins / totalGames;
	};
	const getNormalizedTeamName = (teamName) => {
		// Replace various whitespace characters, including non-breaking space, with regular spaces
		return teamName.replace(/\s+/g, ' ');
	};


	const winStreakStyle = (streak1, streak2)=>{
		if(streak1.slice(0,1) === "W" && streak2.slice(0,1) === "L"){
			return 'green'
		}else if(streak1.slice(0,1) === "L" && streak2.slice(0,1) === "W"){
			return 'red'
		}else if(streak1.slice(0,1) === "W" && streak2.slice(0,1) === "W"){
			if(streak1.slice(1) > streak2.slice(1)){
				return 'green'
			}else if(streak1.slice(1) < streak2.slice(1)){
				return 'red'
			}
		}else if(streak1.slice(0,1) === "L" && streak2.slice(0,1) === "L"){
			if(streak1.slice(1) < streak2.slice(1)){
				return 'green'
			}else if(streak1.slice(1) > streak2.slice(1)){
				return 'red'
			}
		}
		return 'green'
		
	}

  return (
    <div><div>
    <h1 style={{ textAlign: 'center' }}>Teams</h1>
    <Table striped='rows' responsive='xl' className='compareTeamsTable'>
        <thead>
            <tr>
                <th></th>
                <th>
                    <a href={`/TeamDetails?teamName=${team1}`}>
                        <Image
                            src={
                                teamCompareLogos[0].teamName ===
                                getNormalizedTeamName(team1Info[0].team)
                                    ? teamCompareLogos[0].teamLogo
                                    : teamCompareLogos[1].teamLogo
                            }
                            alt='team logo'
                            className='teamLogo'
                        />
                        {team1Info[0].name}
                    </a>
                </th>
                <th>
                    <a href={`/TeamDetails?teamName=${team2}`}>
                        <Image
                            src={
                                teamCompareLogos[1].teamName ===
                                getNormalizedTeamName(team2Info[0].team)
                                    ? teamCompareLogos[1].teamLogo
                                    : teamCompareLogos[0].teamLogo
                            }
                            alt='team logo'
                            className='teamLogo'
                        />
                        {team2Info[0].name}
                    </a>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>Conference Rank</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            parseInt(team1Info[0].rank) < parseInt(team2Info[0].rank)
                                ? 'green'
                                : 'red',
                    }}>
                    {team1Info[0].rank}
                </td>
                <td
                    style={{
                        backgroundColor:
                            parseInt(team2Info[0].rank) < parseInt(team1Info[0].rank)
                                ? 'green'
                                : 'red',
                    }}>
                    {team2Info[0].rank}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Record</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(
                                `${team1Info[0].wins}-${team1Info[0].losses}`
                            ) <
                            winPercentageFromRecord(
                                `${team2Info[0].wins}-${team2Info[0].losses}`
                            )
                                ? 'red'
                                : 'green',
                    }}>
                    {team1Info[0].wins} - {team1Info[0].losses}
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(
                                `${team2Info[0].wins}-${team2Info[0].losses}`
                            ) <
                            winPercentageFromRecord(
                                `${team1Info[0].wins}-${team1Info[0].losses}`
                            )
                                ? 'red'
                                : 'green',
                    }}>
                    {team2Info[0].wins} - {team2Info[0].losses}
                </td>
            </tr>

            <tr>
                <td>
                    <strong>Games Behind</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            team2Info[0].gamesBehind === "--" ? 'red':
                            team1Info[0].gamesBehind < team2Info[0].gamesBehind || team1Info[0].gamesBehind === "--"
                                ? 'green'
                                : 'red',
                    }}>
                    {team1Info[0].gamesBehind}
                </td>
                <td
                    style={{
                        backgroundColor:
                            team1Info[0].gamesBehind === "--"? 'red':
                            team2Info[0].gamesBehind < team1Info[0].gamesBehind || team2Info[0].gamesBehind === "--"
                                ? 'green'
                                : 'red',
                    }}>
                    {team2Info[0].gamesBehind}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Streak</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            winStreakStyle(team1Info[0].streak, team2Info[0].streak)
                    }}
                    >
                    {team1Info[0].streak}
                </td>
                <td
                    style={{
                        backgroundColor:
                            winStreakStyle(team2Info[0].streak, team1Info[0].streak)
                    }}
                    >
                    {team2Info[0].streak}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Conference Record</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team1Info[0].conferenceRecord) <
                            winPercentageFromRecord(team2Info[0].conferenceRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team1Info[0].conferenceRecord}
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team2Info[0].conferenceRecord) <
                            winPercentageFromRecord(team1Info[0].conferenceRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team2Info[0].conferenceRecord}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Division Record</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team1Info[0].divisionRecord) <
                            winPercentageFromRecord(team2Info[0].divisionRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team1Info[0].divisionRecord}
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team2Info[0].divisionRecord) <
                            winPercentageFromRecord(team1Info[0].divisionRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team2Info[0].divisionRecord}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Home Record</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team1Info[0].homeRecord) <
                            winPercentageFromRecord(team2Info[0].homeRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team1Info[0].homeRecord}
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team2Info[0].homeRecord) <
                            winPercentageFromRecord(team1Info[0].homeRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team2Info[0].homeRecord}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Away Record</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team1Info[0].awayRecord) <
                            winPercentageFromRecord(team2Info[0].awayRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team1Info[0].awayRecord}
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team2Info[0].awayRecord) <
                            winPercentageFromRecord(team1Info[0].awayRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team2Info[0].awayRecord}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>last 10</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team1Info[0].lastTen) <
                            winPercentageFromRecord(team2Info[0].lastTen)
                                ? 'red'
                                : 'green',
                    }}>
                    {team1Info[0].lastTen}
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team2Info[0].lastTen) <
                            winPercentageFromRecord(team1Info[0].lastTen)
                                ? 'red'
                                : 'green',
                    }}>
                    {team2Info[0].lastTen}
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Overtime</strong>
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team1Info[0].otRecord) <
                            winPercentageFromRecord(team2Info[0].otRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team1Info[0].otRecord}
                </td>
                <td
                    style={{
                        backgroundColor:
                            winPercentageFromRecord(team2Info[0].otRecord) <
                            winPercentageFromRecord(team1Info[0].otRecord)
                                ? 'red'
                                : 'green',
                    }}>
                    {team2Info[0].otRecord}
                </td>
            </tr>
        </tbody>
    </Table>
</div></div>
  )
}

export default RenderCompareTeams