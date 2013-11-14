/* Colours from colourbrewer http://colorbrewer2.org/ */
var colourScale = d3.scale.quantize()
	.range([ "F7F4F9", "E7E1EF", "D4B9DA", "C994C7", "DF65B0", "E7298A", "CE1256", "980043", "67001F"
			]);

var svgData = [];

var svg = d3.select("body")
				.append("svg");

d3.xml("svg/districts.svg", function (data) {
	var numberOfDistricts = d3.select(data).selectAll("path")[0].length;
		
	dataSet = d3.select(data).selectAll("path")[0];
	
	for (var i = 0; i < dataSet.length; i++) {
		var thisPath = d3.select(dataSet[i]);
		var myObject = {};
		myObject.title = thisPath.attr("title");
		myObject.path = thisPath.attr("d");

		svgData.push(myObject);
	}

	/* At this point svgData now exists as an array of objects 
		each with a 'title' and a 'path' i.e. the name of the district
		and a string containing the svg path information to draw it
		*/

	/*	We now want to load the population data from the CSV file 
		and combine it with information in svgData */
	d3.csv("data/data-population.csv", function (popData) {
		/* Turn the population numbers from strings to numbers */
		popData.forEach(function(d){
			/* radix (mynum, 10) - thanks Dawn   */
			d.population = parseInt(d.population, 10);
		});

		/*	Find out the smallest population and the largest
			for use in the colour scale */
		var minPop = d3.min(popData, function (d) {
			return d.population;
		});

		var maxPop = d3.max(popData, function (d) {
			return d.population;
		});

		colourScale.domain([ minPop, maxPop ]);


		/*	Merge the svgData and the popData
			Loop through once for each object inside svgData
			*/
		for (var i = 0; i < svgData.length; i++) {

			/* Store the title in a var for easy access */
			var thisTitle = svgData[i].title;

			/*	Now loop through popData and try to find a 
				district name that matches the title
				*/
			for (var j = 0; j < popData.length; j++) {

				/*	Store the district in a var for easy access */
				var thisDistrict = popData[j].district;

				/*	If we find a match... */
				if (thisTitle == thisDistrict) {

					/*	... give the svgData object a new property called value
						and assign it the value of the population int we 
						parsed earlier */
					svgData[i].value = popData[j].population;

					/*	May as well stop at this point */
					break;
				}
			}

			/*	If we dont find a match, asign the 'value' property anyway 
				with a value of zero and log the title for debugging */
			if (svgData[i].value === undefined) {
				svgData[i].value = 0;
				// console.log(svgData[i].title + " does not match up!");
			}

		}

		/*	At this point svgData now exists as an array of objects 
			each with a 'title' and a 'path' and value
			We can use this to draw a new map
			*/
		svg.selectAll("path")
			.data(svgData)
			.enter()
			.append("path")
			.attr("d", function(d) {
				return d.path;
			})
			.style("fill", function (d) {
				return colourScale(d.value);
			})
			.attr("transform","scale(0.8)"); // Scale the svg down a bit
	});

});



















