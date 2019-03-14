// This JavaScript file is used to obtain the MBTA Bus Data and store it in db.json

var fetch    = require('node-fetch')

var low      = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('db.json');
var db       = low(adapter);

// Set defaults
db.defaults({ vehicles: [] }).write()

// This function obtains the entire set of data from MBTA in the JSON format
async function getMBTAData()
{
	var url = 'https://api-v3.mbta.com/vehicles?api_key=36a4d4c5e30343c5a6a1a2f71aad5f4f&filter[route]=1&include=trip';	
	var response = await fetch(url);
	var json     = await response.json();
	return json.data;
}

// This function takes in a bus object as an argument, creates a new object with the required data,
// and writes it in db.json
function writeBus(bus)
{
    // Create new object with required values
    var vehicle = {
        id              : bus.id,
        label           : bus.attributes.label,
        direction_id    : bus.attributes.direction_id,
        lat             : bus.attributes.latitude,
        long            : bus.attributes.longitude
    }

    // Write in file db.json
    db.get('vehicles')
      .push(vehicle)
      .write()
}

// This function is used to get MBTA Bus Data and wirte each bus into db.json
async function fetchAndStoreMBTAData()
{
    // Get MBTA Data as an array of objects using function getMBTAData()
    var buses = await getMBTAData();
    
    // Add each bus to db.json using function writeBus()
    buses.forEach(writeBus);

    // Log time on console
    console.log(new Date());
}

fetchAndStoreMBTAData();
// Run every 15 seconds
var i = setInterval(fetchAndStoreMBTAData,15000);
// End after 1 hour
setTimeout(function() 
{
    clearInterval(i);
}, 3600100);