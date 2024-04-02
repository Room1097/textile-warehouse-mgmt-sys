require('dotenv').config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());
const conn = mysql.createConnection({
    host: "tdbms.mysql.database.azure.com",
    user: "ROOM1097",
    password: "@DBMSdiu",
    database: "projet", 
    port: 3306,
    ssl:{ca:fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
});

app.use(express.json());
conn.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + conn.threadId);
});


app.get("/", (req, res) => {
    res.json({ msg: "Hello World" });
});

app.get("/page1",  (req, res) => {
    try {
        conn.query("SELECT val from test where id = 1", (error, results, fields) => {
            if (error) {
                console.error("Error querying database: " + error.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            console.log("Hello");
            console.log(results);
            
            res.json( results[0] );
        });
    } catch (error) {
        console.error("Error querying database: " + error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/page2", (req, res) => {
    try {
        conn.query("SELECT val from test where id = 2", (error, results, fields) => {
            if (error) {
                console.error("Error querying database: " + error.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            console.log("Hello");
            console.log(results);
            
            res.json( results[0] );
        });
    } catch (error) {
        console.error("Error querying database: " + error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/supplier",(req,res)=>{
    try {
        conn.query("SELECT * FROM SUPPLIER", (error, results, fields) => {
            if (error) {
                console.error("Error querying database: " + error.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            console.log(results);
            res.json( results );
        });
    } catch (error) {
        console.error("Error querying database: " + error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
app.post("/api/supplier", (req, res) => {
    const supplier_name = req.body.S_name;
    try {
        conn.query("INSERT INTO supplier (S_name) VALUES (?)", [supplier_name], (error, results, fields) => {
            if (error) {
                console.error("Error querying database: " + error.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            // console.log(results);
            res.json(results);
        });
    } catch (error) {
        console.error("Error querying database: " + error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/api/supplier/:id",(req,res)=>{
    const id = parseInt(req.params.id); 
    try {
        conn.query(`SELECT * FROM SUPPLIER WHERE Sid = ${id}`, (error, results, fields) => {
            if (error) {
                console.error("Error querying database supplier specific: " + error.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            console.log(results);
            if(!results)
            {
                return response.status(404).send({message : 'Supplier not found'})
            }
            return res.json( results );
        });
    } catch (error) {
        console.error("Error querying database supplier specific: " + error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
app.get("/api/raw",(req,res)=>{
    try {
        conn.query("SELECT * FROM RAW_MATERIAL", (error, results, fields) => {
            if (error) {
                console.error("Error querying database: " + error.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            console.log(results);
            res.json( results );
        });
    } catch (error) {
        console.error("Error querying database: " + error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
app.post("/api/raw", (req, res) => {
    const R_name = req.body.R_name;
    const R_color = req.body.R_color;
    const denier = req.body.denier;
    const no_of_filaments = req.body.no_of_filaments;
    if (!R_name||!R_color||!denier||!no_of_filaments) {
        console.error("Missing fields");
        return res.status(400).send({message:'Send all required fields'});
    }
    try {
        conn.query("INSERT INTO Raw_material (R_name, R_weight, R_color, denier, no_of_filaments) VALUES (?, ?, ?, ?, ?)", [R_name,0,R_color,denier,no_of_filaments], (error, results, fields) => {
            if (error) {
                console.error("Error querying database: " + error.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            // console.log(results);
            res.json(results);
        });
    } catch (error) {
        console.error("Error querying database: " + error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/api/raw/:id",(req,res)=>{
    const id = parseInt(req.params.id); 
    try {
        conn.query(`SELECT * FROM RAW_MATERIAL WHERE Rid = ${id}`, (error, results, fields) => {
            if (error) {
                console.error("Error querying database supplier specific: " + error.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            console.log(results);
            if(!results)
            {
                return response.status(404).send({message : 'Raw_material not found'})
            }
            return res.json( results );
        });
    } catch (error) {
        console.error("Error querying database supplier specific: " + error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
