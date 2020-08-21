
const Joi = require('joi').extend(require('@hapi/joi-date'));

module.exports = Object.freeze({
    add: {
        payload: Joi.object({
            city: Joi.string().required().example('Pune').description('City Name'),
            start_date: Joi.date().required().format('YYYY-MM-DD').raw().example('2020-08-12').description('Start Date'),
            end_date: Joi.date().required().format('YYYY-MM-DD').raw().example('2020-08-18').description('End Date'),
            price: Joi.number().required().example(10).description('Price'),
            status: Joi.string().required().example('Yearly').description('Status'),
            color: Joi.string().required().example('#F00').description('Color code in hexadecimal').regex(new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"))
        })
    },
    update: {
        payload: Joi.object({
            city: Joi.string().allow(null).example('Pune').description('City Name'),
            start_date: Joi.date().allow(null).format('YYYY-MM-DD').raw().example('2020-08-12').description('Start Date'),
            end_date: Joi.date().allow(null).format('YYYY-MM-DD').raw().example('2020-08-18').description('End Date'),
            price: Joi.number().allow(null).example(10).description('Price'),
            status: Joi.string().allow(null).example('Yearly').description('Status'),
            color: Joi.string().allow(null).example('#F00').description('Color code in hexadecimal').regex(new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"))
        }),
        params: Joi.object({
            id: Joi.string().required().example('512eabc6180edfab517ef').description('City id')
        })
    },
    get: {
        params: Joi.object({
            id: Joi.string().required().example('512eabc6180edfab517ef').description('City id')
        })
    },
    getList: {
        query: Joi.object({
            page_no: Joi.number().allow(null).example(1).description('Page number starting from 1').min(0),
            page_size: Joi.number().allow(null).example(1).description('Page size').min(1),
            sort_by: Joi.string().valid('city', 'start_date', 'end_date', 'price', 'status', 'color').allow(null).example('city').description('Column name to sort'),
            sort_order: Joi.number().valid(1, -1).allow(null).example(-1).description('Order to sort'),
            filter: Joi.any().allow(null)
        })
    },
    delete: {
        params: Joi.object({
            id: Joi.string().required().example('512eabc6180edfab517ef').description('City id')
        })
    }
});
