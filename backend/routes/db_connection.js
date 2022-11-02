/*This file has made the connection to the mysql database and
is exported to the rest api file(users.js)*/
const mysql = require("mysql");
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'employees'
});

db.connect((err) => {
    if(err){
        console.log("Database not connected   " + err);
    }else{
        console.log("DATABASE IS CONNECTED!!!!");
    }
});

module.exports = db; //to export the file and make use of it in users.js file