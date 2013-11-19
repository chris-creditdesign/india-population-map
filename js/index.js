/* Colours from colourbrewer http://colorbrewer2.org/ */
var colourScale = d3.scale.linear()
					.domain([100, 200, 300, 400, 500, 600, 700, 800, 900])
					.range([	"#F7F4F9",
								"#E7E1EF",
								"#D4B9DA",
								"#C994C7",
								"#DF65B0",
								"#E7298A",
								"#CE1256",
								"#980043",
								"#67001F"])
					.clamp(true);

/*	Arrays to store all the data */
var svgData = [];
var	wikiData = [];

var svg = d3.select("body")
				.append("svg");

d3.xml("sanand0-districts-5fc7249661ec/districts.svg", function (data) {
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

	/*	We now want to load the population density data from downloaded wikipedia file 
		and combine it with information in svgData */

	$.ajax({
		url: "List_of_districts_of_India.html",
			dataType: 'text',
			success: function(data) {

				var fullData = $(data);
				var table = $(data).find("table.wikitable.sortable tbody tr");
				
				/*	There are 35 tables on the page - the first is a list of all states
					and not particularyl usefull */
				var allTables = $(data).find("table.wikitable.sortable");
				
				for (var i = 1; i < allTables.length; i++) {
					var thisTableRows = allTables.eq(i).find("tbody tr");
					for (var w = 1; w < thisTableRows.length; w++) {
						var newObject = {};
						/* Get the name of the district */
						newObject.district = thisTableRows.eq(w).find("td").eq(1).text();

						var popDensityString = thisTableRows.eq(w).find("td").eq(5).text();
						
						popDensityString = popDensityString.replace(/,/g, '');

						if (  isNaN(parseInt(popDensityString, 10))  ) {
							newObject.popDensity = 0;
						} else {
							newObject.popDensity = parseInt(popDensityString, 10);
						}

						/* Push this newObject into the wikiData array */
						wikiData.push(newObject);
					}
				}

				/*	Merge the svgData and the popData
					Loop through once for each object inside svgData
					*/
				for (var p = 0; p < svgData.length; p++) {

					/* Store the title in a var for easy access */
					var thisTitle = svgData[p].title;

					/*	Now loop through popData and try to find a 
						district name that matches the title
						*/
					for (var j = 0; j < wikiData.length; j++) {

						/*	Store the district in a var for easy access */
						var thisDistrict = wikiData[j].district;
						/*	If we find a match... */
						if (thisTitle == thisDistrict) {

							/*	... give the svgData object a new property called value
								and assign it the value of the population int we 
								parsed earlier */
							svgData[p].value = wikiData[j].popDensity;

							/*	May as well stop at this point */
							break;
						}
					}

					/*	If we dont find a match, asign the 'value' property anyway 
                        with a value of zero and log the title for debugging */
					if (svgData[p].value === undefined) {
						svgData[p].value = 0;
						// console.log(svgData[p].title);
						// console.log("does not match up!");
                    }
				}

				/*	Find out the smallest population and the largest
					for use in the colour scale */
				var minPop = d3.min(svgData, function (d) {
					return d.value;
				});

				var maxPop = d3.max(svgData, function (d) {
					return d.value;
				});


				console.log("svgData is: " + svgData.length);
				console.log("wikiData is: " + wikiData.length);


				/*	At this point svgData now exists as an array of objects 
					each with a 'title' and a 'path' and value
					We can use this to draw a new map
					*/
				var svgDistricts = svg.selectAll("path")
					.data(svgData)
					.enter()
					.append("path")
					.attr("d", function(d) {
						return d.path;
					})
					.style("fill", function (d) {
						if (d.value === 0) {
							return "#666";
						} else {
							return colourScale(d.value);
						}
					})
					.attr("transform","scale(0.8)"); // Scale the svg down a bit

				svgDistricts.on("mouseover", function (d) {
					console.log("District: " + d.title + " Value: " + d.value + " colour: " + colourScale(d.value));
				});


			} /*	end of success */
		}); /*	End of ajax */
}); /* End of xml load svg */



















