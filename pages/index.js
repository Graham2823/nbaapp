import React, {useEffect, useState} from "react"
import axios from "axios"
import "../app/app.css"
import convertTo12HourFormat from "@/utils/convertTime"
import { Image } from "react-bootstrap"
import getTeamLogo from "@/utils/getLogo"

export default function Home() {
  const [todaysGames, setTodaysGames] = useState([])
  const [yesterdaysGames, setYesterdaysGames] = useState([])
  useEffect(()=>{
    axios
    .get(`https://nbaapp.vercel.app/api/getGames`)
    .then((response) => {
    setTodaysGames(response.data.tscores);
    setYesterdaysGames(response.data.yscores);
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    });
  },[])

  console.log(todaysGames)
  console.log(yesterdaysGames)
    return (
      <div className="frontPage">
          <h2>Todays Games:</h2>
        <div className="todaysGames">
          {todaysGames ?(
            todaysGames.map((game, index) => (
              <div key={index} className="game">
                  <h3><a href={`/TeamDetails?teamName=${game.home_team.full_name}`}><Image src={getTeamLogo(game.home_team.full_name)} alt='team logo' className='teamLogoFrontPage'/>{game.home_team.abbreviation}</a>
                      {typeof game.home_team_score !== 'undefined' && game.home_team_score > 0 && (
                          <span>: {game.home_team_score}</span>
                      )}
                  </h3>
                  <h3>VS</h3>
                  <h3><a href={`/TeamDetails?teamName=${game.visitor_team.full_name}`}><Image src={getTeamLogo(game.visitor_team.full_name)} alt='team logo' className='teamLogoFrontPage'/>{game.visitor_team.abbreviation}</a>
                      {typeof game.visitor_team_score !== 'undefined' && game.visitor_team_score > 0 && (
                          <span>: {game.visitor_team_score}</span>
                      )}
                  </h3>
                  {game.home_team_score> 0 || game.visitor_team_score > 0?(
                    <>
                    <p>
                      <h3 className="gameStatus">{game.time}</h3>
                    </p>
                    <p><a href={`/BoxScore?gameID=${game.id}&homeTeam=${game.home_team.full_name}&homeScore=${game.home_team_score}&awayTeam=${game.visitor_team.full_name}&awayScore=${game.visitor_team_score}&date=${game.date.split("T")[0]}`}><button className="boxScoreButton" >View Box Score</button></a></p>
                    </>
                  ):(
                    <div>
                      <h3 className="gameStatus">{convertTo12HourFormat(game.status, false)}</h3>
                      <a href={`/TeamDetails?team1=${game.home_team.full_name}&team2=${game.visitor_team.full_name}`}><button className="compareButton">Compare Teams</button></a>
                    </div>
                  )}
              </div>
          ))
          ):(
            <h3>No Games Today</h3>
          )}
        </div>
        <h2>Yesterdays Games:</h2>
        <div className="yesterdaysGames">
          {yesterdaysGames ?(
            yesterdaysGames.map((game, index) => (
              <div key={index} className="game">
                  <h3><a href={`/TeamDetails?teamName=${game.home_team.full_name}`}><Image src={getTeamLogo(game.home_team.full_name)} alt='team logo' className='teamLogoFrontPage'/>{game.home_team.abbreviation}</a>
                      {typeof game.home_team_score !== 'undefined' && game.home_team_score > 0 && (
                          <span>: {game.home_team_score}</span>
                      )}
                  </h3>
                  <h3>VS</h3>
                  <h3><a href={`/TeamDetails?teamName=${game.visitor_team.full_name}`}><Image src={getTeamLogo(game.visitor_team.full_name)} alt='team logo' className='teamLogoFrontPage'/>{game.visitor_team.abbreviation}</a>
                      {typeof game.visitor_team_score !== 'undefined' && game.visitor_team_score > 0 && (
                          <span>: {game.visitor_team_score}</span>
                      )}
                  </h3>
                  <h3 className="gameStatus">{game.status}</h3>
                  {game.home_team_score> 0 && game.visitor_team_score > 0 &&(
                    <p><a href={`/BoxScore?gameID=${game.id}&homeTeam=${game.home_team.full_name}&homeScore=${game.home_team_score}&awayTeam=${game.visitor_team.full_name}&awayScore=${game.visitor_team_score}&date=${game.date.split("T")[0]}`}><button>View Box Score</button></a></p>
                  )}
              </div>
          ))
          ):(
            <h3>No Games Yesterday</h3>
          )}
        </div>
      </div>
    )
  }
  