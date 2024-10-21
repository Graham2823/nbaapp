import React,{useEffect, useState} from 'react'
import axios from 'axios'
import StandingsCard from '@/components/standings/StandingsCard'
import { Button } from 'react-bootstrap'
import "../../app/app.css"


const StandingsPage = () => {
  const [wc, setWC] = useState()
  const [ec, setEC] = useState()
  const [showEasternConference, setShowEasternconference] = useState(true)
  const [standingsToDisplay, setStandingsToDisplay] = useState('Overall')

  useEffect(()=>{
            axios.get('https://nbaapp.vercel.app/api/standings/getStandings')
            .then((response) => {
               
                setEC(response.data[0].easternConference)
                setWC(response.data[0].westernConference)
                })
                .catch((error) => {
                console.error('Error fetching data:', error);
                });
        },[])

        console.log(standingsToDisplay)
        return (
              <div className='standingsPage'>
                  <Button className='Button button' onClick={()=>setShowEasternconference(true)}>Eastern Conference</Button>
                  <Button className='Button button' onClick={()=>setShowEasternconference(false)}>Western Conference</Button>
                  <div>
                  <select onChange={((e)=>setStandingsToDisplay(e.target.value))}>
                    <option value={'Overall'}>Overall</option>
                    <option value={'Streaks'}>Streaks</option>
                    <option value={'Margins'}>Margins</option>
                    <option value={'Conference/Divisions'}>vs Conference/Division</option>
                    <option value={'Calendar'}>Calendar</option>
                  </select>
                  </div>
                  {ec && showEasternConference ?
                  (
                  <div>
                    <h2>Eastern Conference</h2>
                      <StandingsCard conference={ec} standingsToDisplay={standingsToDisplay}/>
                  </div>
              ):(
                <div>
                  <h2>Western Conference</h2>
                  <StandingsCard conference={wc} standingsToDisplay={standingsToDisplay}/>
                </div>
              )}</div>
            )
}

export default StandingsPage
