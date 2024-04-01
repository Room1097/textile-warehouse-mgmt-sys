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

app.get("/page1",(req,res)=>{
    res.json({msg:"This is Page 1"});
})

app.get("/page2",(req,res)=>{
    res.json({msg:"This is Another Page"});
})
