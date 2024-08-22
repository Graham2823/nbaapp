import React from 'react';
import PlayerStatChart from './PlayerStatChart';

const RenderPlayerStatsChart = ({ data, stat }) => {
  return (
    <div className='playerStatChart'>
        <h2>Player {stat} Per Game Over the Years</h2>
        <PlayerStatChart data={data} stat={stat}/>
    </div>
  )
}

export default RenderPlayerStatsChart;
