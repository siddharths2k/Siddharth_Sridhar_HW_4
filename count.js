// This JavaScript file loads the data from “db.json” and counts the number of vehicle entries.

var low      = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('db.json');
var db       = low(adapter);

var number_of_vehicle_entries = db.get('vehicles').size().value();
console.log('Number of Vehicle Entries is ' + number_of_vehicle_entries);