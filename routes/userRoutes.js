const express = require('express')
const userRoute = express.Router()
const User = require('../models/userModel')

userRoute.route('/')

        .get((req, res) => {
            User.find((err, users) => {
                console.log(users)
                if (err) return res.status(501).send(err)
                return res.status(200).send(users)
            })
        })




userRoute.route('/:_id')

            .get((req, res) => {
                const {_id} = req.params;
                User.findById(
                    {_id},
                    (err, service) => {
                        if(err) return res.status(500).send(err)
                        return res.status(200).send(service)
                    }
                )
            })

            .put((req, res, next) => {
                User.findOneAndUpdate(
                    {_id: req.params._id}, 
                    req.body, 
                    { new: true },
                    (err, user) => {
                        if(err){
                            console.log('Error')
                            res.status(500)
                            return next(err)
                        }
                        return res.send(user)
                    })
            })

module.exports = (userRoute)