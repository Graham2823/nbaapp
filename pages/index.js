import React, {useEffect, useState, useContext} from "react"
import axios from "axios"
import "../app/app.css"
import { UserContext } from "@/context/userContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import RenderGames from "@/components/RenderGames"
import {Spinner} from "react-bootstrap"

export default function Home() {
  const [todaysGames, setTodaysGames] = useState(null)
  const [yesterdaysGames, setYesterdaysGames] = useState(null)
  const [bettingOdds, setBettingOdds] = useState([])
  const {username, favoriteTeams} = useContext(UserContext)
  useEffect(()=>{
    axios
    .get(`https://nbaapp.vercel.app/api/getTodaysGames`)
    .then((response) => {
      if(response.data.data.length > 0){
        setTodaysGames(response.data.data);
      }else{
        setTodaysGames([])
      }
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    });
    axios
    .get(`https://nbaapp.vercel.app/api/getYesterdaysGames`)
    .then((response) => {
      if(response.data.data.length > 0){
        setYesterdaysGames(response.data.data);
      }else{
        setYesterdaysGames([])
      }
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    });
  },[])


    return (
      <div className="frontPage">
        {username && 
        <h2>Hello {username}</h2>
        }
          <h2>Today&apos;s Games:</h2>
          {todaysGames ?(
            (todaysGames.length !== 0?(
              <RenderGames games={todaysGames} today={true}/>
            ):(
              <h3>No Games Today</h3>
            ))
          ):(
            <Spinner animation="border" variant="primary"/>
            )}
        <h2>Yesterday&apos;s Games:</h2>
        <div className="yesterdaysGames">
          {yesterdaysGames ?(
            (yesterdaysGames.length !== 0?(
              <RenderGames games={yesterdaysGames} today={false}/>
              ):(
                <h3>No Games Yesterday</h3>
                ))
                ):(
                  <Spinner animation="border" variant="primary"/>
          )}
        </div>
      </div>
    )
  }
  