import React, { useContext, useState, useEffect } from 'react';
import FavTeamCard from '@/components/FavTeamCard';
import { Button, Spinner } from 'react-bootstrap';
import { UserContext } from '@/context/userContext';
import FavPlayerCard from '@/components/FavPlayerCard';
import axios from 'axios';

const ProfilePage = () => {
  const { favoritePlayers, favoriteTeams, user } = useContext(UserContext);
  const [showFavoriteTeams, setShowFavoriteTeams] = useState(true);
  const [teamData, setTeamData] = useState([]); // New state for team data
  const [playerData, setPlayerData] = useState([]); // New state for player data
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingPlayers, setLoadingPlayers] = useState(true);

  useEffect(() => {
    const fetchDataForTeams = async () => {
      const promises = favoriteTeams.map((team) => axios.get(`http://localhost:3000/api/team/getTeam?teamName=${team.teamName}`));

      try {
        const teamResults = await Promise.all(promises);
        setTeamData(teamResults.map((result) => result.data)); // Save team data to state
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoadingTeams(false);
      }
    };

    if (showFavoriteTeams && favoriteTeams.length > 0) {
      setLoadingTeams(true);
      fetchDataForTeams();
    }
  }, [favoriteTeams, showFavoriteTeams]); 

  

  useEffect(() => {
    const fetchDataForPlayers = async () => {
      const promises = favoritePlayers.map((player) => axios.get(`http://localhost:3000/api/favorites/getFavoritePlayers?firstName=${player.playerName.split(" ")[0]}&lastName=${player.playerName.split(" ")[1]}${player.playerName.split(" ")[2]? "%20"+ player.playerName.split(" ")[2] : ''}`));

      try {
        const playerResults = await Promise.all(promises);
        setPlayerData(playerResults.map((result) => result.data)); // Save player data to state
      } catch (error) {
        console.error('Error fetching player data:', error);
      } finally {
        setLoadingPlayers(false);
      }
    };

    if (!showFavoriteTeams && favoritePlayers.length > 0) {
      setLoadingPlayers(true);
      fetchDataForPlayers();
    }
  }, [favoritePlayers, showFavoriteTeams]);



  return (
    <div className='profilePage'>
      <div className='buttonContainer'>
        <Button onClick={() => setShowFavoriteTeams(true)} className='button'>
          Favorite Teams
        </Button>
        <Button onClick={() => setShowFavoriteTeams(false)} className='button'>
          Favorite Players
        </Button>
      </div>
      {showFavoriteTeams ? (
        <div className='favoriteTeams'>
          {favoriteTeams.length > 0 ? (
            <div>
              <h1>Favorite Teams</h1>
              <div className='favoriteTeamsContainer'>
                {loadingTeams ? (
                  <div>
                    <h1 style={{ textAlign: 'center' }}>Loading</h1>
                    <Spinner animation='border' variant='primary' />
                  </div>
                ) : (
                  teamData.map((team, key) => <FavTeamCard favoriteTeam={team} key={key} />)
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2>You have not added a team to your favorites yet!</h2>
            </div>
          )}
        </div>
      ) : (
        <div className='favoritePlayers'>
          <h1>Favorite Players</h1>
          <div className='favoritePlayersContainer'>
            {loadingPlayers ? (
              <div>
                <h1 style={{ textAlign: 'center' }}>Loading</h1>
                <Spinner animation='border' variant='primary' />
              </div>
            ) : (
              playerData.map((player, key) => <FavPlayerCard favoritePlayer={player} key={key} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
