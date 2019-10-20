var saveColors = [];

var margin = {top: 20, right: 30, bottom: 35, left: 50};

var width = 960 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;

var buildChart = function(){
    
    var filterData = function(jsonfile){
        return jsonfile.map(function(part){
            part.sleep = part.sleep.filter(function(value){
                return value.infoCode==0;
            })
            return part;
        })
    }
    
    var stackData = function(jsonData){
        var all_participant_nights = [];
        var x = 0;
        var parts = jsonData.map(function(person){
            var all_nights = person.sleep.map(function(night, i){
                var prev = 0;
                var single_night = night.levels.data.map(function(phase, j, dataArr){
                    var obj = {x:x, level:phase.level, y:phase.seconds, y0: prev}
                    prev += phase.seconds;
                    return obj;
                });
                x++;
                return single_night;
            });
            all_participant_nights = all_participant_nights.concat(all_nights);
        })
        return all_participant_nights;
    }
    
    var getYScale = function(data1, data2){
        
        var yMax1 = d3.max(data1, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  });
        var yMax2 = d3.max(data2, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  });
        
        var totalMax;
        
        yMax1 > yMax2 ? totalMax = yMax1 : totalMax = yMax2;
        
        var y = d3.scaleLinear()
        .domain([0, totalMax])
        .range([height, 0]);
        
        return y;
    }
    
    var graphData = function(dataset, yScale, divId, title){
        d3.select(divId).append("h1").text(title);
        var svg = d3.select(divId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = d3.scaleLinear()
        .domain([0,dataset.length])
        .range([0,width])
        
        var y = yScale;
        
        var nights = svg.selectAll("g")
        .data(dataset)
        .enter().append("g")
        .attr("class",function(d,i){
            return "night"+i;
        });
        
        var rect = nights.selectAll("rect")
        .data(function(d){return d})
        .enter()
        .append("rect")
        .attr("x", function(d) { 
            return x(d.x)
        })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("width", width/dataset.length)
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .attr("id", function(d){return d.level});
        
        // Add scales to axis
        var x_axis = d3.axisBottom()
        .scale(x);
        
        var y_axis = d3.axisLeft(y)
        .tickFormat(function(d){
            return d3.format("d")(d/3600);
        })
        
        //Append group and insert axis
        svg.append("g")
        .attr("transform", "translate(0, " + height  +")")
        .call(x_axis);
        
        svg.append("g")
        .attr("transform", "translate(0, 0)")
        .call(y_axis);
        
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Time Asleep (hours)");  
        
        svg.append("text")             
        .attr("transform",
        "translate(" + (width/2) + " ," + 
        (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("");
        
    }
    
    var drawLegend = function(){
        svg = d3.select("svg")
        var phases = ["wake", "deep", "light", "rem"];
        var colors = phases.map((c) => {
            return {phase:c, color:getComputedStyle(document.getElementById(c)).getPropertyValue("fill")}
        })
        
        console.log(colors);
        
        // Draw legend
        var legend = svg.selectAll(".legend")
        .data(phases)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 19 + ")"; });
        
        legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("id", function(d) {return d})
        .on("mouseover", function(d){
            handleOver(d,phases);
        })
        .on("mouseout", function(d){
            handleOff(colors);
        })
        
        legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d){ return d});
    }
    
    var handleOver = function(d, phases){
        phases.forEach((change) => {
            if(change!=d){
                document.querySelectorAll("#"+change).forEach(function(d){
                    d.style.fill = "gray";
                })
            }
        })
    }
    
    var handleOff = function(colors){
        colors.forEach((segment) => {
            document.querySelectorAll("#"+segment.phase).forEach(function(d){
                d.style.fill = segment.color;
            })
        })
    }
    
    
    var getColor = function(d){
        switch(d.level) {
            case "wake":
            return "#FF0000"
            break;
            case "light":
            return "#00FF00"
            break;
            case "deep":
            return "#0000FF"
            break;
            case "rem":
            return "#00FFFF"
            break;
            default:
            console.log(d.level);
            return "#FFFFFF"
        } 
    }
    
    //Procedures
    
    var ntpFiltered = filterData(ntpjson);
    var ntpNights = stackData(ntpFiltered);
    
    var ndvFiltered = filterData(ndvjson);
    var ndvNights = stackData(ndvFiltered);
    
    var yScale = getYScale(ndvNights, ntpNights);
    
    
    
    graphData(ntpNights, yScale, "#col1", "Neurotypical Sleep Habits");
    graphData(ndvNights, yScale, "#col2", "Neurodiverse Sleep Habits");
    
    drawLegend();
    
    
}

loadAllData(buildChart);



