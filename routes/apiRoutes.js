const express = require('express');
const User = require('../models/userModel')
const apiRoute = express.Router();


    apiRoute.put('/edituser', async (req, res, next) => {
        try{
            
            let user = await User.findOneAndUpdate({_id: req.user._id}, req.body)
            if(user) res.status(200).send(user)
        }
        catch (err){
            return next(err)
        }
    
    })


module.exports = (apiRoute)