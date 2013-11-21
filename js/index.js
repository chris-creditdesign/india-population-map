/* Set up variables
--------------------------------------------------------------------*/

/*	D3 scale used to colour the svg paths according the 
	value of the corresponding population density
	Colours and divisions are governed by the print layout */
var colourScale = d3.scale.quantile()
					.domain([1400, 1200, 1000, 800, 600, 400, 200, 0])
					.range([	"#FFEFAE",
								"#FFD756",
								"#E3B476",
								"#C99084",
								"#B16C88",
								"#9A4585",
								"#831F81",
								"#510C4D"]);

/*	Array to store all data extracted from the wikipedia page */
var	wikiData = [];

/*	Select all of the paths contained within the svg sitting in the 
	docunment and store them in a D3 object/array */
var svg = d3.select("body > svg")
				.selectAll("path")[0];


/* Ajax call 
--------------------------------------------------------------------*/

/*	We now want to load the population density data from downloaded wikipedia file 
	and match it with the paths in the svg */

$.ajax({
	url: "List_of_districts_of_India.html",
		dataType: 'text',
		success: function(data) {

			/* Extract data from HTML tables
			--------------------------------------------------------------------*/
			
			/*	There are 35 tables on the page - the first is a list of all states
				and not particularyl usefull */
			var allTables = $(data).find("table.wikitable.sortable");
			
			/*	Loop through all of the tables, starting at index 1, and store the 
				name of the district and the population density of each element
				as properites of an object within the array wikiData */
			for (var i = 1; i < allTables.length; i++) {
				var thisTableRows = allTables.eq(i).find("tbody tr");
				for (var w = 1; w < thisTableRows.length; w++) {
					var newObject = {};
					/* Get the name of the district */
					newObject.district = thisTableRows.eq(w).find("td").eq(1).text();

					/* Get the population density number as astring */
					var popDensityString = thisTableRows.eq(w).find("td").eq(5).text();
					
					/* Try to remove the commmas */
					popDensityString = popDensityString.replace(/,/g, '');

					/*	Some of the districts do not have a population density
						listed. If so, assign a value of zero. Otherwise convert
						the sting to an int and assign it */
					if (  isNaN(parseInt(popDensityString, 10))  ) {
						newObject.popDensity = 0;
						console.log(newObject);
					} else {
						newObject.popDensity = parseInt(popDensityString, 10);
					}

					/* Push this newObject into the wikiData array */
					wikiData.push(newObject);
				}
			}

			/* Apply colours to the svg paths
			--------------------------------------------------------------------*/

			/*	At this point wikiData is an array of objects each containing a 
				name of a district and an integer for its population density.
				We can now cross reference the names with the titles of the svg paths 
				in order to colour the paths. First we loop through all of the paths...
				*/

			for (var p = 0; p < svg.length; p++) {

				/* Store the title of the path in a var for easy access */
				var thisTitle = d3.select(svg[p]).attr("title");

				/*	Now loop through wikiData and try to find a 
					district name that matches the title
					*/
				for (var j = 0; j < wikiData.length; j++) {

					/*	Store the district in a var for easy access */
					var thisDistrict = wikiData[j].district;
					/*	If we find a match use the colourScale to give the path
						the correct fill attribute for its population density.
						If the population density is zero we can assume no data 
						so colour the path black.
						*/
					if (thisTitle == thisDistrict) {
						d3.select(svg[p]).attr("fill", function () {
							if ( wikiData[j].popDensity === 0 ) {
								return "#000000";
							} else {
								return colourScale(wikiData[j].popDensity);
							}
						});
						/*	May as well stop at this point */
						break;
					}
				}

				/*	If we dont find a match the path will keep its default
					fill of black */

			}

		} /*	end of success */
	}); /*	End of ajax */




















