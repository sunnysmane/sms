const log = require("logger/logger"),
    Response = require("src/utils/response"),
    StatusCodes = require("src/utils/status_codes"),
    ResponseMessages = require("src/utils/response_messages"),
    to = require("src/utils/promise_handler"),
    model = require('src/models/city.model'),
    DatabaseConnector = require("src/classes/DatabaseConnector"),
    moment = require('moment');


const databaseConnector = new DatabaseConnector(model);

const addCity = async (request, h) => {
    try {
        [err, response] = await to(databaseConnector.createOne(request.payload));
        if (err) {
            return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
        } else {
            return h.response(Response.sendResponse(true, response, ResponseMessages.CREATED, StatusCodes.CREATED)).code(StatusCodes.CREATED);
        }
    } catch (e) {
        return h.response(Response.sendResponse(false, e, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
    }
}

const updateCity = async (request, h) => {
    try {
        let condition = {
            _id: request.params.id
        };
        [err, response] = await to(databaseConnector.updateOne(condition, request.payload));
        if (err) {
            return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
        } else {
            return h.response(Response.sendResponse(true, response, ResponseMessages.UPDATED, StatusCodes.OK)).code(StatusCodes.OK);
        }
    } catch (e) {
        return h.response(Response.sendResponse(false, e, e.message, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
    }
}

const getCity = async (request, h) => {
    try {
        let condition = {
            _id: request.params.id
        };
        [err, response] = await to(databaseConnector.findOne(condition, {}));
        if (err) {
            return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
        } else {
            return h.response(Response.sendResponse(true, response, ResponseMessages.DATA_FOUND, StatusCodes.OK)).code(StatusCodes.OK);
        }
    } catch (e) {
        return h.response(Response.sendResponse(false, e, e.message, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
    }
}

const getCityList = async (request, h) => {
    try {
        let condition = {};
        if (request.query.filter) {
            const filters = JSON.parse(request.query.filter);
            console.log('filters => ', filters);
            if (filters.start_date && filters.end_date) {
                condition = {
                    created_at: {
                        $gte: filters.start_date,
                        $lte: moment(filters.end_date).add(1, 'days').format('YYYY-MM-DD')
                    }
                }
            } else {
                condition = filters;
            }
        }
        console.log(condition);
        [err, response] = await to(databaseConnector.find(condition, {}, request.query));
        if (err) {
            return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
        } else {
            return h.response(Response.sendResponse(true, response, ResponseMessages.DATA_FOUND, StatusCodes.OK)).code(StatusCodes.OK);
        }
    } catch (e) {
        return h.response(Response.sendResponse(false, e, e.message, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
    }
}

const deleteCity = async (request, h) => {
    try {
        let condition = {
            _id: request.params.id
        };
        [err, response] = await to(databaseConnector.deleteOne(condition));
        if (err) {
            return h.response(Response.sendResponse(false, err, ResponseMessages.ERROR, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
        } else {
            return h.response(Response.sendResponse(true, response, ResponseMessages.DELETED, StatusCodes.OK)).code(StatusCodes.OK);
        }
    } catch (e) {
        return h.response(Response.sendResponse(false, e, e.message, StatusCodes.BAD_REQUEST)).code(StatusCodes.BAD_REQUEST);
    }
}

const addDataToDB = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let error = [];
            for (let c of data) {
                let cityObject = {};
                Object.assign(cityObject, c);
                cityObject.start_date = moment(cityObject.start_date).format('YYYY-MM-DD');
                cityObject.end_date = moment(cityObject.end_date).format('YYYY-MM-DD');
                delete cityObject.id;
                [err, response] = await to(databaseConnector.findOne(cityObject));
                if (err) {
                    error.push({error: err, data: c});
                } else {
                    if (response) {
                        log.info(`City ${c.city} already present...`);
                    } else {
                        [err, response] = await to(databaseConnector.createOne(cityObject));
                        if (err) {
                            error.push({error: err, data: c});
                        } else {
                            log.info('Data added in DB');
                        }
                    }
                }
            }
            if (error.length) {
                reject(error);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    addCity,
    updateCity,
    getCity,
    getCityList,
    deleteCity,
    addDataToDB
};
