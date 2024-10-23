export default function calculateCareerAverages(playerStats){
    // Initialize an object to store the summed values of each stat

    console.log("player STATS",playerStats)
    const totalStats = {
        ast: 0, blk: 0, dreb: 0, fg3_pct: 0, fg3a: 0, fg3m: 0, fg_pct: 0, fga: 0, fgm: 0,
        ft_pct: 0, fta: 0, ftm: 0, games_played: 0, min: 0, oreb: 0, pf: 0, pts: 0, reb: 0,
        stl: 0, turnover: 0, player_id: playerStats.player_id
    };
    
    let totalGamesPlayed = 0;
    
    // Sum the stats across all the seasons
    playerStats.forEach(season => {
        if(season[0]){
            
            totalStats.ast += Number(season[0].ast);
            totalStats.blk += Number(season[0].blk);
            totalStats.dreb += Number(season[0].dreb);
            totalStats.fg3_pct += Number(season[0].fg3_pct);
            totalStats.fg3a += Number(season[0].fg3a);
            totalStats.fg3m += Number(season[0].fg3m);
            totalStats.fg_pct += Number(season[0].fg_pct);
            totalStats.fga += Number(season[0].fga);
            totalStats.fgm += Number(season[0].fgm);
            totalStats.ft_pct += Number(season[0].ft_pct);
            totalStats.fta += Number(season[0].fta);
            totalStats.ftm += Number(season[0].ftm);
            totalStats.games_played += Number(season[0].games_played);
            totalStats.oreb += Number(season[0].oreb);
            totalStats.pf += Number(season[0].pf);
            totalStats.pts += Number(season[0].pts);
            totalStats.reb += Number(season[0].reb);
            totalStats.stl += Number(season[0].stl);
            totalStats.turnover += Number(season[0].turnover);
            
            console.log(typeof season[0].min)
            // console.log("min", season[0].min)
            
            // Add minutes as seconds for easier average calculation
            const [minutes, seconds] = season[0].min.split(':').map(Number);
            totalStats.min += (minutes * 60) + seconds;
            
            
            totalGamesPlayed += Number(season.games_played);
        }
    });

    // Calculate averages by dividing by the number of seasons (or games played if preferred)
    const seasonsCount = playerStats.length;
    
    const averagedStats = {
        ast: (totalStats.ast / seasonsCount).toFixed(2),
        blk: (totalStats.blk / seasonsCount).toFixed(2),
        dreb: (totalStats.dreb / seasonsCount).toFixed(2),
        fg3_pct: (totalStats.fg3_pct / seasonsCount).toFixed(3),
        fg3a: (totalStats.fg3a / seasonsCount).toFixed(2),
        fg3m: (totalStats.fg3m / seasonsCount).toFixed(2),
        fg_pct: (totalStats.fg_pct / seasonsCount).toFixed(3),
        fga: (totalStats.fga / seasonsCount).toFixed(2),
        fgm: (totalStats.fgm / seasonsCount).toFixed(2),
        ft_pct: (totalStats.ft_pct / seasonsCount).toFixed(3),
        fta: (totalStats.fta / seasonsCount).toFixed(2),
        ftm: (totalStats.ftm / seasonsCount).toFixed(2),
        games_played: totalStats.games_played,  // Can leave this as sum if needed
        min: `${Math.floor(totalStats.min / seasonsCount / 60)}:${Math.floor(totalStats.min / seasonsCount % 60).toString().padStart(2, '0')}`, // Convert seconds back to mm:ss
        oreb: (totalStats.oreb / seasonsCount).toFixed(2),
        pf: (totalStats.pf / seasonsCount).toFixed(2),
        pts: (totalStats.pts / seasonsCount).toFixed(2),
        reb: (totalStats.reb / seasonsCount).toFixed(2),
        stl: (totalStats.stl / seasonsCount).toFixed(2),
        turnover: (totalStats.turnover / seasonsCount).toFixed(2),
        player_id: totalStats.player_id
    };

    return averagedStats;
}