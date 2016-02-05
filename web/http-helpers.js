var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var initialize = require('./initialize');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var statusCode;

exports.sendResponse = sendResponse = function (res, filename) {
  res.writeHead(statusCode, headers);
  console.log('Reading file');
  fs.readFile(filename, {encoding: 'utf-8'}, function(err, doc) {
    if(err) {
      console.log(err);
      throw err;
    }

    res.end(doc);
  });
  console.log('Done reading file');
};

exports.httpMethods = httpMethods = {
  'GET': function (req, res) {
    statusCode = 200;
    sendResponse(res, archive.paths.home);
  },
  'POST': function (req, res) {
    statusCode = 302;
    var data = '';
    // Get the archive query from them and try to find and display it
    req.on('data', function (piecesOfData) {
      data += piecesOfData.toString();
    });
    req.on('end', function () {
      //parse urls correctly
      var parsedData = JSON.parse(data);
      var desiredUrl = desiredUrl.substr(4) || parsedData.url;
      
      archive.isUrlArchived(desiredUrl, function(found) {

        console.log('found', found);
        
        if(found) {
          sendResponse(res, archive.paths.archivedSites + '/' + desiredUrl);
        } else {
          archive.addUrlToList(desiredUrl, function(err) {
            if(err) {
              console.log('error saving page' , err);
            }
            // Can we listen for the file loading and serve it then?
          });
          // statusCode = 404;
          sendResponse(res, archive.paths.loading);
        }
      });
    });
  },
  'OPTIONS': function (req, res) {
    statusCode = 200;
    sendResponse(res, archive.paths.home);
  },
};
