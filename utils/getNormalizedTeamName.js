export default function getNormalizedTeamName(teamName){
    // Replace various whitespace characters, including non-breaking space, with regular spaces
    return teamName.replace(/\s+/g, ' ');
  };