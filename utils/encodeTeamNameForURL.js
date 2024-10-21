export default function encodeTeamNameForURL(teamName){
    // Replace various whitespace characters, including non-breaking space, with regular spaces
    const teamNameWithSpaces = teamName.replace(/\s+/g, ' ');
  
    // Encode the team name for the URL
    return encodeURIComponent(teamNameWithSpaces);
  };