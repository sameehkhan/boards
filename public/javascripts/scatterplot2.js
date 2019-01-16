import NBA from 'nba';

function scatterplot2(){
//width and height
    var margin = { left: 75, right: 28, top: 140, bottom: 100 };

    var h = 750- margin.top - margin.bottom;
    var w = 1020 - margin.left - margin.right;

    var padding = 40;


    var teamColors = {
        "Golden State Warriors": 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png',
        "Atlanta Hawks": 'https://a.espncdn.com/i/teamlogos/nba/500/atl.png',
        "Brooklyn Nets": 'https://a.espncdn.com/i/teamlogos/nba/500/bkn.png',
        "Boston Celtics": 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
        "Charlotte Hornets": "https://a.espncdn.com/i/teamlogos/nba/500/cha.png",
        "Chicago Bulls": "https://a.espncdn.com/i/teamlogos/nba/500/chi.png",
        "Cleveland Cavaliers": 'https://a.espncdn.com/i/teamlogos/nba/500/cle.png',
        "Dallas Mavericks": 'https://a.espncdn.com/i/teamlogos/nba/500/dal.png',
        "Denver Nuggets": 'https://a.espncdn.com/i/teamlogos/nba/500/den.png',
        "Detroit Pistons": 'https://a.espncdn.com/i/teamlogos/nba/500/det.png',
        "Houston Rockets": 'https://a.espncdn.com/i/teamlogos/nba/500/hou.png',
        "Indiana Pacers": "https://a.espncdn.com/i/teamlogos/nba/500/ind.png",
        "Los Angeles Lakers": 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
        "LA Clippers": 'https://a.espncdn.com/i/teamlogos/nba/500/lac.png',
        "Memphis Grizzlies": 'https://a.espncdn.com/i/teamlogos/nba/500/mem.png',
        "Miami Heat": 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png',
        "Milwaukee Bucks": 'https://a.espncdn.com/i/teamlogos/nba/500/mil.png',
        "Minnesota Timberwolves": 'https://a.espncdn.com/i/teamlogos/nba/500/min.png',
        "New Orleans Pelicans": 'https://a.espncdn.com/i/teamlogos/nba/500/nor.png',
        "New York Knicks": 'https://a.espncdn.com/i/teamlogos/nba/500/nyk.png',
        "Oklahoma City Thunder": 'https://a.espncdn.com/i/teamlogos/nba/500/okc.png',
        "Orlando Magic": 'https://a.espncdn.com/i/teamlogos/nba/500/orl.png',
        "Philadelphia 76ers": 'https://a.espncdn.com/i/teamlogos/nba/500/phi.png',
        "Phoenix Suns": 'https://a.espncdn.com/i/teamlogos/nba/500/phx.png',
        "Portland Trail Blazers": 'https://a.espncdn.com/i/teamlogos/nba/500/por.png',
        "Sacramento Kings": 'https://a.espncdn.com/i/teamlogos/nba/500/sac.png',
        "San Antonio Spurs": 'https://a.espncdn.com/i/teamlogos/nba/500/sas.png',
        "Toronto Raptors": 'https://a.espncdn.com/i/teamlogos/nba/500/tor.png',
        "Utah Jazz": 'https://a.espncdn.com/i/teamlogos/nba/500/utah.png',
        "Washington Wizards": "https://a.espncdn.com/i/teamlogos/nba/500/was.png"
    }
    
    var tip = d3.tip().attr('class', 'd3-tip')
        .html(function (d) {
            var text = "<strong class='tip-hover'>TEAM:</strong> <span class='tip-hover' style='color:#FF4D4D'>" + d.teamName + "</span><br>";
            text += "<strong class='tip-hover'>RECORD:</strong> <span class='tip-hover' style='color:#FF4D4D'>" + d.w + '-' + d.l + "</span><br>";
            text += "<strong class='tip-hover'>FG%:</strong> <span class='tip-hover' style='color:#FF4D4D'>" + d.fgPct + "</span><br>";
            text += "<strong class='tip-hover'>3PM:</strong> <span class='tip-hover' style='color:#FF4D4D'>" + d.fG3M + "</span><br>";
            // text += "<strong class='tip-hover'>AST:</strong> <span class='tip-hover' style='color:#FF4D4D'>" + d.ast + "</span><br>";
            // text += "<strong class='tip-hover'>REB:</strong> <span class='tip-hover' style='color:#FF4D4D'>" + d.reb + "</span><br>";
            // text += "<strong class='tip-hover'>TS %:</strong> <span class='tip-hover' style='color:#FF4D4D'>" + trueShooting(d.fga, d.fta, d.pts).toFixed(3) + "</span><br>";
            // text += "<strong class='tip-hover'>TEAM:</strong> <span class='tip-hover' style='color:#FF4D4D'>" + d.teamAbbreviation + "</span><br>";

            return text;
        })

    NBA.stats.teamStats().then(res => {

    //    res.forEach( stats => {
    //        res.push([stats.fg3mRank, stats.wRank, stats.teamName])
    //    });

       console.log(res);

    


        var xScale = d3.scaleLinear()
            .domain([1.25, d3.max(res, function (d) { return d.fg3mRank; })])
            .range([padding, w - padding * 2 + 40]);

        var yScale = d3.scaleLinear()
            .domain([-4, d3.max(res, function (d) { return d.wPctRank; })])
            .range([h-padding, padding]);

        var xAxis = d3.axisBottom().scale(xScale).ticks(3)

        // xAxis.attr('font-size', "17px")

        var yAxis = d3.axisLeft().scale(yScale).ticks(3);

        var svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            

        var yLabel = svg.append("text")
            // .attr("class", "x-axis-label")
            .attr("x", w / 2)
            .attr("y", -40)
            .attr("font-size", "40px")
            .attr("text-anchor", "middle")
            .text("More 3's, more wins?")
            .attr("class", 'title');


        var yLabel2 = svg.append("text")
            .attr("class", "axis-label")
            .attr("x", w / 2)
            .attr("y", 560)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text("3PM");

        var xlabel = svg.append("text")
            .attr("class", "axis-label")
            .attr("x", - (h / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Win %");


        svg.call(tip);

        var fillCircle = svg.selectAll("image")
            .data(res)
            .enter()
            .append("image")

            .attr("x", function (d) {
                return xScale(d.fg3mRank);
            })
            .attr("y", function (d) {
                return yScale(d.wPctRank);
            })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .attr("r", 10)
            .attr("xlink:href", function (d) {
                return teamColors[d.teamName];
            })
            .attr("width", 70)
            .attr("height", 70)
            .attr("class","nba-scatter")



        svg.append("g")
            .attr("class", "bar-y")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis)
            .attr('font-size', '17px')
            .attr("stroke-width", '1');


        svg.append("g")
            .attr("class", "bar-y")
            .attr("transform", "translate(" + padding +", 0)")
            .call(yAxis)
            .attr('font-size', '17px')
            .attr("stroke-width", '1');


    });


}

export default scatterplot2;