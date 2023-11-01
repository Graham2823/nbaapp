import React,{useEffect, useState} from 'react'
import axios from 'axios'
import StandingsCard from '@/components/StandingsCard'
import { Button } from 'react-bootstrap'
import "../app/app.css"

const StandingsPage = () => {
    const [WC, setWC] = useState()
    const [EC, setEC] = useState()
    const [showEasternConference, setShowEasternconference] = useState(true)

    useEffect(()=>{
        axios.get('https://nbaapp.vercel.app/api/getStandings')
        .then((response) => {
           
            setWC(response.data.wc_full)
            setEC(response.data.ec_full)
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    },[])

    console.log(EC)
    console.log(WC)
  return (
    <div className='standingsPage'>
        <Button variant='info' className='Button' onClick={()=>setShowEasternconference(true)}>Eastern Conference</Button>
        <Button variant='info' className='Button' onClick={()=>setShowEasternconference(false)}>Western Conference</Button>
        {EC && showEasternConference ?
        (
        <div>
          <h2>Eastern Conference</h2>
            <StandingsCard conference={EC}/>
        </div>
    ):(
      <div>
        <h2>Western Conference</h2>
        <StandingsCard conference={WC}/>
      </div>
    )}</div>
  )
}

export default StandingsPage