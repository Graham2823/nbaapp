import React from 'react';
import PlayerPointsChart from './PlayerPointsChart';

const RenderPlayerPointsChart = ({ data, stat }) => {
  return (
    <div>
        <h2>Player {stat} Per Game Over the Years</h2>
        <PlayerPointsChart data={data} stat={stat}/>
    </div>
  )
}

export default RenderPlayerPointsChart;
