const express = require('express')
const serviceRoute = express.Router()
const Service = require('../models/serviceModel')
const User = require('../models/userModel')

serviceRoute.route('/')

        .get((req, res) => {
            Service.find((err, services) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send(services)
            })
        })

        .post((req, res) => {
            if(Object.keys(req.body).length > 0){
                const newService = new Service(req.body);
                newService.user = req.user._id;
                newService.save(err => {
                    if(err) return res.status(500).send(err)
                    return res.status(200).send(newService);
                })
            }else{
                res.send('Not a valid service.')
            }
        })


serviceRoute.route('/:_id')

            .get((req, res) => {
                const {_id} = req.params;
                Service.findById(
                    {_id},
                    (err, service) => {
                        if(err) return res.status(500).send(err)
                        return res.status(200).send(service)
                    }
                )
            })


            .delete((req, res) => {
                const {_id} = req.params;
                Service.findOneAndDelete(
                    {_id: _id},
                    req.body,
                    (err, service) => {
                        if(err) return res.status(500).send(err)
                        return res.status(200).send('Service successfully deleted.')
                    }
                )
            })

            .put((req, res) => {
                const {_id} = req.params;
                Service.findOneAndUpdate(
                    {_id: _id},
                    req.body,
                    (err, service) => {
                        if(err) return res.status(500).send(err)
                        return res.status(200).send(service)
                    }
                )
            })

// Need to find all Users that have a specific service
// /services/user/:serviceName

serviceRoute.get("/user/:servicename", (req, res, next) => {
    User.find({serviceName: req.param.serviceName.toLowerCase()}, (err, usersWithService) => {
        
    })
})


            // serviceRoute('/service/:userID', async(req, res, next) => {
            //     try{
            //         const userResponse = await User.find({_id: req.params.userID})
            //         const servicesResponse = awaitService.find({_id: { $in: userResponse.services}})
            //         return res.status(200).send(servicesResponse)
            //     }
            //     catch(err){
            //         res.status(500)
            //         return next(err)
            //     }
            // })

module.exports = (serviceRoute)