import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StatLeadersCard from '@/components/StatLeadersCard'
import "../app/app.css"


const Stats = () => {
    const [statLeaders, setStatLeaders] = useState([])

    useEffect(()=>{
        axios.get(`https://nbaapp.vercel.app/api/topFiveLeaders`)
        .then((response) => {
            setStatLeaders(response.data)
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    },[])

    console.log(statLeaders)
    return (
        <div className='statsPage'>
            <h1>League Leaders</h1>
        <div className='statCards'>
            {Object.keys(statLeaders).map((category) => (
                <div key={category}>
                    <StatLeadersCard cattegory={category} leaders={statLeaders[category]}/>
                </div>
            ))}
        </div>
        </div>
    );
}

export default Stats