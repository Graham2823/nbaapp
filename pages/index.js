import React, {useEffect, useState} from "react"
import axios from "axios"
import "../app/app.css"

export default function Home() {
  const [todaysGames, setTodaysGames] = useState([])
  const [yesterdaysGames, setYesterdaysGames] = useState([])
  useEffect(()=>{
    axios
    .get(`http://localhost:3000/api/getGames`)
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
      <div>
          <h2>Todays Games:</h2>
        <div className="todaysGames">
          {todaysGames &&(
            todaysGames.map((game, index) => (
              <div key={index} className="game">
                  <h3>{game.home_team.abbreviation}
                      {typeof game.home_team_score !== 'undefined' && game.home_team_score > 0 && (
                          game.home_team_score
                      )}
                  </h3>
                  <h3>VS</h3>
                  <h3>{game.visitor_team.abbreviation}
                      {typeof game.visitor_team_score !== 'undefined' && game.visitor_team_score > 0 && (
                          game.visitor_team_score
                      )}
                  </h3>
                  <h3>{game.status}</h3>
                  {game.home_team_score> 0 && game.visitor_team_score > 0 &&(
                    <h3><button>View Box Score</button></h3>
                  )}
              </div>
          ))
          )}
        </div>
        <h2>Yesterdays Games:</h2>
        <div className="yesterdaysGames">
          {yesterdaysGames &&(
            yesterdaysGames.map((game, index) => (
              <div key={index} className="game">
                  <h3>{game.home_team.abbreviation}
                      {typeof game.home_team_score !== 'undefined' && game.home_team_score > 0 && (
                          game.home_team_score
                      )}
                  </h3>
                  <h3>VS</h3>
                  <h3>{game.visitor_team.abbreviation}
                      {typeof game.visitor_team_score !== 'undefined' && game.visitor_team_score > 0 && (
                          game.visitor_team_score
                      )}
                  </h3>
                  <h3>{game.status}</h3>
                  {game.home_team_score> 0 && game.visitor_team_score > 0 &&(
                    <h3><button>View Box Score</button></h3>
                  )}
              </div>
          ))
          )}
        </div>
      </div>
    )
  }
  