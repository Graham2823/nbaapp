import React,{useEffect, useState} from 'react'
import axios from 'axios'
import StandingsCard from '@/components/StandingsCard'
import { Button } from 'react-bootstrap'
import "../../app/app.css"


const StandingsPage = () => {
  const [wc, setWC] = useState()
  const [ec, setEC] = useState()
  const [showEasternConference, setShowEasternconference] = useState(true)

  useEffect(()=>{
            axios.get('http://localhost:3000/api/standings/getStandings')
            .then((response) => {
               
                setEC(response.data[0].easternConference)
                setWC(response.data[0].westernConference)
                })
                .catch((error) => {
                console.error('Error fetching data:', error);
                });
        },[])
        return (
              <div className='standingsPage'>
                  <Button className='Button button' onClick={()=>setShowEasternconference(true)}>Eastern Conference</Button>
                  <Button className='Button button' onClick={()=>setShowEasternconference(false)}>Western Conference</Button>
                  {ec && showEasternConference ?
                  (
                  <div>
                    <h2>Eastern Conference</h2>
                      <StandingsCard conference={ec}/>
                  </div>
              ):(
                <div>
                  <h2>Western Conference</h2>
                  <StandingsCard conference={wc}/>
                </div>
              )}</div>
            )
}

export default StandingsPage
