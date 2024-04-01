const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors());
const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
app.get("/",(req,res)=>{
    res.json({msg:"Hello World"});
})
