var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpReq = require('http-request');
var request = require('request');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

 exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  test: path.join(__dirname, '../test/testdata/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf-8', function(err, urls) {
    if(err) {
      console.log(err);
      throw err;
    }
    var urlArray = urls.split('\n');
    callback(urlArray);
  });
};

exports.isUrlInList = function(target, callback){
  exports.readListOfUrls(function (urlArray, target) {
    if(urlArray.indexOf(target)!== -1) {
      callback(true);
    }
    callback(false);
  });
};

exports.addUrlToList = function(url, callback){
  exports.isUrlInList(url, function(bool) {
    if (!bool) {
      fs.appendFile(exports.paths.list, url + '\n', callback);
    }
  });
};

exports.isUrlArchived = function(url, callback){
  fs.exists(path.join(exports.paths.archivedSites + url), callback);
};

exports.downloadUrls = function(urlArray){
  urlArray.forEach(function(url) {
    exports.addUrlToList(url);
    request('http://' + url, function (error, response, body) {
      if(!error && response.statusCode == 200) {
        var filename = exports.paths.archivedSites + '/' + url;
        fs.writeFile(filename, body);
      }
    });
  });  
};
