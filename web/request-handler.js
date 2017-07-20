var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helps = ('./http-helpers');
// require more modules/folders here!

let sendResponse = (statusCode, res) => {
  res.writeHead(statusCode, 'BLARG');
  res.end(archive.paths.list);
};

exports.handleRequest = function (req, res) {
  // console.log(`request url: ${req.url}. Request method: ${req.method}`);

  // if (req.method === 'POST') {
  //   // function to check sites, if not there then log it
  //   if (archive.isUrlInList(req.url)) {
  //     sendResponse(200, res);
  //   } else {
  //     archive.addUrlToList(req.url);
  //     sendResponse(200, res);
  //   }
  // } else if (req.method === 'GET') {
  //   if (!archive.isUrlArchived(req.url)) {
  //     sendResponse(200, res);
  //   } else {
  //     sendResponse(500, res);
  //   }
  // } else {
  //   sendResponse(404, res);
  // }
  if (req.method === 'POST') {
    console.log("POST");
    var body = '';
    req.on('data', function (data) {
      body += data;
      console.log("Partial body: " + body);
    });
    req.on('end', function () {
      console.log("Body: " + body);
    });
    fs.appendFile(archive.paths.list, body + '\n', (err, res) => {
      if (err) { throw err; }
    })
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('post received');
  } else if (req.method === 'GET') {
    console.log("GET");
    console.log(req.url);
    if (archive.isUrlArchived(req.url.substr(1))) {
      helps.serveAssets(res, req.url, (err, res) =>{
        if (err) { throw err; }
        res.writeHead(200, 'we good');
        res.end();
      });
    }
    //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('Not found');
  }




  // let action = actions[req.method];
  // if (action) {

  // }

  
};
