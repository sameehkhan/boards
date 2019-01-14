// import NBA from 'nba';


// document.addEventListener('DOMContentLoaded', () => {

// var margin = { left: 100, right: 10, top: 10, bottom: 100 };

// var width = 820 - margin.left - margin.right;
// var height = 400 - margin.top - margin.bottom;

// var g = d3.select("#chart-area")
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

// NBA.stats.playerStats().then(res => {
//     let stats = res.leagueDashPlayerStats;

//     console.log(stats);

//     var x = d3.scaleBand()
//         .domain(stats.map(function (d) {
//             if (d.pts > 20) {
//                 return d.playerName;
//             }
//         }))
//         .range([0, width])
//         .paddingInner(0.3)
//         .paddingOuter(0.3);

//     var y = d3.scaleLinear()
//         .domain([0, d3.max(stats, function (d) {
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
//         .data(stats);

//     rects.enter()
//         .append("rect")
//         .attr("y", function (d) { return y(d.pts); })
//         .attr("x", function (d) {
//             return x(d.playerName);
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

// })