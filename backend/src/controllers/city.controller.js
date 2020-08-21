/*************************************************************************************************** */

const factory = require('src/factory/city.factory'),
    Validation = require('src/validations/city.validation'),
    Response = require('src/utils/response'),
    Joi = require('joi');

/*************************************************************************************************** */

const response_format = Joi.object({
        is_success: Joi.boolean(),
        result: Joi.any(),
        message: Joi.string().required(),
        status_code: Joi.number().required(),
    }),
    response = {
        status : {
            200: response_format,
            201: response_format,
            400: response_format,
            500: response_format,
        },
    };


const addCity = {
    description : "Add New City",
    notes : "Add New City",
    tags : ["api","city"],
    plugins : {
        "hapi-swaggered" : {
            responses : Response.responses,
        },
    },
    validate: Validation.add,
    auth: false,
    handler: (request, h) => {
        return factory.addCity(request, h);
    },
    response,
};

const updateCity = {
    description : "Update existing City",
    notes : "Update existing City",
    tags : ["api","city"],
    plugins : {
        "hapi-swaggered" : {
            responses : Response.responses,
        },
    },
    validate: Validation.update,
    auth: false,
    handler: (request, h) => {
        return factory.updateCity(request, h);
    },
    response,
};


const getCity = {
    description : "Get Existing City",
    notes : "Get Existing City",
    tags : ["api","city"],
    plugins : {
        "hapi-swaggered" : {
            responses : Response.responses,
        },
    },
    validate: Validation.get,
    auth: false,
    handler: (request, h) => {
        return factory.getCity(request, h);
    },
    response,
};

const getCityList = {
    description : "Get Existing City List",
    notes : "Get Existing City List",
    tags : ["api","city"],
    plugins : {
        "hapi-swaggered" : {
            responses : Response.responses,
        },
    },
    validate: Validation.getList,
    auth: false,
    handler: (request, h) => {
        return factory.getCityList(request, h);
    },
    response,
};

const deleteCity = {
    description : "Delete Existing City",
    notes : "Delete Existing City",
    tags : ["api","city"],
    plugins : {
        "hapi-swaggered" : {
            responses : Response.responses,
        },
    },
    validate: Validation.delete,
    auth: false,
    handler: (request, h) => {
        return factory.deleteCity(request, h);
    },
    response,
};


module.exports = {
    addCity,
    updateCity,
    getCity,
    getCityList,
    deleteCity
}
