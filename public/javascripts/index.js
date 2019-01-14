import NBA from 'nba';

document.addEventListener('DOMContentLoaded', () => {

    //colorbrewer.org 


    // console.log(Object.getOwnPropertyNames(NBA));
    // console.log(NBA.stats.all);
    // console.log(NBA.prototypes)

    // console.log(Object.getOwnPropertyNames(NBA).filter(function (p) {
    //     return typeof NBA[p] === 'function';
    // }));

    // let lebron = NBA.playerIdFromName('Lebron James');
    // NBA.stats.playerInfo({ PlayerID: lebron }).then(console.log);

   

    var margin = { left:100, right:10, top:10, bottom:100 };

    var width = 820 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var g = d3.select("#chart-area")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
                .append("g")
                     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");      
       
    
    var xAxisGroup = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")

    

    var yAxisGroup = g.append("g")
        .attr("class", "y-axis")

    // xScale
    var x = d3.scaleBand()
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    // yScale
    var y = d3.scaleLinear()
        .range([height, 0]);
        
    g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + 70)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("NBA's Top Scorers");
                     
    g.append("text")
        .attr("class", "y-axis-label")
        .attr("x", - (height /2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("PTS Per Game");


    NBA.stats.playerStats().then( res => { 
        let stats = res.leagueDashPlayerStats;

        console.log(stats);
        
        d3.interval(function(){
            update(stats);
        }, 1000);

        update(stats);


            
    }).catch(function(error){
        console.log(error);
    })


    function update(stats){
        // domain for xScale
        x.domain(stats.map(function (d) {
            if (d.pts > 20) {
                return d.playerName;
            }
        }));

        y.domain([0, d3.max(stats, function (d) {
            return d.pts;
        })]);

        // xAxis
        var xAxisCall = d3.axisBottom(x);

        xAxisGroup.call(xAxisCall)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");
        
        // yAxis
        var yAxisCall = d3.axisLeft(y)
            .ticks(5)
            .tickFormat(function (d) {
                return d;
            });
        yAxisGroup.call(yAxisCall);

        // JOIN new data with old elements

        var rects = g.selectAll("rect")
            .data(stats);
        
        // EXIT old elements 


        // UPDATE old elements present in new data
        

        rects.enter()
            .append("rect")
            .attr("y", function (d) { return y(d.pts); })
            .attr("x", function (d) {
                return x(d.playerName);
            })
            .attr("width", x.bandwidth)
            .attr("height", function (d) {
                return height - y(d.pts);
            })
            .attr("fill", function (d) {
                return "grey";
            })

        console.log(rects);

    }


    // margin = { left: 100, right: 10, top: 10, bottom: 100 };

    // width = 820 - margin.left - margin.right;
    // height = 400 - margin.top - margin.bottom;

    // g = d3.select("#chart-area2")
    //     .append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


    // g.append("text")
    //     .attr("class", "x-axis-label")
    //     .attr("x", width / 2)
    //     .attr("y", height + 240)
    //     .attr("font-size", "20px")
    //     .attr("text-anchor", "middle")
    //     .text("NBA's Top Scorers");

    // g.append("text")
    //     .attr("class", "y-axis-label")
    //     .attr("x", - (height / 2))
    //     .attr("y", -60)
    //     .attr("font-size", "20px")
    //     .attr("text-anchor", "middle")
    //     .attr("transform", "rotate(-90)")
    //     .text("PTS Per Game");

    // NBA.stats.teamStats().then(res => {
    //     let stats2 = res;

    //     console.log(stats2);
        
    //     var x = d3.scaleBand()
    //         .domain(stats2.map(function (d) {
    //             return d.teamName;
    //         }))
    //         .range([0, width])
    //         .paddingInner(0.3)
    //         .paddingOuter(0.3);

    //     var y = d3.scaleLinear()
    //         .domain([0, d3.max(stats2, function (d) {
    //             return d.pts;
    //         })])
    //         .range([height, 0]);


    //     var xAxisCall = d3.axisBottom(x);
    //     g.append("g")
    //         .attr("class", "x axis")
    //         .attr("transform", "translate(0," + height + ")")
    //         .call(xAxisCall)
    //         .selectAll("text")
    //         .attr("y", "10")
    //         .attr("x", "-5")
    //         .attr("text-anchor", "end")
    //         .attr("transform", "rotate(-40)");

    //     var yAxisCall = d3.axisLeft(y)
    //         .ticks(5)
    //         .tickFormat(function (d) {
    //             return d;
    //         });
    //     g.append("g")
    //         .attr("class", "y-axis")
    //         .call(yAxisCall);

    //     var rects = g.selectAll("rect")
    //         .data(stats2);

    //     rects.enter()
    //         .append("rect")
    //         .attr("y", function (d) { return y(d.pts); })
    //         .attr("x", function (d) {
    //             return x(d.teamName);
    //         })
    //         .attr("width", x.bandwidth)
    //         .attr("height", function (d) {
    //             return height - y(d.pts);
    //         })
    //         .attr("fill", function (d) {
    //             return "grey";
    //         })

    // }).catch(function (error) {
    //     console.log(error);
    // })


    // NBA.stats.teamStats().then(console.log)
    // Scatterplot with wRank and fg3mRank
    
    // NBA.stats.teamSplits({TeamID: 1610612744}).then(console.log)
    // Warriors team splits maybe do others as well? dropdown?

    // NBA.stats.playerSplits({PlayerID: lebron}).then(console.log)


    // NBA.stats.teamStats().then(console.log) // doesn't work
    // NBA.stats.playerStats().then(console.log) // doesn't work

    console.dir(NBA.stats)
    console.dir(NBA)
    console.dir(NBA.sportVu)

    // NBA.sportVu.touches().then(console.log)
})  

