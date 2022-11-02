/*This is the main file, it makes use of the users.js and db_connection.js file*/
const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("../backend/routes/users"); //this is creating a route to user.js file where all the CRUD functions are located
const app = express();

app.use(bodyParser.json());
app.use('/users', usersRoutes);//line of code which utilizes all the code in the users.js file
app.use('/', (req, res) => res.send("Hello from home page"));
app.listen(3000, (err) =>{
    if(err){
        console.log("Server aint working");
    }else{
        console.log("Working on port 3000");
    }
});