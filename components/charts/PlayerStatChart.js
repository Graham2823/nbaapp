import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const PlayerStatChart = ({ data, stat }) => {
    // Reverse the order of the data array
    const reversedData = [...data].reverse();

    console.log("data", reversedData);
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={reversedData}>
                <XAxis dataKey="season" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PlayerStatChart;
