import React, {useEffect, useState} from "react"
import axios from "axios"
import "../app/app.css"
import convertTo12HourFormat from "@/utils/convertTime"
import Link from "next/link"

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
                  <h3><a href={`/TeamDetails?teamName=${game.home_team.full_name}`}>{game.home_team.abbreviation}</a>
                      {typeof game.home_team_score !== 'undefined' && game.home_team_score > 0 && (
                          game.home_team_score
                      )}
                  </h3>
                  <h3>VS</h3>
                  <h3><a href={`/TeamDetails?teamName=${game.visitor_team.full_name}`}>{game.visitor_team.abbreviation}</a>
                      {typeof game.visitor_team_score !== 'undefined' && game.visitor_team_score > 0 && (
                          game.visitor_team_score
                      )}
                  </h3>
                  <h3 className="gameStatus">{convertTo12HourFormat(game.status, false)}</h3>
                  {game.home_team_score> 0 && game.visitor_team_score > 0 &&(
                    <p><a href={`/BoxScore?gameID=${game.id}&homeTeam=${game.home_team.full_name}&awayTeam=${game.visitor_team.full_name}&date=${game.date.split("T")[0]}`}><button className="boxScoreButton" >View Box Score</button></a></p>
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
                  <h3><a href={`/TeamDetails?teamName=${game.home_team.full_name}`}>{game.home_team.abbreviation}</a>
                      {typeof game.home_team_score !== 'undefined' && game.home_team_score > 0 && (
                          game.home_team_score
                      )}
                  </h3>
                  <h3>VS</h3>
                  <h3><a href={`/TeamDetails?teamName=${game.visitor_team.full_name}`}>{game.visitor_team.abbreviation}</a>
                      {typeof game.visitor_team_score !== 'undefined' && game.visitor_team_score > 0 && (
                          game.visitor_team_score
                      )}
                  </h3>
                  <h3 className="gameStatus">{convertTo12HourFormat(game.status, false)}</h3>
                  {game.home_team_score> 0 && game.visitor_team_score > 0 &&(
                    <h3><button>View Box Score</button></h3>
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
  