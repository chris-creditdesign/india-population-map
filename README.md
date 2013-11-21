# India population map
Population density by district.  
Infographic for @naturenews

## In order to aquire the data

Use curl to download the contentl of [http://en.wikipedia.org/wiki/List_of_districts_of_India](http://en.wikipedia.org/wiki/List_of_districts_of_India)  

	curl -O http://en.wikipedia.org/wiki/List_of_districts_of_India

Then give it the html file extension

	mv "List_of_districts_of_India" "List_of_districts_of_India.html"

Download a zip file of containing a prerendered svg from bitbucket via [http://www.s-anand.net/blog/india-district-map/](http://www.s-anand.net/blog/india-district-map/)  
`districts.svg has has 640 districts (I've no idea what the 641st looks like) and is tagged with the State and District names as titles`
[https://bitbucket.org/sanand0/districts/get/5fc7249661ec.zip](https://bitbucket.org/sanand0/districts/get/5fc7249661ec.zip)

	curl -O https://bitbucket.org/sanand0/districts/get/5fc7249661ec.zip

Then unzip it:

	unzip 5fc7249661ec.zip


Copy the the svg content into a the html file `index.html`

Unfortunately at this point in is neccessary to make around 140 amends to the SVG so 
that the distcrict names correspond with Wikipedia to account for alternate spellings, ampersands etc..
The amends are listed in `mismatches.csv` and also below.


| Name  |  Replacement |
| ---- | ---- |
| Paschim Champaran  |  No DATA |
| Purba Champaran  |  East Champaran  |
| Kaimur (Bhabua)  |  Kaimur |
| Dharbanga  |  Darbhanga |
| "Madhopura =	"  |  Madhepura |
| Vaishali  |  NO DATA |
| Hazaribagh  |  Hazaribag |
| Kodarma  |  Koderma |
| Saraikela-Kharsawan  |  Seraikela Kharsawan |
| Purbi Singhbhum  |  East Singhbhum |
| Paschimi Singhbhum  |  West Singhbhum |
| Puruliya  |  Purulia |
| Barddhaman  |  Bardhaman |
| North Twenty Four Parganas  |  North 24 Parganas |
| South Twenty Four Parganas  |  South 24 Parganas  |
| Hugli  |  Hooghly |
| Haora  |  Howrah |
| Darjiling  |  Darjeeling |
| Koch Bihar  |  Cooch Behar |
| West District  |  West Sikkim  |
| North District  |  North Sikkim  |
| East District  |  East Sikkim  |
| South District  |  South Sikkim  |
| Sivasagar  |  Sibsagar |
| Morigaon  |  Marigaon |
| Leh (Ladakh)  |  Leh |
| Rajouri  |  Rajauri |
| Punch  |  Poonch |
| Baramula  |  Baramulla |
| Bandipore  |  Bandipora |
| Shupiyan  |  Shopian |
| Lahul & Spiti  |  Lahaul and Spiti |
| SAS Nagar  |  Ajitgarh (Mohali) |
| Muktsar  |  Sri Muktsar Sahib |
| SBS Nagar  |  Shahid Bhagat Singh Nagar |
| Yamunanagar  |  Yamuna Nagar |
| Hisar  |  Hissar |
| Uttarakshi  |  Uttarkashi |
| Garhwal  |  Pauri Garhwal |
| Hardwar  |  Haridwar |
| Jhunhjunun  |  Jhunjhunu |
| Dhaulpur  |  Dholpur |
| Chittaurgarh  |  Chittorgarh |
| Dungarpur  |  Dungapur |
| Jalor  |  Jalore |
| Nagaru  |  Nagaur |
| Ahmadabad  |  Ahmedabad  |
| Amreli  |  Amreli district |
| Banas Kantha  |  Banaskantha |
| Sabar Kantha  |  Sabarkantha |
| Panch Mahals  |  Panchmahal |
| Dohad  |  Dahod |
| Vadadora  |  Vadodara |
| Mahesana  |  Mehsana |
| Kachchh  |  Kutch |
| Sindhugurg  |  Sindhudurg |
| Mumbai Suburban  |  Mumbai suburban  |
| Mumbai  |  Mumbai City |
| Buldana  |  Buldhana |
| Gondiya  |  Gondia  |
| Ahmadnagar  |  Ahmednagar |
| Jaina  |  Jalna |
| Bid  |  Beed |
| Chikkaballapura  |  Chikkaballapur |
| Bangalore  |  Bangalore Urban |
| Chamarajanagar  |  Chamarajnagar |
| Haveri  |  Haveri district |
| Chikmagalur  |  Chikkamagaluru |
| Visakhapatnam  |  Vishakhapatnam |
| Sri Potti Sriramulu Nellore  |  Sri Potti Sri Ramulu Nellore |
| Rangareddi  |  Ranga Reddy  |
| Y.S.R.  |  Cudappah |
| Thiruvallur  |  Tiruvallur |
| Kancheepuram  |  Kanchipuram |
| Thiruvarur  |  Tiruvarur |
| Thoothukkudi  |  Thoothukudi |
| Kanniyakumari  |  Kanyakumari |
| Dingugul  |  Dindigul |
| Tiruppur  |  Tirupur |
| The Nilgiris  |  Nilgiris |
| Tiruchinappalli  |  Tiruchirappalli |
| Sivagangai  |  Sivaganga |
| Kasargod  |  Kasaragod |
| Pathanarothitta  |  Pathanamthitta |
| Nabarangapur  |  Nabarangpur |
| Bargarh  |  Bargarh (Baragarh) |
| Sundargarh  |  Sundergarh NO DATA |
| Kendujhar  |  Kendujhar (Keonjhar) |
| Baleshwar  |  Balasore |
| Jagatsinghapur  |  Jharsuguda |
| Subarnapur  |  Subarnapur (Sonepur) |
| Debagarh  |  Debagarh (Deogarh) |
| Anugul  |  Angul |
| Jajapur  |  Jajpur |
| Baudh  |  Boudh (Bauda) |
| Dakshin Bastar Dantewada  |  Dantewada  |
| Uttar Bastar Kanker  |  Kanker |
| Kabeerdham  |  Kabirdham (formerly Kawardha)  |
| Janjgir - Champa  |  Janjgir-Champa  |
| Ashoknagar  |  Ashok Nagar |
| East Nimar  |  Khandwa (East Nimar) |
| West Nimar  |  Khargone (West Nimar) |
| Narsimhapur  |  Narsinghpur |
| GBN Faridabad  |  Gautam Buddh Nagar |
| Baghpat  |  Bagpat |
| Phule   |  NO DATA part of Jyotiba Phule Nagar |
| Kheri  |  Lakhimpur Kheri |
| Shrawasti  |  Shravasti |
| Mahraganj  |  Maharajganj |
| Chandraili  |  Chandauli |
| Kanpur Dehat  |  Ramabai Nagar (Kanpur Dehat) |
| Mahamaya Nagar  |  Hathras |
| Kanshiram Nagar  |  Kanshi Ram Nagar  |
| Jyotiba Nagar  |  Jyotiba Phule Nagar |
| Kanpur Nagar  |  Kanpur |
| Bara Banki  |  Barabanki |
| SKN  |  Sant Kabir Nagar |
| Jaunpur  |  Jaunpur district |
| SRNB  |  Sant Ravidas Nagar |
| Rae Bareli  |  Raebareli |
| North and Middle Andaman  |  North and Middle Andaman |
| South West  |  South West Delhi |
| West  |  West Delhi |
| North West  |  North West Delhi |
| North  |  North Delhi |
| North East  |  North East Delhi |
| East  |  East Delhi |
| South  |  South Delhi |
| Central  |  Central Delhi |
| PoK  |  Pakistan-occupied Kashmir NO DATA |

## Cross reference
http://censusindia.gov.in/2011census/censusinfodashboard/index.html