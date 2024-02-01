import teams from "@/teams"

export default function getTeamLogo(teamName){
    const team = teams.filter((team)=> team.teamName === teamName)
    return `/${team[0].teamLogo}`
  }