
 var color = d3.scale.quantize()
	.range([	
				"rgb(237,248,233)", 
				"rgb(186,228,179)",
				"rgb(116,196,118)", 
				"rgb(49,163,84)",
				"rgb(0,109,44)"
			]);

var svgData = [];

d3.xml("svg/districts.svg", function (data) {
	var numberOfDistricts = d3.select(data).selectAll("path")[0].length;
		
	dataSet = d3.select(data).selectAll("path")[0];
	
	for (var i = 0; i < dataSet.length; i++) {
		var thisPath = d3.select(dataSet[i]);
		var myObject = {}
		myObject.title = thisPath.attr("title");
		myObject.path = thisPath.attr("d");

		svgData.push(myObject);
	};

	/* 	At this point svgData now exists as an array of objects 
		each with a title i.e. the name of the district and a path
		which a string containing the svg path information
		*/
	console.log(svgData[0]);


	d3.csv("data/data-population.csv", function (data) {
		// Turn the population numbers from strings to numbers
		data.forEach(function(d){
			d.Population = parseInt(d.Population);
		}); 

		var minPop = d3.min(data, function (d) {
			return d.Population;
		});

		var maxPop = d3.max(data, function (d) {
			return d.Population;
		});

	});

})







// d3.select("svg").selectAll("path").attr({"fill":function(){
	
// 	if (d3.select(this).attr("title") == "Agra" ) {
// 		return "hotpink";
// 	} else {
// 		return "cornflowerblue";
// 	}

// } });