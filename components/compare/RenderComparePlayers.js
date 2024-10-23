import React, {useState} from 'react';
import '../../app/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from 'react-bootstrap';
import ComparePlayerCharts from '../charts/comparePlayerCharts';
import {Button} from 'react-bootstrap';
import calculateCareerAverages from '@/utils/calculateCareersAverages';
import RenderStatsComparison from './RenderStatsComparison';

const RenderComparePlayers = ({p1Data, p1Stats, p2Data, p2Stats}) => {
	const [showGraphs, setShowGraphs] = useState(true)
	const [showCareerAverages, setShowCareerAverages] = useState(true)
	const p1CareerAverages = calculateCareerAverages(p1Stats)
	const p2CareerAverages = calculateCareerAverages(p2Stats)

	
  return (
    <div>
		<div className='playerComparisonButtonContainer'>
			<Button onClick={()=>setShowCareerAverages(!showCareerAverages)} style={{margin:"20px"}}>{showCareerAverages ? "Show This Season" : "Show Career"}</Button>
			<Button onClick={()=>setShowGraphs(!showGraphs)} style={{margin:"20px"}}>{!showGraphs ? "Show Graphs" : "Show Stats"}</Button>
		</div>
		<h3>{showCareerAverages ? 'Career Stats Comparison:' : '2024-25 Stats Comparison'}</h3>
        <div>
			{!showGraphs ? (
				showCareerAverages ?(
					<RenderStatsComparison p1Data={p1Data} p1CareerAverages={p1CareerAverages} p2Data={p2Data} p2CareerAverages={p2CareerAverages}/>
				):(
					<RenderStatsComparison p1Data={p1Data} p1CareerAverages={p1Stats[0][0]} p2Data={p2Data} p2CareerAverages={p2Stats[0][0]}/>

				)
					
			):(
				showCareerAverages ?(
					<ComparePlayerCharts player1Data={p1Data}  player1Stats={p1CareerAverages} player2Data={p2Data} player2Stats={p2CareerAverages}/>
				):(
					<ComparePlayerCharts player1Data={p1Data}  player1Stats={p1Stats[0][0]} player2Data={p2Data} player2Stats={p2Stats[0][0]}/>

				)
			)}
				</div>
    </div>
  )
}

export default RenderComparePlayers