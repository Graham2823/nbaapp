import React, {useEffect, useState, useContext} from "react"
import axios from "axios"
import "../app/app.css"
import convertTo12HourFormat from "@/utils/convertTime"
import { Image } from "react-bootstrap"
import getTeamLogo from "@/utils/getLogo"
import { UserContext } from "@/context/userContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {Button} from "react-bootstrap"
import RenderGames from "@/components/RenderGames"

export default function Home() {
  const [todaysGames, setTodaysGames] = useState([])
  const [yesterdaysGames, setYesterdaysGames] = useState([])
  const [bettingOdds, setBettingOdds] = useState([])
  const {username, favoriteTeams} = useContext(UserContext)
  useEffect(()=>{
    axios
    .get(`https://nbaapp.vercel.app/api/getTodaysGames`)
    .then((response) => {
    setTodaysGames(response.data.data);
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    });
    axios
    .get(`https://nbaapp.vercel.app/api/getYesterdaysGames`)
    .then((response) => {
    setYesterdaysGames(response.data.data);
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    });
  },[])

  const favoriteTeam = (teamName)=>{
    if(favoriteTeams.some((team)=> team.teamName === teamName)){
      return <FontAwesomeIcon icon={faStar} style={{color:'yellow'}} onClick={()=> handleFavoriteTeam()}/>
    }
  }


    return (
      <div className="frontPage">
        {username && 
        <h2>Hello {username}</h2>
        }
          <h2>Today&apos;s Games:</h2>
          {todaysGames?(
            <RenderGames games={todaysGames}/>
          ):(
            <h3>No Games Today</h3>
          )}
        <h2>Yesterday&apos;s Games:</h2>
        <div className="yesterdaysGames">
          {yesterdaysGames ?(
            <RenderGames games={yesterdaysGames}/>
          ):(
            <h3>No Games Yesterday</h3>
          )}
        </div>
      </div>
    )
  }
  