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

    var margin = { left:100, right:10, top:10, bottom:100 };

    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#chart-area")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

    NBA.stats.playerStats().then( res => { 
        let stats = res.leagueDashPlayerStats;
        // console.log(res)
        // let stats = []
        // res.leagueDashPlayerStats.forEach(player => {
        //     if (player.pts > 15){
        //         stats.push([{
        //             "playerName" : player.playerName,
        //             "pts" : player.pts

        //         }]);
        //     }
        // });

        console.log(stats);

        var x = d3.scaleBand()
            .domain(stats.map(function(d){
                if ( d.pts > 20){
                return d.playerName;
                }
            }))
            .range([0, width])
            .paddingInner(0.3)
            .paddingOuter(0.3);
        
        var y = d3.scaleLinear()
            .domain([0, d3.max(stats, function(d){
                return d.pts;
            })])
            .range([0, height]);

        var xAxisCall = d3.axisBottom(x);
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," +  width + ")")
            .call(xAxisCall);

        var yAxisCall = d3.axisLeft(y);
        g.append("g")
            .attr("class", "y-axis")
            .call(yAxisCall)

        var rects = svg.selectAll("rect")
            .data(stats)
            .enter()
            .append("rect")
            .attr("y", 20)
            .attr("x", function(d){
                return x(d.playerName);
            })
            .attr("width", x.bandwidth)
            .attr("height", function(d){
                return y(d.pts)
            })
            .attr("fill", function(d) {
                return "grey";
            })
            
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

