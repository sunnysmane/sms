
const Mongoose = require("mongoose"),
    Config = require('config'),
    log = require('logger/logger'),
    { readFileSync } = require('fs'),
    cityFactory = require('src/factory/city.factory'),
    to = require('src/utils/promise_handler');


const init = () => {

    let connection_uri = '';
    if(Config.database.mongo.username && Config.database.mongo.password) {
        connection_uri = `mongodb://${Config.database.mongo.username}:${Config.database.mongo.password}@${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}?authSource=admin`;
    } else {
        connection_uri = `mongodb://${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}`;
    }
    Mongoose.connect(connection_uri, {
        // useMongoClient: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000 });

    Mongoose.connection.on('connected', async () => {
        log.info('Mongoose default connection open to ' + 'mongodb://' + Config.database.mongo.host + '/' + Config.database.mongo.name);
        //TODO: Add data.json in DB if env is not test
        if (process.env.NODE_ENV !== 'test') {
            let rawData = readFileSync('data.json');
            let data = JSON.parse(rawData);
            [err, response] = await to(cityFactory.addDataToDB(data));
            if (err) {
                log.error('Error occured while adding to db => ', err.length, err);
            } else {
                log.info('Data added in db...');
            }
        }
    });

    Mongoose.connection.on('error', function (err) {
        log.info('Mongoose default connection error: ' + err);
        init();
    });


    Mongoose.connection.on('disconnected', function () {
        log.info('Mongoose default connection disconnected');
    });


    process.on('SIGINT', function () {
        Mongoose.connection.close(function () {
            log.info('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};

exports.close = async () => {
    return await Mongoose.connection.close();
};

exports.init = init;
