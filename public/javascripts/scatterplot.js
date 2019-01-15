import NBA from 'nba';

function scatterplot() {
    
    var margin = { left: 100, right: 10, top: 100, bottom: 100 };

    var width = 1000 - margin.left - margin.right;
    var height = 480 - margin.top - margin.bottom;

    var flag = true;

    var t = d3.transition().duration(500);

    var g = d3.select("#chart-area2")
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
        .paddingInner(0.2)
        .paddingOuter(0.2);

    // yScale
    var y = d3.scaleLinear()
        .range([height, 0]);

    // x label
    g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", -30)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("3's Made vs. Win %");

    // y label
    var yLabel = g.append("text")
        .attr("class", "y-axis-label")
        .attr("x", - (height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("PTS Per Game");


    NBA.stats.teamStats().then(res => {

        console.log(res);

        d3.interval(function () {
            update(res);
            flag = !flag;
        }, 1250);

        update(res);



    }).catch(function (error) {
        console.log(error);
    })


    function update(res) {

        var value = flag ? "wPctRank" : "fg3mRank";

        // domain for x and y
        x.domain(res.map(function (d) { return d.teamName; }));
        y.domain([0, d3.max(res, function (d) { return d[value]; })]);

        // xAxis
        var xAxisCall = d3.axisBottom(x);
        xAxisGroup.transition(t).call(xAxisCall)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");

        // yAxis
        var yAxisCall = d3.axisLeft(y)
            .ticks(5)
            .tickFormat(function (d) {return d;});
        yAxisGroup.transition(t).call(yAxisCall);

        // JOIN new data with old elements

        var rects = g.selectAll("circle")
            .data(res);

        // EXIT old elements 
        rects.exit()
            .attr("fill", "red")
            .transition(t)
            .attr("cy", y(0))
            .attr("height", 0)
            .remove(); 


        // ENTER
        rects.enter()
            .append("circle")
            .attr("cx", function (d) {return x(d.teamName);})
            .attr("cy", y(0))
            .attr("fill", "grey")
            .attr("r", 10)

            .merge(rects)
            .transition(t)
                .attr("cx", function(d){ return x(d.teamName) + x.bandwidth() /2;})
                .attr("cy", function (d) { return y(d[value]); });

        var label = flag ? "Win Percentage" : "3's Made Per Game";

        yLabel.text(label);
        console.log(rects);

    }
}

export default scatterplot;