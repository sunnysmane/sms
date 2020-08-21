require("app-module-path").addPath(__dirname);
const log = require("logger/logger");
const Server = require("./server");

const MongoDatabase = require("./databases/mongodb");

// Init Database
MongoDatabase.init();

//Start node server
Server.init();
