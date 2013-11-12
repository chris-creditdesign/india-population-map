### Wikipedia entry of density of population by district
http://en.wikipedia.org/wiki/List_of_districts_of_India

###Population data source
Census data from:
[http://www.census2011.co.in/district.php](http://www.census2011.co.in/district.php)

###Map data sources

1. GADM shapefiles including state, district and taluk level boundaries from: [http://www.filefactory.com/file/61su34uudcjz/n/IND_adm_zip](http://www.filefactory.com/file/61su34uudcjz/n/IND_adm_zip)  
[http://www.gadm.org/download](http://www.gadm.org/download)  
`These data are freely available for academic and other non-commercial use. Redistribution, or commercial use, is not allowed without prior permission.`

2. Solomon Naveen James's Library
Merge of 'India District Boundary' into 'India District Boundary'
[http://geocommons.com/users/SolomonNJ/overlays?order=desc&sort=created](http://geocommons.com/users/SolomonNJ/overlays?order=desc&sort=created)

3. Pre-rendered svg available from [https://gramener.com/indiamap/](https://gramener.com/indiamap/)  
`This is an interactive tool that lets you plot a colour against each district in India.`

4. Uploaded to google group 'datameet' by Arun Ganesh  
[https://groups.google.com/forum/#!topic/datameet/X5kzViRMJKs](https://groups.google.com/forum/#!topic/datameet/X5kzViRMJKs)  
`I got some errors while processing the census data. I have made a combined shapefile with the natural earth data.`  

5. India district map. disticts.svg
From: [http://www.s-anand.net/blog/india-district-map/](http://www.s-anand.net/blog/india-district-map/)  
`districts.svg has has 640 districts (I've no idea what the 641st looks like) and is tagged with the State and District names as titles`  
`I made it from the 2011 census map (0.4MB PDF). I opened it in Inkscape, removed the labels, added a layer for the districts, and used the paint bucket to fill each district's area. I then saved the districts layer, cleaning it up a big. Then I labelled each district with a title. (Seemed like the easiest way to get this done.)`  
[2011 census map 0.4MB PDF](http://www.censusindia.gov.in/2011census/maps/maps2011.html)

Alternative shapefiles showing Indian states but not districts available from:  

1. [Natural Earth](http://www.naturalearthdata.com/downloads/10m-cultural-vectors/)  
  
2. [Maptell](http://www.maptell.com/index.php?option=com_remository&Itemid=159&func=selectfolder&cat=6)  
 

### Convert shapefile to topojson format
(If you're working on a mac) use [homebrew](http://brew.sh/) to install gdal and topojson

You may need to update homebrew first:

	brew update  

then:  

	brew install gdal  

then:  
	
	npm install -g topojson  

#### First convert shape file to geojson

	ogr2ogr \  
		-f GeoJSON \  
		india.json \  
		IND_adm2.shp

#### Then convert the resulting geojson file to topojson

	topojson \  
  		-o india-topo.json \  
  		india.json \  

###Notes
the shapefiles from gadm.org seem to be based on census 2001, since 
they contain (on cursory examination) to have details for around 593 
districts. There are around 640 districts as of census 2011. 