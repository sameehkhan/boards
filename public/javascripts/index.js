import NBA from 'nba';

document.addEventListener('DOMContentLoaded', () => {

    
    // console.log(Object.getOwnPropertyNames(NBA));
    // console.log(NBA.stats.all);
    // console.log(NBA.prototypes)

    // console.log(Object.getOwnPropertyNames(NBA).filter(function (p) {
    //     return typeof NBA[p] === 'function';
    // }));

    // let lebron = NBA.playerIdFromName('Lebron James');
    // NBA.stats.playerInfo({ PlayerID: lebron }).then(console.log);

    let stats; 
    let playerStats = [];

    NBA.stats.playerStats().then( res => { 
        let stats = res.leagueDashPlayerStats;
        console.log(stats);
        // stats.forEach( player => {
        //     if( player.pts > 20){
        //     playerStats.push(player.pts)
        //     }
        // });

        let pstats = playerStats.sort().reverse().slice(0,15);




    
        
            
    }).catch(function(error){
        console.log(error);
    })


    // let lakers = NBA.teamIdFromName('Los Angeles Lakers')
    // console.log(lakers)


    // let search = NBA.searchPlayers('james')
    // console.log(search);

    // NBA.stats.teamInfoCommon({ TeamID: lakers }).then(console.log);
    // NBA.stats.playerStats({ PlayerID: lebron }).then(console.log);

    // let per = "PerGame"

    // NBA.stats.team_clutch({TeamID: lakers}).then(console.log);
    // NBA.stats.playerShooting().then(console.log);
    // NBA.stats.teamShooting().then(console.log);
    // NBA.stats.measureType().then(console.log);



    NBA.stats.teamStats()






    // let stats;
    // let teamsStats = [];

    // NBA.stats.playerStats().then(res => {
    //     stats = res.leagueDashPlayerStats;
    //     console.log(stats)
    //     stats.forEach(player => {
    //         if (player.pts > 20) {
    //             playerStats.push(player.pts)
    //         }
    //     });

    // TEAMS

    // teamShooting()
    // teamSplits
    // commonInfo 

    // PLAYERS
    // playerSplits
    // player shooting is not what you think
    // playerStats

    // NOT WORKING
    // playerClutch

    
})

