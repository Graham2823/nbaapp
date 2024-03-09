import teams from "@/teams";

export default function getTeamLogo(teamName) {
  if (teamName) {
    // Remove "-ps" if present in the teamName (case-insensitive and whitespace-tolerant)
    const cleanTeamName = teamName.replace(/[\s-]*ps$/i, '');

    // Use case-insensitive comparison in the filter
    const team = teams.find((team) => team.teamName.toLowerCase() === cleanTeamName.toLowerCase());

    if (team) {
      return `/${team.teamLogo}`;
    } else {
      console.log('Team not found');
      // Handle the case where the team is not found
      // You might want to return a default logo or handle it in a way that fits your application
    }
  }
}
