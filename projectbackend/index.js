require('dotenv').config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require('cors');
const fs = require('fs');

// Middleware
app.use(cors());

// Database Connection
const conn = mysql.createConnection({
    host: "tdbms.mysql.database.azure.com",
    user: "ROOM1097",
    password: "@DBMSdiu",
    database: "projet",
    port: 3306,
    ssl:{ca:fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
});


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

app.get("/page1", async (req, res) => {
    console.log("Hello");
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

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
