import { UserContext } from '@/context/userContext'
import React,{useContext, useState} from 'react'
import FavTeamCard from '@/components/FavTeamCard'
import { Button } from 'react-bootstrap'
import FavPlayerCard from '@/components/FavPlayerCard'

const ProfilePage = () => {
    const {favoritePlayers, favoriteTeams, user} = useContext(UserContext)
    const [showFavoriteTeams, setShowFavoriteTeams] = useState(true)
  return (
    <div className='profilePage'>
        <div className='buttonContainer'>
        <Button onClick={()=> setShowFavoriteTeams(true)} className='button'>Favorite Teams</Button>
        <Button onClick={()=> setShowFavoriteTeams(false)} className='button'>Favorite Players</Button>
        </div>
        {showFavoriteTeams ? (
        <div className='favoriteTeams'>
            <h1>Favorite Teams</h1>
            <div className='favoriteTeamsContainer'>
        {favoriteTeams.map((team, key)=>(
            <FavTeamCard favoriteTeam={team.teamName} key={key}/>
            ))} 
            </div>
            </div>
        ):(
            <div className='favoritePlayers'>
                <h1>Favorite Players</h1>
            <div className='favoritePlayersContainer'>
                {favoritePlayers.map((player, key)=>(
                    <FavPlayerCard favoritePlayer={player} key={key}/>
                ))}
            </div>
            </div>
        )}
    </div>
  )
}

export default ProfilePage