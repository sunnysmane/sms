let mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let citySchema = new Schema(
    {
        city: {
            type: Schema.Types.String,
            default: ''
        },
        start_date: {
            type: Schema.Types.Date,
            default: null
        },
        end_date: {
            type: Schema.Types.Date,
            default: null
        },
        price: {
            type: Schema.Types.Number,
            default: 0
        },
        status: {
            type: Schema.Types.String,
            default: ''
        },
        color: {
            type: Schema.Types.String,
            default: ''
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    },
    {strict: false });

module.exports = mongoose.model('city', citySchema, 'city');
