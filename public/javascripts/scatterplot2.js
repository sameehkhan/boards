import NBA from 'nba';

function scatterplot2(){
//width and height
    var margin = { left: 80, right: 10, top: 80, bottom: 80 };

    var h = 580 - margin.top - margin.bottom;
    var w = 980 - margin.left - margin.right;

    var padding = 40;

    var res = [];
    
    var tip = d3.tip().attr('class', 'd3-tip')
        .html(function (d) {
            var text = "<strong class='tip-hover'>Name:</strong> <span class='tip-hover' style='color:red'>" + d.teamName + "</span><br>";
            text += "<strong class='tip-hover'>3PM:</strong> <span class='tip-hover' style='color:red'>" + d.fG3M + "</span><br>";
            text += "<strong class='tip-hover'>Win %:</strong> <span class='tip-hover' style='color:red'>" + d.wPct + "</span><br>";
            // text += "<strong class='tip-hover'>AST:</strong> <span class='tip-hover' style='color:red'>" + d.ast + "</span><br>";
            // text += "<strong class='tip-hover'>REB:</strong> <span class='tip-hover' style='color:red'>" + d.reb + "</span><br>";
            // text += "<strong class='tip-hover'>TS %:</strong> <span class='tip-hover' style='color:red'>" + trueShooting(d.fga, d.fta, d.pts).toFixed(3) + "</span><br>";
            // text += "<strong class='tip-hover'>TEAM:</strong> <span class='tip-hover' style='color:red'>" + d.teamAbbreviation + "</span><br>";

            return text;
        })

    NBA.stats.teamStats().then(res => {

    //    res.forEach( stats => {
    //        res.push([stats.fg3mRank, stats.wRank, stats.teamName])
    //    });

       console.log(res);

        //scale function
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(res, function (d) { return d.fg3mRank; })])
            .range([padding, w - padding * 2]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(res, function (d) { return d.wPctRank; })])
            .range([h-padding, padding]);

        var xAxis = d3.axisBottom().scale(xScale).ticks(5);

        var yAxis = d3.axisLeft().scale(yScale).ticks(5);

        var svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            // .append("text")
            // .attr("class", "x-axis-label")
            // .attr("x", width / 2)
            // .attr("y", -30)
            // .attr("font-size", "20px")
            // .attr("text-anchor", "middle")
            // .text("3's Made vs. Win %");


        svg.call(tip);

        svg.selectAll("circle")
            .data(res)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.fg3mRank);
            })
            .attr("cy", function (d) {
                return yScale(d.wPctRank);
            })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)

            .attr("r", 7)
            .attr("fill", "green");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + padding + ", 0)")
            .call(yAxis);

    });


}

export default scatterplot2;