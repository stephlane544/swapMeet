const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    profileImage: {
        type: String,
        default: "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg"
    },
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
    phoneNumber: Number,
    email: String,
    city: String,
    state: String,
    swapBucks: {
        type: Number,
        default: 0
    }
})

userSchema.pre('init', function (next) {
    const user = this;
    console.log(user)
    if (user.profileImage === '') {
        delete user.profileImage
    }
    next()
})

userSchema.pre('save', function (next) {
    const user = this;
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) {
            return callback(err)
        }
        callback(null, isMatch)
    })
}
userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('User', userSchema)