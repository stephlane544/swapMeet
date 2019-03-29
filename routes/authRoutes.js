const express = require('express')
const User = require('../models/userModel')
const authRoute = express.Router()
const jwt = require('jsonwebtoken')


authRoute.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username}, (err, existingUser) =>{
        if (err) {
            res.status(500);
            return next(err);
        }
        if (existingUser !== null) {
            res.status(400);
            return next(new Error('That username already exists!'));
        }
        if (req.body.profileImage === '') {
            delete req.body.profileImage
        }
        const newUser = new User(req.body)
        newUser.save((err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(201).send({user: user.withoutPassword(), token})
        })
    })
})

authRoute.post('/login', (req, res, next) => {
    console.log(req.body.username)

    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        console.log('here')
        if(err){ 
            res.status(500)
            return next(err)
        }
        if (!user) {
            res.status(403);
            return next(new Error('Email or password are incorrect'));
        }
        user.checkPassword(req.body.password, (err, match) => {
            console.log(match)
            if(err) return res.status(500).send(err)
            if(!match) return res.status(401).send({success: false, message: 'Username or Password is incorrect.'})
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.send({user: user.withoutPassword(), token: token, success: true})
        })
        
    })
})



module.exports = authRoute