const express = require('express');
const app = express();

const lambda = require("../gambo/index");

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/results', function(req, res) {
    // console.log(req);
    var event = {};
    event.httpMethod = "GET";
    event.resource = "/results";
    event.queryStringParameters = {};
    if(req.query.legID) {
        event.queryStringParameters.legID = req.query.legID;
    };
    if (req.query.teamID) {
        event.queryStringParameters.teamID = req.query.teamID;
    }
    console.log("simulate event: " + JSON.stringify(event));

    lambda.handler(event, null, function(err, response) {
        sendResponse(res, response);
    })
});

app.get('/legs', function(req, res) {
    console.log(req);
    var event = {};
    event.httpMethod = "GET";
    event.resource = "/legs";
    event.queryStringParameters = {};
    if(req.query.legID) {
        event.queryStringParameters.legID = req.query.legID;
    }
    console.log(event);

    lambda.handler(event, null, function(err, response) {
        sendResponse(res, response);
    })
});

function sendResponse(res, response) {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(JSON.parse(response.body));
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))
