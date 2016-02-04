var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpRequest = require('http-request');


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

exports.sendResponse = sendResponse = function (res, data, message) {
  res.writeHead(statusCode, headers);
  res.end(archive.paths.list);
  // res.end(data);
};

exports.httpMethods = httpMethods = {
  'GET': function (req, res) {
    statusCode = 200;
    //var request = fetch(req.html);
    sendResponse(res, null, null);
  },
  'POST': function (req, res) {
    statusCode = 201;
    var data;
    req.on('data', function (piecesOfData) {
      data += piecesOfData;
    });
    req.on('end', function (data) {
      sendResponse(req, data);
    });
  },
  'OPTIONS': function (req, res) {
    statusCode = 200;
  },
};
