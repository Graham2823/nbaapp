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
        { name: 'Points', player1: player1Stats[0].pts, player2: player2Stats[0].pts },
        { name: 'Rebounds', player1: player1Stats[0].reb, player2: player2Stats[0].reb },
        { name: 'Assists', player1: player1Stats[0].ast, player2: player2Stats[0].ast },
        { name: 'Steals', player1: player1Stats[0].stl, player2: player2Stats[0].stl },
        { name: 'Blocks', player1: player1Stats[0].blk, player2: player2Stats[0].blk },
        { name: 'Turnovers', player1: player1Stats[0].turnover, player2: player2Stats[0].turnover },
    ];

    const combinedPercentages = [
        { name: 'FG%', player1: (player1Stats[0].fg_pct * 100).toFixed(2), player2: (player2Stats[0].fg_pct * 100).toFixed(2) },
        { name: '3PT%', player1: (player1Stats[0].fg3_pct * 100).toFixed(2), player2: (player2Stats[0].fg3_pct * 100).toFixed(2) },
        { name: 'FT%', player1: (player1Stats[0].ft_pct * 100).toFixed(2), player2: (player2Stats[0].ft_pct * 100).toFixed(2) },
    ];

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
                    <YAxis />
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
