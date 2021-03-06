var AWS = require("aws-sdk");
var config = require('./config');

AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
});

// TEAM_TABLE = "TheRunTeam";
var TEAM_TABLE = "TeamResults";
var ROUTE_TABLE = "TheRunRoute";

var docClient = new AWS.DynamoDB.DocumentClient();

function getTeam(teamID, callback) {
    getItem(TEAM_TABLE, { team: teamID }, callback);
}

function getLeg(legIndex, callback) {
    getItem(ROUTE_TABLE, { legID: legIndex }, callback);
}

function getLegs(callback) {
    var params = {
        TableName: ROUTE_TABLE,
    };

    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan items. Error JSON:", JSON.stringify(err, null, 2));
            callback(err, null);
        } else {
            console.log("Scan succeeded");
            // console.log("Scan succeeded:", JSON.stringify(data, null, 2));
            callback(null, data.Items);
        }
    });
}

function getItem(tableName, keyParam, callback) {
    console.log("get" + tableName + " " + JSON.stringify(keyParam));
    var params = {
        TableName: tableName,
        Key: keyParam
    };
    console.log(params);

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err, null);
        } else {
            // console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, data.Item);
        }
    });
}

function putTeam(team, callback) {
    var params = {
        TableName: TEAM_TABLE,
        Item: team
    };

    generalPut(params, callback);
}

function generalPut(params, callback) {
    docClient.put(params, function (err, data) {
        callback(err, data);
    });
}

exports.getTeam = getTeam;
exports.getLeg = getLeg;
exports.getLegs = getLegs;
exports.putTeam = putTeam;

// exports.generalPut = generalPut;