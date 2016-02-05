var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

var statusCode;

exports.sendResponse = sendResponse = function (res, data) {
  res.writeHead(statusCode, headers);
  res.end(data);
};

exports.httpMethods = httpMethods = {
  'GET': function (req, res) {
    statusCode = 200;
    fs.readFile(archive.paths.siteAssets+'/'+'index.html', 'utf-8', function(err, doc) {
      if(err) {
        console.log(err);
        throw err;
      }
      console.log('Serving index.html')
      sendResponse(res, doc);
    });
  },
  'POST': function (req, res) {
    statusCode = 302;
    var data = '';
    // Get the archive query from them and try to find and display it
    req.on('data', function (piecesOfData) {
      data += piecesOfData.toString();
    });
    req.on('end', function () {
      //getting url/data
      //checking if website is archived
      //else serve archived website
      console.log('parsing', data);

      var desiredUrl = data.substr(4).trim();
      console.log('POST  FOR:' + desiredUrl);
      archive.isUrlArchived(desiredUrl, function(found) {
        console.log('found', found);
        if(found) {
          fs.readFile(archive.paths.archivedSites+'/'+desiredUrl, 'utf-8', function(err, doc) {
            if(err) {
              console.log(err);
              throw err;
            }
            sendResponse(res, doc);
          });
        } else {
          archive.addUrlToList(desiredUrl, function(err) {
            if(err) {
              console.log('error saving page' , err);
            }
            // Can we listen for the file loading and serve it then?
            
          });
          // Display loading page
          fs.readFile(archive.paths.siteAssets + '/' + 'loading.html', 'utf-8', function(err, doc) {
            if (err) {
              console.log(err);
              throw err;
            }
            sendResponse(res, doc);
          });
        }
      });
    });
  },
  'OPTIONS': function (req, res) {
    statusCode = 200;
    sendResponse(res, null);
  },
};
