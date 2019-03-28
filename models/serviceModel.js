const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema ({
    service: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    minCost:{
        type: Number,
        default: 0,
        required: true
    },
    maxCost:{
        type: Number,
        default: 0,
        required: true
    },
    swappers: [
        {
            type: [Schema.Types.ObjectId],
            ref: "User",
            default: []        
        }
    ],
})

module.exports = mongoose.model('Service', serviceSchema)