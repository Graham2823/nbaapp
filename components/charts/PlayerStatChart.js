import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const statLabels = {
    points: "Points Per Game",
    assists: "Assists Per Game",
    rebounds: "Rebounds Per Game",
    steals: "Steals Per Game",
    blocks: "Blocks Per Game",
    fgPercentage: "Field Goal Percentage",
    threePtPercentage: "3-Point Percentage",
    ftPercentage: "Free Throw Percentage"
};

const PlayerStatChart = ({ data, stat }) => {
    // Reverse the order of the data array
    const reversedData = [...data].reverse();

    // Map data to use the stat as the key
    const mappedData = reversedData.map(entry => ({
        ...entry,
        [stat]: entry.value,
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mappedData}>
                <XAxis dataKey="season" />
                <YAxis
                    label={{ value: statLabels[stat], angle: -90, position: 'insideLeft' }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={stat} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PlayerStatChart;
