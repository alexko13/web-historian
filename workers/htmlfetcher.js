// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
// //var http = require('http');
// var httpHelper = require('../web/http-helpers');
// var http = require('http');
// var archiveHelpers = require('../helpers/archive-helpers');
// var fs = require('fs');

// var port = 4200;
// var statusCode = 200;
// var ip = '127.0.0.1';

// var server = http.createServer(function(req, res) {
//   if(!req.method === 'POST') {
//     statusCode = 404;
//     httpHelper.sendResponse(res, data, message);
//   }

//   //check if we have website
//     //if we do send it back
//     //if not save it and then send back

// });

// server.listen(port, ip);
// console.log("Listening on " + ip +  ":" + port);

var archive = require('../helpers/archive-helpers')

