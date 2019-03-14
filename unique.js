// This JavaScript file loads the data from “db.json” and finds the unique bus IDs

var low      = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('db.json');
var db       = low(adapter);

// Load bus IDs
var vehicle_ids = db.get('vehicles').map('id').value();

var count_unique_ids = 0;
var unique_ids  = [];

// Iterate through all bus IDs
vehicle_ids.forEach(function(id)
{
    // If the ID has not been added yet, append it to unique_ids and increase count
    if (!unique_ids.includes(id))
    {
        count_unique_ids++;
        unique_ids.push(id);
    }
});

console.log('List of Unique IDs:');
console.log(JSON.stringify(unique_ids));

console.log('Number of Inique IDs is ' + count_unique_ids);
