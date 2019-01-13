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

    let playerStats = [];

    var svg = d3.select("#chart-area")
        .append("svg")
            .attr("width", "400")
            .attr("height", "400")

    NBA.stats.playerStats().then( res => { 
        let stats = res.leagueDashPlayerStats;
        console.log(stats);
        stats.forEach( d => {
            if (d.pts > 20){
                d.pts = d.pts;
            }
        });

        var y = d3.scaleLinear()
            .domain([0, 40])
            .range([0, 1000])
        
        var rects = svg.selectAll("rect")
            .data(stats)
            .enter()
            .append("rect")
            .attr("y", 20)
            .attr("x", function(d, i){
                return (i * 60);
            })
            .attr("width", 40)
            .attr("height", function(d){
                return y(d.pts);
            })
            .attr("fill", function(d) {
                return "grey";
            })
        // let pstats = playerStats.sort().reverse().slice(0,15);




    
        
            
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

