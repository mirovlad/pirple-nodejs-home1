/**
 * The Assignment:
 * Please create a simple "Hello World" API. Meaning:
 * 1. It should be a RESTful JSON API that listens on a port of your choice. 
 * 2. When someone posts anything to the route /hello,
 * you should return a welcome message, in JSON format.
 * This message can be anything you want. 
 */


var http = require('http');
var url = require('url');

config = {
    'httpPort': 3000,
};

var requestRespond = function(request, response) {
    var parsedUrl = url.parse(request.url);

    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+/g, '/'); // Replace multiple /s with single one
    trimmedPath = path.replace(/\/+$/g, ''); // Drop off trailing /s

    // Prepare for an unsupported call by default
    var httpCode = 404;
    var message = "Unsupported call";
    if (trimmedPath === "/hello") { // Support for /hello
        httpCode = 200;
        message = "Hello World";
    }

    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    var outputString = JSON.stringify({"message": message});
    response.end(outputString);
}

// Instantiate HTTP server
var httpServer = http.createServer(function(request, response) {
    requestRespond(request, response);
});

// Start the HTTP server
httpServer.listen(config.httpPort, function() {
    console.log("HTTP server is now listening on port " + config.httpPort);
});
