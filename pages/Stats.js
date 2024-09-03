import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StatLeadersCard from '@/components/StatLeadersCard'
import "../app/app.css"
import { Spinner } from 'react-bootstrap'


const Stats = () => {
    const [statLeaders, setStatLeaders] = useState()

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/statLeaders/topFiveLeaders`)
        .then((response) => {
            setStatLeaders(response.data)
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    },[])


    return (
        <div className='statsPage'>
            {statLeaders ?(
                <div>
            <h1>League Leaders</h1>
        <div className='statCards'>
            {Object.keys(statLeaders).map((category) => (
                <div key={category} className='statCard'>
                    <StatLeadersCard cattegory={category} leaders={statLeaders[category]}/>
                </div>
            ))}
        </div>
                </div>
            ):(
                <div>
                    <h1 style={{ textAlign: 'center' }}>Loading</h1>
                    <Spinner animation="border" variant="primary"/>
                </div>
            )}
        </div>
    );
}

export default Stats