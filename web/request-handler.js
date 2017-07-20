var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

let sendResponse = (statusCode, res) => {
  res.writeHead(statusCode, 'BLARG');
  res.end(archive.paths.list);
};

exports.handleRequest = function (req, res) {
  // console.log(`request url: ${req.url}. Request method: ${req.method}`);

  if (req.method === 'POST') {
    // function to check sites, if not there then log it
    if (archive.isUrlInList(req.url)) {
      sendResponse(200, res);
    } else {
      archive.addUrlToList(req.url);
      sendResponse(200, res);
    }
  } else if (req.method === 'GET') {
    if (!archive.isUrlArchived(req.url)) {
      sendResponse(200, res);
    } else {
      sendResponse(500, res);
    }
  } else {
    sendResponse(404, res);
  }




  // let action = actions[req.method];
  // if (action) {

  // }

  
};
