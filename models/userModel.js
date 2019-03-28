const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    profileImage: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        required: true,
        type: String
    },
    businessName: String,
    serviceName: String,
    serviceDescription: String,
    service: String,
    serviceType: String,
    cost: Number,
    services: [
        {
            type: [Schema.Types.ObjectId],
            ref: "Service",
            default: []        
        }
    ],
    phoneNumber: Number,
    email: String,
    city: String,
    state: String,
    swapBucks: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)