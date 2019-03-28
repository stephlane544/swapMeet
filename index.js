const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const expressJwt = require('express-jwt')
const morgan = require('morgan')
const path = require('path')


app.use(morgan('dev'))
app.use(express.json());
app.use('/api', expressJwt({secret: process.env.SECRET}))
app.use('/api', require('./routes/apiRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/services', require('./routes/serviceRoutes'))
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use((err, req, res, next) => {
    console.error(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({message: err.message })
})

mongoose.connect(process.env.SECRET || 'mongodb://localhost:27017/users', {useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB')
}).catch(err => console.log(err))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})