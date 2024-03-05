const express = require('express')
const mongoose = require('mongoose')
const app = express();
const router = require('./router/approuter');
const cors = require('cors');
app.use(cors());
app.use(express());
app.use(express.json());
const port = 5000;


//server listen or starting
mongoose.connect("mongodb://127.0.0.1:27017/taskon").then(()=>{
    app.listen(port);
    console.log(`connected to DB and started at http://localhost:${port}`);
}).catch((error)=>{
    console.log(`error ho gya bhai : ${error}`);
})

app.use(router);