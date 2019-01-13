import NBA from 'nba';
import { SIGBREAK } from 'constants';

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
        stats = res.leagueDashPlayerStats;
        console.log(stats)
        stats.forEach( player => {
            if( player.pts > 20){
            playerStats.push(player.pts)
            }
        });

        let pstats = playerStats.sort().reverse().slice(0,15);

        var svgWidth = 500, svgHeight = 300, barPadding = 5;
        var barWidth = (svgWidth / pstats.length)

        var svg = d3.select("body").append("svg")
            .attr("height", "80%")
            .attr("width", "80%");


        var barChart = svg.selectAll("rect")
            .data(pstats)
            .enter()
            .append("rect")
            .attr("y", function (d) {
                return svgHeight - d
            })
            .attr("height", function (d) {
                return d
            })
            .attr("width", barWidth - barPadding)
            .attr("transform", function (d, i) {
                var translate = [barWidth * i, 0];
                return "translate(" + translate + ")";
            });


        // svg.selectAll("rect")
        //     .data(pstats)
        //     .enter().append("rect")
        //         .attr("height", function (d, i) { return (d * 10) })
        //         .attr("width", "20")
        //         .attr("class", "bar")
        //         .attr("x", function (d, i) { return (i * 40) + 20; })
        //         .attr("y", function (d, i) { return 400 - (d * 10) });
    

        // var yScale = d3.scaleLinear()
        //     .domain([0,d3.max(pstats)])
        //     .range([svgHeight, 0]);


        // var y_axis = d3.axisLeft().scale(yScale);

        // svg.append("g")
        //     .attr("transform", "translate(20, 100)")
        //     .call(y_axis);


        
            
    });


    // let lakers = NBA.teamIdFromName('Los Angeles Lakers')
    // console.log(lakers)



    // d3.select('h1').style('color', 'red')
    //     .attr('class', 'heading')
    //     .text('Hello D3');

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



    // 0: "teamIdFromName"
    // 1: "playerIdFromName"
    // 2: "findPlayer" Returns first player with name match (first in array of James' i.e.)
    // 3: "searchPlayers"  You can search by player's name
    // 4: "updatePlayers" idk 
    // 5: "updateTeams" idk 

    
})
