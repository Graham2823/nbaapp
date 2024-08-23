import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Player: ${payload[0].payload.name}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const StatLeaderBarChart = ({ data, stat }) => {
    // Map through the data to format it correctly for the chart
    const reversedData = [...data].reverse()
    const barChartData = reversedData.map((player) => ({
        name: player.name,
        [stat]: player.stats[stat],
    }));

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={barChartData} margin={{ top: 20, right: 20, bottom: 80, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#ccc' }}
                    label={false} // Ensure no label is set
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey={stat} fill="#8884d8" name=" "/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StatLeaderBarChart;
