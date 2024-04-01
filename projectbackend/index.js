require('dotenv').config()
const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors());

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
app.get("/",(req,res)=>{
    res.json({msg:"Hello World"});
})
