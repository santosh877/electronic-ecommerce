const express = require('express');
const mongoose = require('mongoose');
const {readdirSync} = require("fs");
const morgan = require('morgan'); 

/* 
Morgan is a logging tool (middleware) that can be used in HTTP servers implemented 
using Express & Node. js. 
It can be used to log requests, errors, and more to the console. it basically act as a middleware
*/
const bodyParser = require('body-parser');
const cors = require('cors');
/* 
CORS is used to have request to different server as client side is running in 3000 and server is in 8000
*/
require('dotenv').config();

//app

const app = express();

//db
mongoose.connect(process.env.DATABASE ,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("DB CONNECTED"))
.catch((error) => console.log("DB_CONNECTION_ERROR", error));


//middleware
app.use(morgan("dev"));

//limit is given to check the data which is sent by client .
// if it is greater than 2 mb it will give error
app.use(bodyParser.json({limit: '2 mb'})); 


//CORS handling
app.use(cors());

//Routes middleware which is autoreloading
readdirSync('./routes').map((r) => app.use("/api",require('./routes/' + r)));


//port 
const port = process.env.PORT || 8000;

app.listen(port , () => console.log(`Server is running on the port ${port}`))
