import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, Legend, Bar, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../app/app.css'

const ComparePlayerCharts = ({ player1Data, player1Stats, player2Data, player2Stats }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 500); // Adjust this value as needed
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const combinedStats = [
        { name: 'Points', player1: player1Stats.pts, player2: player2Stats.pts },
        { name: 'Rebounds', player1: player1Stats.reb, player2: player2Stats.reb },
        { name: 'Assists', player1: player1Stats.ast, player2: player2Stats.ast },
        { name: 'Steals', player1: player1Stats.stl, player2: player2Stats.stl },
        { name: 'Blocks', player1: player1Stats.blk, player2: player2Stats.blk },
        { name: 'Turnovers', player1: player1Stats.turnover, player2: player2Stats.turnover },
    ];

    const combinedPercentages = [
        { name: 'FG%', player1: (player1Stats.fg_pct * 100).toFixed(2), player2: (player2Stats.fg_pct * 100).toFixed(2) },
        { name: '3PT%', player1: (player1Stats.fg3_pct * 100).toFixed(2), player2: (player2Stats.fg3_pct * 100).toFixed(2) },
        { name: 'FT%', player1: (player1Stats.ft_pct * 100).toFixed(2), player2: (player2Stats.ft_pct * 100).toFixed(2) },
    ];

    // Calculate the maximum value for setting Y-axis ticks
    const maxPoints = Math.max(player1Stats.pts, player2Stats.pts, 40); // Adjust as needed

    // Generate an array of tick values from 0 to the maximum points value in increments of 5
    const yAxisTicks = Array.from({ length: Math.ceil(maxPoints / 6) + 1 }, (_, i) => i * 5);

    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={combinedStats} margin={{ top: 20, right: 20, bottom: isSmallScreen ? 50 : 20, left: 20 }} className='compareCharts'>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: isSmallScreen ? 12 : 18 }} // Adjust font size based on screen size
                        angle={isSmallScreen ? -45 : 0} // Rotate labels only on small screens
                        textAnchor={isSmallScreen ? "end" : "middle"}
                        margin={{bottom: 100}}
                    />
                    <YAxis domain={[0,35]}  ticks={yAxisTicks} />
                    <Tooltip />
                    <Legend verticalAlign='top' align='center'/>
                    <Bar dataKey="player1" fill="#8884d8" name={`${player1Data[0].first_name} ${player1Data[0].last_name}`} />
                    <Bar dataKey="player2" fill="#82ca9d" name={`${player2Data[0].first_name} ${player2Data[0].last_name}`} />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={combinedPercentages} margin={{ top: 20, right: 20, bottom: isSmallScreen ? 50 : 20, left: 20 }} className='compareCharts'>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: isSmallScreen ? 12 : 18 }} 
                        angle={isSmallScreen ? -45 : 0}
                        textAnchor={isSmallScreen ? "end" : "middle"}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="player1" fill="#8884d8" name={`${player1Data[0].first_name} ${player1Data[0].last_name}`} />
                    <Bar dataKey="player2" fill="#82ca9d" name={`${player2Data[0].first_name} ${player2Data[0].last_name}`} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComparePlayerCharts;
