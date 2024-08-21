import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import RenderPlayerPointsChart from './RenderPlayerPointsChart';
import '../../app/app.css';

const DisplayCharts = ({ playerDetails }) => {
    // Initialize objects for each statistic
    const stats = {
        points: [],
        assists: [],
        rebounds: [],
        steals: [],
        blocks: [],
        fgPercentage: [],
        threePtPercentage: [],
        ftPercentage: []
    };

    // Populate the objects with data from playerDetails
    playerDetails.forEach(seasonData => {
        stats.points.push({ season: seasonData[0].season, value: seasonData[0].pts });
        stats.assists.push({ season: seasonData[0].season, value: seasonData[0].ast });
        stats.rebounds.push({ season: seasonData[0].season, value: seasonData[0].reb });
        stats.steals.push({ season: seasonData[0].season, value: seasonData[0].stl });
        stats.blocks.push({ season: seasonData[0].season, value: seasonData[0].blk });
        stats.fgPercentage.push({ season: seasonData[0].season, value: seasonData[0].fg_pct });
        stats.threePtPercentage.push({ season: seasonData[0].season, value: seasonData[0].fg3_pct });
        stats.ftPercentage.push({ season: seasonData[0].season, value: seasonData[0].ft_pct });
    });

    const [selectedStat, setSelectedStat] = useState('points');
    console.log(playerDetails,"Player detials in graph page")
    console.log("player stats", stats)
    const renderChart = () => {
        switch (selectedStat) {
            case 'points':
                return <RenderPlayerPointsChart data={stats.points} stat={'Points'} />;
            case 'assists':
                return <RenderPlayerPointsChart data={stats.assists} stat={'Assists'}/>;
            case 'rebounds':
                return <RenderPlayerPointsChart data={stats.rebounds} stat={'Rebounds'}/>;
            case 'steals':
                return <RenderPlayerPointsChart data={stats.steals} stat={'Steals'}/>;
            case 'blocks':
                return <RenderPlayerPointsChart data={stats.blocks} stat={'blocks'}/>;
            case 'fgPercentage':
                return <RenderPlayerPointsChart data={stats.fgPercentage} stat={'FG%'}/>;
            case 'threePtPercentage':
                return <RenderPlayerPointsChart data={stats.threePtPercentage} stat={'3PT%'}/>;
            case 'ftPercentage':
                return <RenderPlayerPointsChart data={stats.ftPercentage} stat={'FT%'}/>;
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>View Players Career Stats</h2>
            <Button onClick={() => setSelectedStat('points')} className='Button'>View Points</Button>
            <Button onClick={() => setSelectedStat('assists')} className='Button'>View Assists</Button>
            <Button onClick={() => setSelectedStat('rebounds')} className='Button'>View Rebounds</Button>
            <Button onClick={() => setSelectedStat('steals')} className='Button'>View Steals</Button>
            <Button onClick={() => setSelectedStat('blocks')} className='Button'>View Blocks</Button>
            <Button onClick={() => setSelectedStat('fgPercentage')} className='Button'>View FG%</Button>
            <Button onClick={() => setSelectedStat('threePtPercentage')} className='Button'>View 3PT%</Button>
            <Button onClick={() => setSelectedStat('ftPercentage')} className='Button'>View FT%</Button>

            {renderChart()}
        </div>
    );
};

export default DisplayCharts;
