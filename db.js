require('dotenv').config()
const mongoose = require('mongoose')
const logger = require("./logger/logger")
const MONGODB = process.env.MONGODB

function  connectionMongoDB(){
    mongoose.connect(MONGODB ,{
        serverSelectionTimeoutMS: 30000})

    mongoose.connection.on('connected', () =>{
        console.log('connection to mongodb successful')
    })

    mongoose.connection.on('err', (err) =>{
        console.error(err)
        
    })

}


module.exports =   {connectionMongoDB}