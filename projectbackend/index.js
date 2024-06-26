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
app.get("/api/supply",(req,res)=>{
    try {
        conn.query("SELECT * FROM supplier_raw_material_supply", (error, results, fields) => {
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
});
app.post("/api/supply", (req, res) => {
    const Rid = req.body.Rid;
    const Sid = req.body.Sid;
    const S_weight = req.body.S_weight;

    if (!Rid||!Sid||!S_weight) {
        console.error("Missing fields");
        return res.status(400).send({message:'Send all required fields'});
    }
    try {
        conn.query("INSERT INTO Supply (Rid, Sid, S_weight) VALUES (?, ?, ?)", [Rid,Sid,S_weight], (error, results, fields) => {
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
app.get("/api/product",(req,res)=>{
    try {
        conn.query("SELECT * FROM PRODUCT_MATERIAL", (error, results, fields) => {
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
app.post("/api/product", (req, res) => {
    const P_name = req.body.P_name;
    const P_color = req.body.P_color;
    const gsm = req.body.gsm;
    const meter_per_KG = req.body.meter_per_KG;
    if (!P_name||!P_color||!gsm||!meter_per_KG) {
        console.error("Missing fields");
        return res.status(400).send({message:'Send all required fields'});
    }
    try {
        conn.query("INSERT INTO Product_material (P_name, P_weight, P_color, gsm, meter_per_kg) VALUES (?, ?, ?, ?, ?)", [P_name,0,P_color,gsm,meter_per_KG], (error, results, fields) => {
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
app.get("/api/progress",(req,res)=>{
    
    try {
        conn.query("SELECT * FROM raw_material_progress_product_material",(error,results,fields)=>{
            if(error){
                console.error("Error querying database: " + error.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.json(results)
        })
        
    } catch (error) {
        console.error("Error querying database: "+ error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
})
app.post("/api/progress", (req, res) => {
    const Pid = req.body.Pid;
    const Rid = req.body.Rid;
    const Used_weight = req.body.Used_weight;
    const machine_no = req.body.machine_no;
    if (!Rid||!Pid||!Used_weight||!machine_no) {
        console.error("Missing fields");
        return res.status(400).send({message:'Send all required fields'});
    }
    try {
        conn.query("INSERT INTO Progress (Rid, Pid, Used_weight, machine_no, is_complete, produced_weight) VALUES (?,?,?,?,false,0);", [Rid,Pid,Used_weight,machine_no], (error, results, fields) => {
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
app.patch("/api/progress/:id", (req, res) => {
    
    const Produced_weight = req.body.Produced_weight;
    const id = parseInt(req.params.id);
    if (!Produced_weight) {
        console.error("Missing field");
        return res.status(400).send({message:'Send required field'});
    }
    try {
        conn.query("UPDATE progress SET produced_weight = ?,is_complete = true WHERE pro_id = ?;", [Produced_weight,id], (error, results, fields) => {
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
