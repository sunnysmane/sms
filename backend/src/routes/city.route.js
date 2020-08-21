const controller = require('src/controllers/city.controller');

module.exports = [
    {
        method: 'POST',
        path: '/city',
        config: controller.addCity
    },
    {
        method: 'PUT',
        path: '/city/{id}',
        config: controller.updateCity
    },
    {
        method: 'GET',
        path: '/city/{id}',
        config: controller.getCity
    },
    {
        method: 'GET',
        path: '/city',
        config: controller.getCityList
    },
    {
        method: 'DELETE',
        path: '/city/{id}',
        config: controller.deleteCity
    }
]
