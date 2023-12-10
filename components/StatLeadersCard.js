import React, { useEffect } from 'react'
import axios from 'axios'
import { Card, Table, Button } from 'react-bootstrap'
import "../app/app.css"
import { useRouter } from 'next/router'


const StatLeadersCard = ({cattegory, leaders}) => {
    const router = useRouter()
    let stat 
    switch(cattegory){
        case "pointLeaders": stat= "points";
        break;
        case "assistLeaders": stat= "assists";
        break;
        case "reboundLeaders": stat= "rebounds";
        break;
        case "stealLeaders": stat= "steals";
        break;
        case "blockLeaders": stat= "blocks";
        break;
        case "turnoverLeaders": stat= "turnovers";
        break;
        default: stat ="";
        break;
    }

    console.log(leaders)
    console.log(stat)
    
  return (
    <Card className='statCard'>
        <h2>{stat.toUpperCase()}</h2>
        <Table className='statCardTable'>
        {leaders.map((player, key)=>(
            <tr key={key}><td>{player.name}</td><td>{player.stats[stat]}</td></tr>
        ))}
        </Table>
        <Button size='sm' onClick={()=>router.push(`/StatLeaders?stat=${stat}`)}>View All</Button>
    </Card>
  )
}

export default StatLeadersCard