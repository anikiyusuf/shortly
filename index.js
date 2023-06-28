require('dotenv').config()
const express = require("express")
const  rateLimit = require('express-rate-limit')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger')
const { connectionMongoDB  } = require("./db")

const app = express()
const PORT = process.env.PORT



connectionMongoDB()



app.set('view engine', 'ejs')
app.set('view engine')

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use("/" , require("./routes/index"))
app.use("/auth" ,require("./routes/userRouter"))
app.use("/" , require("./routes/urlRoutes"))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



  
// RATE liMITING FOR 30 minutes
const limiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
})

app.use(limiter)

app.use((err, req,res,  next) =>{
    // logger.error(err.message)
    console.log(err)
    const errorStatus = err.status || 5000
    res.status(errorStatus).send(err.message)
    next()
})

app.listen(PORT , () => {
console.log(`server running ${PORT} `)
})