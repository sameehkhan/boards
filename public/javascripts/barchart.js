import NBA from 'nba';

function barchart() {
    // NBA.findBy("Lebron James")
    // console.dir(NBA);
    // let lebron = NBA.playerIdFromName('Lebron James');
    // // console.log(lebron)
    // NBA.stats.playerInfo({ PlayerID: lebron }).then(console.log);

    var margin = { left: 87, right: 20, top: 180, bottom: 110 };

    var width = 1080 - margin.left - margin.right;
    var height = 630 - margin.top - margin.bottom;

    // Tooltip 

    var flag = true;

    const lastName = (name) => {
        let last = name.split(" ")
        if (last.length > 2){
            last.shift();
            return last.join(" ");
        }
        return last.reverse()[0];
    }

    const trueShooting = (fga, fta, pts) => {
        let tsa = fga + ( 0.44 * fta)
        return pts / (2 * tsa);
    }

    var t = d3.transition().duration(1000);

    var g = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    var tip = d3.tip().attr('class', 'd3-tip')
        .html(function (d) { 
            var text = "<strong class='tip-hover'>PLAYER:</strong> <span class='tip-hover' style='color:#FF4D4D'>" +d.playerName +"</span><br>";
            text += "<strong class='tip-hover'>PTS:</strong> <span class='tip-hover' style='color:#FF4D4D'>" +d.pts +"</span><br>";
            text += "<strong class='tip-hover'>AST:</strong> <span class='tip-hover' style='color:#FF4D4D'>" +d.ast +"</span><br>";
            text += "<strong class='tip-hover'>REB:</strong> <span class='tip-hover' style='color:#FF4D4D'>" +d.reb +"</span><br>";
            text += "<strong class='tip-hover'>TS %:</strong> <span class='tip-hover' style='color:#FF4D4D'>" +trueShooting(d.fga, d.fta, d.pts).toFixed(3) +"</span><br>";
            text += "<strong class='tip-hover'>TEAM:</strong> <span class='tip-hover' style='color:#FF4D4D'>" + d.teamAbbreviation + "</span><br>";

            return text;
         })
    g.call(tip);

    var xAxisGroup = g.append("g")
        .attr("class", "bar-domain")
        .attr("transform", "translate(0," + height + ")")
        .attr('font-size', '20px')
        .attr("stroke-width", '1.5');



    var yAxisGroup = g.append("g")
        .attr("class", "y-axis")
        .attr("stroke-width", '1.5');


    // xScale
    var x = d3.scaleBand()
        .range([0, width])
        .paddingInner(0.15)
        .paddingOuter(0.1);

    // yScale
    var y = d3.scaleLinear()
        .range([height, 0]);

    // x label
    g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", -100)
        .attr("font-size", "40px")
        .attr("text-anchor", "middle")
        .text("SCORING EFFICIENCY")
        .attr("class", 'title')

    // y label
    var yLabel = g.append("text")
        .attr("class", "axis-label")
        .attr("x", - (height / 2))
        .attr("y", -70)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Points Per Game");


    NBA.stats.playerStats().then(res => {
        let stats = res.leagueDashPlayerStats.filter( stat => {
            if (stat.fG3M < 6 && stat.pts > 19){
                return stat;
            }
        });

        // console.log(stats);

        d3.interval(function () {
            update(stats);
            flag = !flag;
        }, 2500);

        update(stats);



    }).catch(function (error) {
        console.log(error);
    });

    function update(stats) {

        var teamColors = {
            "GSW": '#006bb8',
            "ATL": '#E03A3E' ,	
            "BKN" : 'black',
            "BOS": '#007A33',
            "CHA": "#1D1160",
            "CHI": "#CE1141",
            "CLE": '#6F263D',
            "DAL": '#00538C',
            "DEN": '#0E2240',
            "DET": '#C8102E',
            "HOU": '#CE1141',
            "IND": '#002D62',
            "LAC": '#C8102E',
            "LAL": '#FDB927',
            "MEM": '#5D76A9',
            "MIA": '#98002E',
            "MIL": '#00471B',	
            "MIN": '#0C2340',	
            "NOP": '#0C2340',	
            "NYK": '#F58426',	
            "OKC": '#EF3B24',	
            "ORL": '#0077C0',	
            "PHI": '#006BB6',	
            "PHX": '#1D1160',	
            "POR": '#E03A3E',	
            "SAC": '#5A2D81', 
            "SAS": '#C4CED4;',
            "TOR": '#CE1141',
            "UTA": '#002B5C',	
            "WAS": "#002B5C"
        }


        var value = flag ? 'pts' : "ts";

        // domain for xScale
        x.domain(stats.map(function (d) {
            if (d.pts > 19) {
                return lastName(d.playerName);
            }
        }));

        y.domain([0, d3.max(stats, function (d) { 
            if (value === 'pts'){
                return d.pts;
            }else{
                return trueShooting(d.fga, d.fta, d.pts).toFixed(3)
            }
        
        })]);
        

        // xAxis
        var xAxisCall = d3.axisBottom(x);

        xAxisGroup.transition(t).call(xAxisCall)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("font-size", "17px")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");

        // yAxis
        var yAxisCall = d3.axisLeft(y)
            .ticks(5)
            .tickFormat(function (d) {
                return d;
            });
        yAxisGroup.transition(t).call(yAxisCall)

        // JOIN new data with old elements

        var rects = g.selectAll("rect")
            .data(stats);

        // EXIT old elements 
        rects.exit()
            .attr("fill", "#FF4D4D")
            .transition(t)
            .attr("y", y(0))
            .attr("height", 0)
            .remove();


        // UPDATE old elements present in new data
        rects.transition(t)
            .attr("y", function (d) { 
                if (value === 'pts') {
                    return y(d.pts);
                } else {
                    return y(trueShooting(d.fga, d.fta, d.pts).toFixed(3))
                }
             })
            .attr("x", function (d) { return x(lastName(d.playerName)); })
            .attr("height", function (d) { 
                if (value === 'pts') {
                    return height - y(d.pts);
                } else {
                    return height - y(trueShooting(d.fga, d.fta, d.pts).toFixed(3));
                }
                
                // return height - y(d[value]); 
            
            })
            .attr("width", x.bandwidth)
            .attr("class", "nba-bars")

        
        // ENTER
        rects.enter()
            .append("rect")
            .attr("x", function (d) {
                return x(lastName(d.playerName));
            })
            .attr("fill", function (d) {
                return teamColors[d.teamAbbreviation]
            })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .attr("width", x.bandwidth)
            .attr("y", y(0))
            .attr("height", 0)
            .transition(t)
            .attr("height", function (d) {
                return height - y(d[value]);
            })
            .attr("y", function (d) {
                if (value === 'pts') {
                    return y(d.pts);
                } else {
                    return y(trueShooting(d.fga, d.fta, d.pts).toFixed(3));
                }
                // return y(d[value]); })
            })
            .attr("class", "nba-bars");






        var label = flag ? "Points Per Game" : "True Shooting %";

        yLabel.text(label);
        // console.log(rects);

    }
}

export default barchart;