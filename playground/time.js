var moment = require('moment');

// jan 1st 1970 00:00:00 am

// var date = moment();

// console.log(date.format()) // now date in normal 

// date.subtract(100,'year')
// console.log(date.format('MMM Do, Y')) // MMM showing shorted version of the mounth: 27 Jan 2019

// var date = moment();

// date.subtract(8,'hour').subtract(20,'minute')
// console.log(date.format('h:mm a'))

createdAt = 1;
var date1= moment(createdAt)
console.log(date1.format('h:mm:ss a'))