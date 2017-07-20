var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
*/

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, res) => {
    if (err) { return callback(err); }
    let array = res.split('\n');
    callback(array);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((arr) => callback(arr.indexOf(url) > -1));
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, url + '\n', (err, res) => {
    if (err) { callback(err); }
    callback(null, res);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) { return callback(err); }
    callback(files.indexOf(url) > -1);
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach((url) => {
    request('http://' + url, function(err, res, body) {
      if (err) { return callback(err); }
      fs.writeFile(exports.paths.archivedSites + '/' + url, body, function(err) {
        if (err) {
          callback(err);
        }
      });
    });
  });
};
