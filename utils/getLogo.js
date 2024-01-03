import teams from "@/teams"

export default function getTeamLogo(teamName){
  console.log(teamName)
    const team = teams.filter((team)=> team.teamName === teamName)
    console.log("team", team)
    return `/${team[0].teamLogo}`
  }